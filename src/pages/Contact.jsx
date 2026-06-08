import { useRef, useState, useEffect, useId, useReducer } from "react";
import emailjs from "@emailjs/browser";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { contactInfo } from "../constant/ContactData.jsx";
import { Map, MapControls } from "../components/ui/map";

gsap.registerPlugin(ScrollTrigger, SplitText);

const typingReducer = (state, action) => {
    switch (action.type) {
        case 'TYPE': return { ...state, charIdx: state.charIdx + 1 };
        case 'START_DELETE': return { ...state, deleting: true };
        case 'DELETE': return { ...state, charIdx: state.charIdx - 1 };
        case 'NEXT_WORD': return { ...state, deleting: false, idx: (state.idx + 1) % action.payload };
        default: return state;
    }
};

const useTypingText = (texts) => {
    const [state, dispatch] = useReducer(typingReducer, { idx: 0, charIdx: 0, deleting: false });
    useEffect(() => {
        const current = texts[state.idx];
        let timeout;
        if (!state.deleting && state.charIdx < current.length) {
            timeout = setTimeout(() => dispatch({ type: 'TYPE' }), 80);
        } else if (!state.deleting && state.charIdx === current.length) {
            timeout = setTimeout(() => dispatch({ type: 'START_DELETE' }), 1800);
        } else if (state.deleting && state.charIdx > 0) {
            timeout = setTimeout(() => dispatch({ type: 'DELETE' }), 40);
        } else if (state.deleting && state.charIdx === 0) {
            dispatch({ type: 'NEXT_WORD', payload: texts.length });
        }
        return () => clearTimeout(timeout);
    }, [state.charIdx, state.deleting, state.idx, texts]);
    return texts[state.idx].slice(0, state.charIdx);
};

const Field = ({ label, name, type = "text", placeholder, textarea, required, onChange, error }) => {
    const id = useId();
    const [focused, setFocused] = useState(false);
    const borderColor = error ? "border-red-500" : (focused ? "border-green-500" : "border-gray-50/10");
    const base = `w-full bg-gray-50/[0.02] border rounded px-4 text-sm text-gray-200 placeholder-gray-600/80 outline-none transition-all duration-300 ${borderColor}`;
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-xs text-gray-500 uppercase tracking-widest">
                <span className="text-green-500">▹</span> {label}
                {required && <span className="text-green-400 ml-1">*</span>}
            </label>
            {textarea ? (
                <textarea id={id} name={name} rows={4} placeholder={placeholder} required={required} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={onChange} className={`${base} py-3 resize-none`} />
            ) : (
                <input id={id} name={name} type={type} placeholder={placeholder} required={required} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={onChange} className={`${base} py-3 h-11`} />
            )}
            {error && type === "email" && (
                <span className="text-xs text-red-500">
                    Invalid email. Needs 6+ chars before @, correct formatting, and a popular provider.
                </span>
            )}
        </div>
    );
};

const Toast = ({ show, onClose }) => {
    useGSAP(() => {
        if (show) {
            gsap.fromTo(
                "#toast",
                { x: -60, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, ease: "expo.out" },
            );
        }
    }, [show]);
    if (!show) return null;
    return (
        <div id="toast" className="fixed top-11 left-6 z-50 flex items-center gap-3 bg-[#040404] border border-green-400/40 rounded px-5 py-3">
            <div className="size-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-green-400">
                Message sent successfully!
            </span>
            <button type="button" onClick={onClose} className="ml-2 text-gray-500 hover:text-gray-50 transition-colors text-xs" >
                ✕
            </button>
        </div>
    );
};

