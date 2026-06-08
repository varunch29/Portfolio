import { useRef, useEffect, useReducer } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import avatar from "../assets/images/Avatar.webp";
import { HorizontalTicker } from "react-infinite-ticker";

gsap.registerPlugin(SplitText, ScrollTrigger);

const techStack = [
    "Javascript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Figma",
    "Shadcn UI",
    "CSS",
    "Tailwind CSS",
    "Astro",
    "Git",
    "Github",
    "Python",
    "Firebase",
    "Appwrite",
    "Supabase",
    "Convex",
    "Vercel",
    "Netlify",
    "Bootstrap",
    "WordPress",
];

const typingReducer = (state, action) => {
    switch (action.type) {
        case 'TYPE': return { ...state, charIdx: state.charIdx + 1 };
        case 'START_DELETE': return { ...state, deleting: true };
        case 'DELETE': return { ...state, charIdx: state.charIdx - 1 };
        case 'NEXT_WORD': return { ...state, deleting: false, idx: (state.idx + 1) % action.payload };
        default: return state;
    }
};

const TypingText = ({ texts }) => {
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
    return (
        <span className="text-green-400">
            {texts[state.idx].slice(0, state.charIdx)}
            <span className="animate-pulse text-green-400">│</span>
        </span>
    );
};

const Home = () => {
    const containerRef = useRef(null);
    const headlineRef = useRef(null);
    const subRef = useRef(null);
    const descRef = useRef(null);
    const ctaRef = useRef(null);
    const illustRef = useRef(null);
    useGSAP(
        () => {
            const split = new SplitText(headlineRef.current, { type: "chars,words" });
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            tl.from(split.chars, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.04,
            })
                .from(subRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
                .from(descRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
                .from(
                    ctaRef.current,
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.6,
                        stagger: 0.15,
                    },
                    "-=0.4",
                )
                .from(
                    illustRef.current,
                    { x: 80, opacity: 0, duration: 1.2, ease: "power3.out" },
                    0.2,
                );
            gsap.to(illustRef.current, {
                y: -18,
                duration: 3,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#home",
                    start: "top top",
                    end: "40% top",
                    scrub: 1,
                },
            });
            scrollTl.to(split.chars, { y: -60, opacity: 0, stagger: 0.01 }, 0);
        },
        { scope: containerRef },
    );
    return (
        <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#040404]">
            {/* BACKGROUND GRID */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: ` linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px) `, backgroundSize: "48px 48px", }} />
            {/* RADIAL GLOW */}
            <div className="absolute top-0 right-0 size-150 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 30%, rgba(34,197,94,0.12) 0%, transparent 65%)", }} />
            <div className="absolute bottom-0 left-0 size-100 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 80%, rgba(34,197,94,0.07) 0%, transparent 65%)", }} />
            {/* VERTICAL LINES */}
            <div className="absolute left-[6%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-green-500/20 to-transparent hidden lg:block" />
            <div className="absolute right-[6%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-green-500/20 to-transparent hidden lg:block" />
            {/* MAIN LAYOUT */}
            <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">
                {/* LEFT: TEXT CONTENT */}
                <div className="flex-1 flex flex-col gap-7 text-left max-w-xl">
                    {/* STATUS BADGE */}
                    <div className="inline-flex items-center gap-2 self-start bg-green-400/5 border border-green-400/40 rounded px-4 py-1.5">
                        <span className="size-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-green-400 text-xs tracking-widest uppercase">
                            Open to Work
                        </span>
                    </div>
                    {/* TERMINAL PROMPT LINE */}
                    <p className="text-green-400/60 text-sm tracking-widest uppercase">
                        ~/portfolio <span className="text-green-400">$</span> whoami
                    </p>
                    {/* MAIN HEADLINE */}
                    <div className="overflow-hidden">
                        <h1 ref={headlineRef} className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase leading-[0.9] tracking-tighter text-gray-50">
                            FULLSTACK
                            <br />
                            <span className="text-green-400">
                                DEVELOPER
                            </span>
                        </h1>
                    </div>
                    <div ref={subRef} className="text-lg md:text-xl text-gray-400">
                        <p className="mb-2">Hi, I'm <span className="text-gray-50 font-bold">Portfolio</span></p>
                        {/* TYPING TEXT */}
                        <TypingText texts={["Frontend Developer", "Full Stack Engineer", "Freelancer", "Web Designer", "Computer Science Student",]} />
                    </div>
                    {/* DESCRIPTION */}
                    <p ref={descRef} className="text-sm md:text-base text-gray-400 leading-relaxed max-w-md">
                        I build modern, dynamic, and interactive web applications with{" "}
                        <span className="text-blue-400">React</span>,{" "}
                        <span className="text-neutral-200">Next.js</span>,{" "}
                        <span className="text-green-400">Node.js</span>,{" "}
                        <span className="text-sky-500">Tailwind CSS</span>,{" "}
                        <span className="text-orange-400">Firebase</span>, and{" "}
                        <span className="text-rose-500">Appwrite</span> - turning complex ideas into seamless digital experiences.
                    </p>
                    {/* CTA */}
                    <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-2 opacity-100">
                        <a href="#project" className="group relative px-7 py-3.5 bg-green-500 text-black text-sm font-bold uppercase tracking-widest rounded overflow-hidden transition-all duration-300">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                View Projects
                                <svg className="size-4 group-hover:translate-x-1 transition-transform" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-green-400 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                        </a>
                        <a href="#contact" className="group px-7 py-3.5 border border-green-400/40 bg-green-400/5 text-green-400 text-sm font-bold uppercase tracking-widest rounded transition-all duration-300 hover:border-green-400 hover:bg-green-400/10">
                            <span className="flex items-center justify-center gap-2">
                                Contact Me
                                <svg className="size-3.5 group-hover:rotate-12 transition-transform" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
                {/* RIGHT: ILLUSTRATION */}
                <div className="flex-1 flex justify-center lg:justify-end">
                    <img loading="lazy" ref={illustRef} src={avatar} alt="Illustration" className="w-[320px] md:w-100 lg:w-112.5 pointer-events-none select-none" />
                </div>
            </div>
            {/* SCROLL */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                <span className="text-xs text-gray-500 tracking-widest uppercase">
                    Scroll
                </span>
                <div className="w-px h-10 bg-linear-to-b from-green-400 to-transparent animate-pulse" />
            </div>
            {/* TECH STACK */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-green-400/10 bg-black/40 py-2 overflow-hidden">
                <HorizontalTicker duration={100000}>
                    <div className="flex gap-16 whitespace-nowrap text-xs text-green-400/60 tracking-widest uppercase">
                        {techStack.map((t) => (
                            <span key={t} className="flex items-center gap-3">
                                <span className="text-green-400">
                                    ▹
                                </span> {t}
                            </span>
                        ))}
                        <span className="w-4 shrink-0"></span>
                    </div>
                </HorizontalTicker>
            </div>
        </section>
    );
};

export default Home;