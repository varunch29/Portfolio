import React, { useState, useEffect, useRef } from "react";
import { Emulator, EmulatorState, HistoryKeyboardPlugin, OutputType, CommandMapping, OutputFactory } from "javascript-terminal";

const EMPTY_COMMANDS = {};
const CustomTerminal = ({ commands = EMPTY_COMMANDS, welcomeMessage, promptLabel, errorMessage, theme }) => {
    const commandMap = {};
    Object.keys(commands).forEach((cmd) => {
        commandMap[cmd] = {
            function: (state, opts) => {
                const output = OutputFactory.makeTextOutput(commands[cmd]);
                return { output };
            },
            optDef: {}
        };
    });
    const customCommandMapping = CommandMapping.create({
        ...commandMap
    });
    const [emulatorState, setEmulatorState] = useState(() =>
        EmulatorState.create({
            commandMapping: customCommandMapping
        })
    );
    const [input, setInput] = useState("");
    const inputRef = useRef(null);
    const outputRef = useRef(null);
    const emulator = useRef(null);
    if (emulator.current === null) {
        emulator.current = new Emulator();
    }
    const historyKeyboardPlugin = useRef(null);
    if (historyKeyboardPlugin.current === null) {
        historyKeyboardPlugin.current = new HistoryKeyboardPlugin(emulatorState);
    }
    useEffect(() => {
        historyKeyboardPlugin.current = new HistoryKeyboardPlugin(emulatorState);
    }, [emulatorState]);
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [emulatorState]);
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const trimmedInput = input.trim();
            if (trimmedInput === "clear") {
                setEmulatorState(
                    EmulatorState.create({
                        commandMapping: customCommandMapping
                    })
                );
                setInput("");
                return;
            }
            if (trimmedInput) {
                let newState = emulator.current.execute(emulatorState, trimmedInput, [
                    historyKeyboardPlugin.current
                ]);
                const outputs = newState.getOutputs();
                const lastOutput = outputs.last();
                if (
                    lastOutput &&
                    lastOutput.type === OutputType.TEXT_ERROR_OUTPUT_TYPE &&
                    errorMessage
                ) {
                    // CUSTOM ERROR MESSAGE
                }
                setEmulatorState(newState);
            } else {
                const emptyState = emulator.current.execute(emulatorState, "", [
                    historyKeyboardPlugin.current
                ]);
                setEmulatorState(emptyState);
            }
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setInput(historyKeyboardPlugin.current.completeUp());
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setInput(historyKeyboardPlugin.current.completeDown());
        } else if (e.key === "Tab") {
            e.preventDefault();
            const autoCompletionStr = emulator.current.autocomplete(
                emulatorState,
                input
            );
            if (autoCompletionStr) {
                setInput(autoCompletionStr);
            }
        }
    };
    const outputs = emulatorState.getOutputs().toArray();
    return (
        <div role="presentation" className="w-full h-full flex flex-col p-4 text-sm overflow-hidden"
            style={{
                backgroundColor: theme?.themeBGColor || "#090909",
                color: theme?.themeColor || "#ffb86a"
            }}
            onClick={() => inputRef.current?.focus()}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    inputRef.current?.focus();
                }
            }}
        >
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }} ref={outputRef}>
                {
                    welcomeMessage &&
                    <div className="mb-4">
                        {welcomeMessage}
                    </div>
                }
                {outputs.map((output, idx) => {
                    const uniqueKey = `output-${idx}`;
                    if (output.type === OutputType.HEADER_OUTPUT_TYPE) {
                        return (
                            <div key={uniqueKey} className="mb-1 flex items-center gap-2">
                                <span style={{ color: theme?.themePromptColor || "#05df72" }}>
                                    {promptLabel}
                                </span>
                                <span>
                                    {output.content.command}
                                </span>
                            </div>
                        );
                    } else if (output.type === OutputType.TEXT_OUTPUT_TYPE) {
                        return (
                            <div key={uniqueKey} className="mb-2">
                                {output.content}
                            </div>
                        );
                    } else if (output.type === OutputType.TEXT_ERROR_OUTPUT_TYPE) {
                        return (
                            <div key={uniqueKey} className="mb-2">
                                {errorMessage ? errorMessage : <span className="text-red-400">{output.content}</span>}
                            </div>
                        );
                    }
                    return null;
                })}
                <div className="flex items-center gap-2 mt-2">
                    <span style={{ color: theme?.themePromptColor || "#05df72" }}>
                        {promptLabel}
                    </span>
                    <input ref={inputRef} type="text" aria-label="Terminal input"
                        className="flex-1 bg-transparent border-none outline-none"
                        style={{ color: theme?.themeColor || "#ffb86a" }}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomTerminal;