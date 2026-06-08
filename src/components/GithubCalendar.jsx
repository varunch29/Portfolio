import { useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { FiGithub } from "react-icons/fi";
gsap.registerPlugin(ScrollTrigger, SplitText);

const calendarTheme = {
    dark: ["#0d0d0d", "#14532d", "#16a34a", "#22c55e", "#4ade80"],
};

const GithubCalendar = () => {
    const sectionRef = useRef(null);
    const calendarRef = useRef(null);
    const statsRef = useRef(null);
    useGSAP(
        () => {
            gsap.from(calendarRef.current, {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: calendarRef.current, start: "top 88%" },
            });
            gsap.from(Array.from(statsRef.current?.children || []), {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: { trigger: statsRef.current, start: "top 90%" },
            });
        },
        { scope: sectionRef },
    );
    return (
        <section id="github" ref={sectionRef} className="relative w-full text-gray-50 flex justify-center">
            <div className="relative z-10 w-full max-w-6xl flex flex-col items-center gap-14">
                <div ref={calendarRef} className="w-full rounded border border-green-400/20 bg-gray-50/2" style={{ backdropFilter: "blur(8px)" }}>
                    <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-gray-50/3 border-b border-gray-50/5 flex-wrap">
                        <div className="flex items-center gap-2">
                            <span className="size-2.5 rounded-full bg-red-500/60" />
                            <span className="size-2.5 rounded-full bg-yellow-500/60" />
                            <span className="size-2.5 rounded-full bg-green-500/60" />
                            <span className="ml-3 text-xs text-gray-500 truncate max-w-40 sm:max-w-none">
                                contributions.log
                            </span>
                        </div>
                        <a href="https://github.com/ADD-USERNAME" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-400 transition-colors">
                            Profile →
                        </a>
                    </div>
                    {/* TERMINAL PROMPT */}
                    <div className="px-5 pt-4 pb-4">
                        <p className="text-xs text-green-400/60 overflow-x-auto whitespace-nowrap">
                            <span className="text-green-400">$</span> git log --all --oneline
                            --graph --author="ADD-USERNAME"
                        </p>
                    </div>
                    {/* CALENDAR */}
                    <div className="px-5 pb-6 overflow-x-auto">
                        <div className="min-w-150">
                            <GitHubCalendar username="ADD-USERNAME" theme={calendarTheme} colorScheme="dark" fontSize={12} blockSize={14} blockMargin={6} blockRadius={2} showWeekdayLabels={true} style={{ color: "#6a7282" }} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-50/5 bg-gray-50/2 flex-wrap gap-3">
                        <p className="text-xs text-gray-500">
                            Less{" "}
                            <span className="inline-flex gap-1 mx-2 align-middle">
                                {["#0d0d0d", "#14532d", "#16a34a", "#22c55e", "#4ade80"].map((c) => (
                                    <span key={c} className="inline-block size-3 rounded-xs border border-gray-50/5" style={{ backgroundColor: c }} />
                                ))}
                            </span>{" "}
                            More
                        </p>
                        <div className="flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-xs text-gray-500">Live data</span>
                        </div>
                    </div>
                </div>
                {/* CTA */}
                <div className="flex items-center justify-center w-full">
                    <a href="https://github.com/ADD-USERNAME?tab=repositories" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 px-6 sm:px-8 py-4 rounded border border-green-400/40 bg-green-400/5 text-green-400 text-sm font-bold uppercase tracking-widest hover:bg-green-400/10 hover:border-green-400 transition-all duration-300 text-center">
                        <FiGithub className="size-5 shrink-0" />
                        Explore All Repositories
                        <svg className="size-4 shrink-0 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </a>
                </div>
                <div ref={statsRef} />
            </div>
        </section>
    );
};

export default GithubCalendar;