const Contact = () => {
    const [pop, setpop] = useState(false);
    const [sending, setSending] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const leftRef = useRef(null);
    const formRef = useRef(null);
    useGSAP(
        () => {
            const split = new SplitText(headingRef.current, { type: "chars" });
            gsap.from(split.chars, {
                yPercent: 120,
                opacity: 0,
                duration: 0.9,
                stagger: 0.04,
                ease: "expo.out",
                scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
            });
            gsap.from(leftRef.current, {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: leftRef.current, start: "top 85%" },
            });
            gsap.from(formRef.current, {
                x: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: formRef.current, start: "top 85%" },
            });
        },
        { scope: sectionRef },
    );
    const validateEmail = (email) => {
        const regex = /^(?=.{6,}@)[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@(gmail\.com|proton\.me|protonmail\.com|outlook\.com|yahoo\.com|icloud\.com)$/i;
        return regex.test(email);
    };
    const handleEmailChange = (e) => {
        const val = e.target.value.trim();
        if (val === "") {
            setEmailError(false);
        } else {
            setEmailError(!validateEmail(val));
        }
    };
    const sendEmail = (e) => {
        e.preventDefault();
        const name = e.target.name_from.value.trim();
        const email = e.target.email_from.value.trim();
        const subject = e.target.subject_from.value.trim();
        const message = e.target.textarea.value.trim();
        if (!name || !email || !subject || !message) return;
        if (!validateEmail(email)) {
            setEmailError(true);
            return;
        }
        setSending(true);
        emailjs.sendForm(
            "service_ADD_EMAILJS_SERVICE_ID",
            "template_ADD_EMAILJS_TEMPLATE_ID",
            e.target,
            "ADD_EMAILJS_PUBLIC_KEY",
        ).then(() => {
            e.target.reset();
            setSending(false);
            setpop(true);
            setEmailError(false);
        }).catch(() => setSending(false));
    };
    const animatedPlaceholder = useTypingText([
        "Job Opportunity",
        "Freelance Work",
        "Collaboration Request",
    ]);
    return (
        <section id="contact" ref={sectionRef} className="relative w-full bg-[#040404] text-gray-50 flex justify-center px-6 py-28 overflow-hidden">
            {/* BACKGROUND GRID */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: ` linear-gradient(rgba(34,197,94,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.035) 1px, transparent 1px) `, backgroundSize: "48px 48px", }} />
            {/* CORNER BRACKETS */}
            <div className="absolute top-8 left-8 size-10 border-t border-l border-green-400/40 hidden xl:block" />
            <div className="absolute bottom-8 right-8 size-10 border-b border-r border-green-400/40 hidden xl:block" />
            <div className="relative z-10 w-full max-w-6xl flex flex-col gap-16">
                {/* HEADING */}
                <div className="flex items-center gap-5">
                    <div className="flex flex-col gap-1">
                        <p className="text-green-400/60 text-xs tracking-widest uppercase">
                            <span className="text-green-400">04.</span> Get in touch
                        </p>
                        <div className="overflow-hidden">
                            <h2 ref={headingRef} className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tighter text-gray-50">
                                Contact <span className="text-green-400">Me</span>
                            </h2>
                        </div>
                    </div>
                    <div className="flex-1 h-px bg-linear-to-r from-green-400/40 to-transparent mt-6" />
                </div>
                {/* TWO-COLUMN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    {/* LEFT */}
                    <div ref={leftRef} className="flex flex-col gap-8">
                        {/* INFO CARDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {contactInfo.map(({ icon, label, value, href }) => (
                                <a key={label} href={href || undefined} target={href ? "_blank" : undefined} rel="noreferrer" className={`group flex items-center gap-3 p-4 rounded border border-gray-50/5 bg-gray-50/2 transition-all duration-300 hover:border-green-400/40 hover:bg-green-400/5 ${href ? "cursor-pointer" : "cursor-default"}`} style={{ backdropFilter: "blur(8px)" }}>
                                    <span className="text-green-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform">
                                        {icon}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">
                                            {label}
                                        </p>
                                        <p className="text-sm text-gray-300 truncate group-hover:text-green-400 transition-colors">
                                            {value}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                        {/* NOTE */}
                        <div className="flex items-center gap-3 p-4 rounded border border-green-400/20 bg-green-400/5" style={{ backdropFilter: "blur(8px)" }}>
                            <span className="size-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                            <p className="text-sm text-gray-400">
                                Currently{" "}
                                <span className="text-green-400 font-bold">
                                    open to internships
                                </span>
                                , freelance work &amp; collaborations.
                            </p>
                        </div>
                        {/* MAP */}
                        <div className="h-82 rounded overflow-hidden relative">
                            <Map center={[88.470, 24.155]} zoom={13} theme="dark">
                                <MapControls
                                    position="top-right"
                                    showZoom
                                    showCompass
                                    // showLocate
                                    showFullscreen
                                />
                            </Map>
                        </div>
                    </div>
                    {/* RIGHT */}
                    <div ref={formRef}>
                        <div className="rounded border border-green-400/20 bg-gray-50/2 overflow-hidden" style={{ backdropFilter: "blur(8px)" }}>
                            {/* TITLE BAR */}
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50/3 border-b border-gray-50/5">
                                <span className="size-2.5 rounded-full bg-red-500/60" />
                                <span className="size-2.5 rounded-full bg-yellow-500/60" />
                                <span className="size-2.5 rounded-full bg-green-500/60" />
                                <span className="ml-3 text-xs text-gray-500">
                                    sendMessage.js
                                </span>
                            </div>
                            <form onSubmit={sendEmail} className="p-6 flex flex-col gap-5">
                                <p className="text-xs text-green-400/60 mb-1">
                                    <span className="text-green-400">$</span> ping --YOUR-NAME
                                </p>
                                <Field label="Your Name" name="name_from" placeholder="John Doe" required />
                                <Field label="Your Email" name="email_from" type="email" placeholder="johndoe@example.com" onChange={handleEmailChange} error={emailError} required />
                                <Field label="Subject" name="subject_from" placeholder={animatedPlaceholder} required />
                                <Field label="Message" name="textarea" placeholder="Just saying hi..." textarea required />
                                <button type="submit" disabled={sending} className="group relative w-full py-3.5 mt-1 text-sm font-bold uppercase tracking-widest text-black bg-green-500 rounded overflow-hidden transition-all disabled:opacity-60 disabled:cursor-not-allowed aldrich-regular">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {sending ? (
                                            <>
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.4" />
                                                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                                <span className="flex items-center translate-y-0.5 md:translate-y-px">
                                                    Sending&hellip;
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="flex items-center translate-y-0.5 md:translate-y-px">
                                                    $ send --message
                                                </span>
                                                <svg className="w-4 h-4 rotate-90 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                            </>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-green-400 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                                </button>
                                <p className="text-xs text-gray-600 text-center">
                                    - I usually respond within 24 hours -
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toast show={pop} onClose={() => setpop(false)} />
        </section>
    );
};

export default Contact;