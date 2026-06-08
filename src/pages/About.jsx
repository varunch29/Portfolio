import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import dp from "../assets/images/DP.webp";
import { FaSquareFacebook, FaSquareInstagram, FaSquareXTwitter, FaSquareWhatsapp, FaSquareBluesky } from "react-icons/fa6";
import GithubCalendar from "../components/GithubCalendar";
import CustomTerminal from "@/components/CustomTerminal";

gsap.registerPlugin(ScrollTrigger, SplitText);

const GitHubIcon = () => (
    <svg className="scale-105" fill="currentColor" width="26px" height="26px" viewBox="-1.4 -1.4 24 24" preserveAspectRatio="xMinYMin">
        <path d='M18.88 1.099C18.147.366 17.265 0 16.233 0H3.746C2.714 0 1.832.366 1.099 1.099.366 1.832 0 2.714 0 3.746v12.487c0 1.032.366 1.914 1.099 2.647.733.733 1.615 1.099 2.647 1.099H6.66c.19 0 .333-.007.429-.02a.504.504 0 0 0 .286-.169c.095-.1.143-.245.143-.435l-.007-.885c-.004-.564-.006-1.01-.006-1.34l-.3.052c-.19.035-.43.05-.721.046a5.555 5.555 0 0 1-.904-.091 2.026 2.026 0 0 1-.872-.39 1.651 1.651 0 0 1-.572-.8l-.13-.3a3.25 3.25 0 0 0-.41-.663c-.186-.243-.375-.407-.566-.494l-.09-.065a.956.956 0 0 1-.17-.156.723.723 0 0 1-.117-.182c-.026-.061-.004-.111.065-.15.07-.04.195-.059.378-.059l.26.04c.173.034.388.138.643.311a2.1 2.1 0 0 1 .631.677c.2.355.44.626.722.813.282.186.566.28.852.28.286 0 .533-.022.742-.065a2.59 2.59 0 0 0 .585-.196c.078-.58.29-1.028.637-1.34a8.907 8.907 0 0 1-1.333-.234 5.314 5.314 0 0 1-1.223-.507 3.5 3.5 0 0 1-1.047-.872c-.277-.347-.505-.802-.683-1.365-.177-.564-.266-1.215-.266-1.952 0-1.049.342-1.942 1.027-2.68-.32-.788-.29-1.673.091-2.652.252-.079.625-.02 1.119.175.494.195.856.362 1.086.5.23.14.414.257.553.352a9.233 9.233 0 0 1 2.497-.338c.859 0 1.691.113 2.498.338l.494-.312a6.997 6.997 0 0 1 1.197-.572c.46-.174.81-.221 1.054-.143.39.98.424 1.864.103 2.653.685.737 1.028 1.63 1.028 2.68 0 .737-.089 1.39-.267 1.957-.177.568-.407 1.023-.689 1.366-.282.343-.633.63-1.053.865-.42.234-.828.403-1.223.507a8.9 8.9 0 0 1-1.333.235c.45.39.676 1.005.676 1.846v3.11c0 .147.021.266.065.357a.36.36 0 0 0 .208.189c.096.034.18.056.254.064.074.01.18.013.318.013h2.914c1.032 0 1.914-.366 2.647-1.099.732-.732 1.099-1.615 1.099-2.647V3.746c0-1.032-.367-1.914-1.1-2.647z' />
    </svg>
);

const skillsFrontend = [
    { name: "HTML", level: 100, color: "#f16529" },
    { name: "CSS", level: 100, color: "#66309a" },
    { name: "JavaScript", level: 84, color: "#f7e819" },
    { name: "TypeScript", level: 77, color: "#3178c6" },
];

const skillsBackend = [
    { name: "Node.js", level: 42, color: "#22c55e" },
    { name: "Firebase", level: 71, color: "#ff8904" },
    { name: "Appwrite", level: 66, color: "#ff2056" },
    { name: "Supabase", level: 54, color: "#3ecf8e" },
    { name: "Convex", level: 69, color: "#ee342f" },
];

const skillsFrameworks = [
    { name: "React", level: 64, color: "#0095be" },
    { name: "Next.js", level: 58, color: "#ededed" },
    { name: "Tailwind CSS", level: 86, color: "#00a6f4" },
    { name: "Shadcn UI", level: 94, color: "#e5e5e5" },
];

const skillsTools = [
    { name: "Visual Studio Code", level: 100, color: "#0c8cd3" },
    { name: "Antigravity", level: 100, color: "#978b60" },
    { name: "Git", level: 96, color: "#f05133" },
    { name: "GitHub", level: 100, color: "#f0f6fc" },
    { name: "Figma", level: 88, color: "#ff3737" },
];

const skillsOthers = [
    { name: "Photoshop", level: 36, color: "#31a8ff" },
    { name: "Illustrator", level: 28, color: "#ff9b00" },
    { name: "WordPress Studio", level: 46, color: "#3858e9" },
];

const SkillBar = ({ name, level, color, delay }) => {
    const barRef = useRef(null);
    useGSAP(() => {
        gsap.from(barRef.current, {
            width: 0,
            duration: 1.2,
            ease: "power3.out",
            delay,
            scrollTrigger: { trigger: barRef.current, start: "top 90%" },
        });
    });
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                    {name}
                </span>
                <span className="text-xs" style={{ color }}>
                    {level}%
                </span>
            </div>
            <div className="w-full h-1 bg-gray-50/5 rounded-full overflow-hidden">
                <div ref={barRef} className="h-full rounded-full" style={{ width: `${level}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, }} />
            </div>
        </div>
    );
};

const terminalCommands = {
    help: (
        <span className="text-gray-400">
            - <span className="text-blue-400">hobbies</span>
            <br />
            - <span className="text-blue-400">certificates</span>
        </span>
    ),
    hobbies: (
        <span className="text-gray-400">
            - Reading, Learning, Travelling, Photography, Programming
        </span>
    ),
    certificates: (
        <span className="text-gray-400">
            - <a target="_blank" rel="noreferrer" href="ADD-LINK" className="underline">
                CS50x
            </a>
        </span>
    ),
};

const About = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardRef = useRef(null);
    const infoRef = useRef(null);
    const rightRef = useRef(null);
    useGSAP(() => {
        const split = new SplitText(headingRef.current, { type: "chars" });
        gsap.from(split.chars, {
            yPercent: 120,
            opacity: 0,
            duration: 0.9,
            stagger: 0.04,
            ease: "expo.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        });
        gsap.from(cardRef.current, {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
        });
        gsap.from(rightRef.current, {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: rightRef.current, start: "top 85%" },
        });
        gsap.from(Array.from(infoRef.current?.children || []), {
            x: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: infoRef.current, start: "top 88%" },
        });
    }, { scope: sectionRef });
    return (
        <section id="about" ref={sectionRef} className="relative w-full bg-[#040404] text-gray-50 flex justify-center px-6 py-28 overflow-hidden">
            {/* BACKGROUND GRID */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: ` linear-gradient(rgba(34,197,94,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.035) 1px, transparent 1px) `, backgroundSize: "48px 48px", }} />
            <div className="relative z-10 w-full max-w-6xl flex flex-col gap-16">
                {/* SECTION HEADING */}
                <div className="flex items-center gap-5">
                    <div className="flex flex-col gap-1">
                        <p className="text-green-400/60 text-xs tracking-widest uppercase">
                            <span className="text-green-400">02.</span> Who I am
                        </p>
                        <div className="overflow-hidden">
                            <h2 ref={headingRef} className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tighter text-gray-50">
                                About <span className="text-green-400">Me</span>
                            </h2>
                        </div>
                    </div>
                    <div className="flex-1 h-px bg-linear-to-r from-green-400/40 to-transparent mt-6" />
                </div>
                {/* TWO-COLUMN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* LEFT: CARD */}
                    <div ref={cardRef} className="flex flex-col gap-6">
                        {/* PROFILE CARD */}
                        <div className="relative p-6 rounded border border-green-400/20 bg-gray-50/2" style={{ backdropFilter: "blur(8px)" }}>
                            <div className="flex items-center gap-5 mb-5">
                                {/* AVATAR */}
                                <div className="size-20 shrink-0 relative">
                                    <img loading="lazy" src={dp} alt="Illustration" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-50">
                                        Portfolio
                                    </h3>
                                    <p className="text-green-400 text-sm mt-0.5">
                                        Full-stack Developer
                                    </p>
                                    {/* <p className="text-green-400 text-sm mt-0.5">
                                        Front-end Developer
                                    </p> */}
                                    <div className="flex items-center gap-1.5 mt-1.5">
                                        <span className="size-2 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-xs text-gray-400">
                                            Available for hire
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* BIO */}
                            <p className="text-sm text-gray-400 leading-relaxed">
                                I'm Portfolio, a{" "}
                                <span className="text-green-400 font-bold">
                                    full-stack developer
                                </span>{" "}
                                pursuing B.Tech in computer science. I build clean, responsive, and dynamic websites and landing pages using{" "}
                                <span className="text-blue-400">React</span>,{" "}
                                <span className="text-neutral-200">Next.js</span>,{" "}
                                <span className="text-green-400">Node.js</span>,{" "}
                                <span className="text-orange-400">Firebase</span>, and{" "}
                                <span className="text-rose-500">Appwrite</span>. Passionate about
                                turning ideas into real-world projects and constantly learning
                                new tech.
                            </p>
                            {/* <p className="text-sm text-gray-400 leading-relaxed">
                                I'm Portfolio, a{" "}
                                <span className="text-green-400 font-bold">
                                    front-end developer
                                </span>{" "}
                                with a little bit of knowledge of the{" "}
                                <span className="text-green-400 font-bold">
                                    backend
                                </span>,{" "}
                                pursuing B.Tech in computer science. I build clean, responsive, and dynamic websites and landing pages using{" "}
                                <span className="text-blue-400">React</span>,{" "}
                                <span className="text-neutral-200">Next.js</span>,{" "}
                                <span className="text-green-400">Node.js</span>,{" "}
                                <span className="text-orange-400">Firebase</span>, and{" "}
                                <span className="text-rose-500">Appwrite</span>. Passionate about
                                turning ideas into real-world projects and constantly learning
                                new tech.
                            </p> */}
                            {/* SOCIAL + RESUME */}
                            <div className="flex items-center justify-between flex-col sm:flex-row gap-4 mt-6 pt-5 border-t border-gray-50/5">
                                <div className="flex gap-3">
                                    {[
                                        {
                                            icon: <FaSquareFacebook />,
                                            href: "https://www.facebook.com/ADD-USERNAME",
                                            color: "#0064e0",
                                        },
                                        {
                                            icon: <FaSquareInstagram />,
                                            href: "https://www.instagram.com/ADD-USERNAME/",
                                            color: "#E1306C",
                                        },
                                        {
                                            icon: <GitHubIcon />,
                                            href: "https://github.com/ADD-USERNAME",
                                            color: "#fafafa",
                                        },
                                        {
                                            icon: <FaSquareXTwitter />,
                                            href: "https://x.com/",
                                            color: "#fafafa",
                                        },
                                        {
                                            icon: <FaSquareBluesky />,
                                            href: "https://bsky.app/profile/ADD-LINK.bsky.social",
                                            color: "#0F73FF",
                                        },
                                        {
                                            icon: <FaSquareWhatsapp />,
                                            href: "https://api.whatsapp.com/send/?phone=91-ADD-NUM&text&type=phone_number&app_absent=0",
                                            color: "#05df72",
                                        },
                                    ].map(({ icon, href, color }) => (
                                        <a key={href} href={href} target="_blank" rel="noreferrer" className="text-2xl text-gray-600 transition-all duration-300 hover:scale-110" style={{ "--hover-color": color }} onMouseEnter={(e) => (e.currentTarget.style.color = color)} onMouseLeave={(e) => (e.currentTarget.style.color = "")}>
                                            {icon}
                                        </a>
                                    ))}
                                </div>
                                <a href="#resume" target="_blank" rel="noreferrer" className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-widest text-black bg-green-400 rounded overflow-hidden transition-all aldrich-regular">
                                    <span className="relative z-10 flex items-center gap-2">
                                        <svg className="size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                                            <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                                            <path d="M10 9H8" />
                                            <path d="M16 13H8" />
                                            <path d="M16 17H8" />
                                        </svg>
                                        <span className="flex items-center translate-y-px md:translate-y-0">Resume</span>
                                    </span>
                                    <div className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </a>
                            </div>
                        </div>
                        {/* JSON-STYLE INFO PANEL */}
                        <div className="rounded border border-green-400/20 bg-gray-50/2 overflow-hidden" style={{ backdropFilter: "blur(8px)" }}>
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50/3 border-b border-gray-50/5">
                                <span className="size-2.5 rounded-full bg-red-500/60" />
                                <span className="size-2.5 rounded-full bg-yellow-500/60" />
                                <span className="size-2.5 rounded-full bg-green-500/60" />
                                <span className="ml-3 text-xs text-gray-500">
                                    about.json
                                </span>
                            </div>
                            <pre className="p-5 mr-5 text-sm leading-8 overflow-auto">
                                <code className="jetbrains-mono" ref={infoRef}>
                                    <div className="text-gray-400">{"{"}</div>
                                    <div className="pl-4">
                                        <span className="text-blue-400">"name"</span>:{" "}
                                        <span className="text-green-300">"Portfolio"</span>
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-blue-400">"role"</span>:{" "}
                                        <span className="text-green-300">"Full-stack Developer"</span>
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-blue-400">"status"</span>:{" "}
                                        <span className="text-green-300">"Open to Work"</span>
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-blue-400">"experience"</span>:{" "}
                                        <span className="text-gray-400">{"{"}</span>
                                        <div className="pl-8">
                                            <span className="text-blue-400">"level"</span>:{" "}
                                            <span className="text-green-300">"Fresher"</span>
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-blue-400">"frontend"</span>:{" "}
                                            <span className="text-green-300">"4+ years"</span>
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-blue-400">"backend"</span>:{" "}
                                            <span className="text-green-300">"Beginner"</span>
                                        </div>
                                        <div className="text-gray-400">{"}"}</div>
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-blue-400">"workPreference"</span>:{" "}
                                        <span className="text-gray-400">{"{"}</span>
                                        <div className="pl-8">
                                            <span className="text-blue-400">"remote"</span>:{" "}
                                            <span className="text-red-400">true</span>
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-blue-400">"freelance"</span>:{" "}
                                            <span className="text-red-400">true</span>
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-blue-400">"internship"</span>:{" "}
                                            <span className="text-red-400">true</span>
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-blue-400">"on-site"</span>:{" "}
                                            <span className="text-red-400">true</span>
                                        </div>
                                        <div className="text-gray-400">{"}"}</div>
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-blue-400">"education"</span>:{" "}
                                        <span className="text-gray-400">{"{"}</span>
                                        <div className="pl-8">
                                            <span className="text-blue-400">"2024-Present"</span>:{" "}
                                            <span className="text-gray-400">{"{"}</span>

                                            <div className="pl-12">
                                                <span className="text-blue-400">"degree"</span>:{" "}
                                                <span className="text-green-300">"Bachelor of Technology"</span>
                                            </div>
                                            <div className="pl-12">
                                                <span className="text-blue-400">"field"</span>:{" "}
                                                <span className="text-green-300">"Computer Science & Engineering"</span>
                                            </div>
                                            <div className="text-gray-400">{"}"}</div>
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-blue-400">"2021-2024"</span>:{" "}
                                            <span className="text-gray-400">{"{"}</span>
                                            <div className="pl-12">
                                                <span className="text-blue-400">"degree"</span>:{" "}
                                                <span className="text-green-300">"Diploma in Engineering"</span>
                                            </div>
                                            <div className="pl-12">
                                                <span className="text-blue-400">"field"</span>:{" "}
                                                <span className="text-green-300">"Computer Science & Technology"</span>
                                            </div>
                                            <div className="text-gray-400">{"}"}</div>
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-blue-400">"2019-2021"</span>:{" "}
                                            <span className="text-green-300">"Higher Secondary Education"</span>
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-blue-400">"2013-2019"</span>:{" "}
                                            <span className="text-green-300">"Secondary Education"</span>
                                        </div>
                                        <div className="text-gray-400">{"}"}</div>
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-blue-400">"location"</span>:{" "}
                                        <span className="text-gray-400">{"{"}</span>
                                        <div className="pl-8">
                                            <span className="text-blue-400">"city"</span>:{" "}
                                            <span className="text-green-300">"ADD-CITY"</span>
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-blue-400">"country"</span>:{" "}
                                            <span className="text-green-300">"India"</span>
                                        </div>
                                        <div className="text-gray-400">{"}"}</div>
                                    </div>
                                    <div className="text-gray-400">{"}"}</div>
                                </code>
                            </pre>
                        </div>
                        {/* CARDS */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                {
                                    icon: "⚛️",
                                    title: "Frontend Dev",
                                    desc: "React, Next.js, Tailwind",
                                },
                                {
                                    icon: "🖥️",
                                    title: "Backend Dev",
                                    desc: "Node.js, Firebase, Appwrite",
                                },
                                {
                                    icon: "🗄️",
                                    title: "Database",
                                    desc: "NeonDB",
                                },
                                {
                                    icon: "✨",
                                    title: "UI/UX",
                                    desc: "Figma",
                                },
                            ].map(({ icon, title, desc }) => (
                                <div key={title} className="group relative p-4 rounded border border-gray-50/5 bg-gray-50/2 hover:border-green-400/40 transition-all duration-300 hover:bg-green-400/5 cursor-default" style={{ backdropFilter: "blur(8px)" }}>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded" style={{ background: "radial-gradient(circle at 50% 0%, rgba(34,197,94,0.06) 0%, transparent 70%)", }} />
                                    <span className="text-2xl mb-2 block">
                                        {icon}
                                    </span>
                                    <p className="text-gray-50 text-sm mb-1">
                                        {title}
                                    </p>
                                    <p className="text-gray-500 text-xs leading-relaxed">
                                        {desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* RIGHT: SKILLS */}
                    <div ref={rightRef} className="flex flex-col gap-6">
                        <div className="rounded border border-green-400/20 bg-gray-50/2 overflow-hidden" style={{ backdropFilter: "blur(8px)" }}>
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50/3 border-b border-gray-50/5">
                                <span className="size-2.5 rounded-full bg-red-500/60" />
                                <span className="size-2.5 rounded-full bg-yellow-500/60" />
                                <span className="size-2.5 rounded-full bg-green-500/60" />
                                <span className="ml-3 text-xs text-gray-500">
                                    skills.config.js
                                </span>
                            </div>
                            <div className="p-6 flex flex-col gap-5">
                                <p className="text-xs text-green-400/60 tracking-widest mb-2">
                                    <span className="text-green-400">$</span> fetch --skills frontend
                                </p>
                                {skillsFrontend.map((s, i) => (
                                    <SkillBar key={s.name} {...s} delay={i * 0.1} />
                                ))}
                                <p className="text-xs text-green-400/60 tracking-widest mb-2 mt-2">
                                    <span className="text-green-400">$</span> fetch --skills backend
                                </p>
                                {skillsBackend.map((s, i) => (
                                    <SkillBar key={s.name} {...s} delay={i * 0.1} />
                                ))}
                                <p className="text-xs text-green-400/60 tracking-widest mb-2 mt-2">
                                    <span className="text-green-400">$</span> fetch --skills frameworks
                                </p>
                                {skillsFrameworks.map((s, i) => (
                                    <SkillBar key={s.name} {...s} delay={i * 0.1} />
                                ))}
                            </div>
                        </div>
                        <div className="rounded border border-green-400/20 bg-gray-50/2 overflow-hidden" style={{ backdropFilter: "blur(8px)" }}>
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50/3 border-b border-gray-50/5">
                                <span className="size-2.5 rounded-full bg-red-500/60" />
                                <span className="size-2.5 rounded-full bg-yellow-500/60" />
                                <span className="size-2.5 rounded-full bg-green-500/60" />
                                <span className="ml-3 text-xs text-gray-500">
                                    toolkit.config.js
                                </span>
                            </div>
                            <div className="p-6 flex flex-col gap-5">
                                <p className="text-xs text-green-400/60 tracking-widest mb-2 mt-2">
                                    <span className="text-green-400">$</span> fetch --tools development
                                </p>
                                {skillsTools.map((s, i) => (
                                    <SkillBar key={s.name} {...s} delay={i * 0.1} />
                                ))}
                                <p className="text-xs text-green-400/60 tracking-widest mb-2 mt-2">
                                    <span className="text-green-400">$</span> fetch --tools others
                                </p>
                                {skillsOthers.map((s, i) => (
                                    <SkillBar key={s.name} {...s} delay={i * 0.1} />
                                ))}
                            </div>
                        </div>
                        {/* TERMINAL */}
                        <div className="rounded border border-gray-50/5 h-86" data-lenis-prevent="true" onWheel={(e) => e.stopPropagation()} style={{ backdropFilter: "blur(8px)" }}>
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50/3 border-b border-gray-50/5">
                                <span className="size-2.5 rounded-full bg-red-500/60" />
                                <span className="size-2.5 rounded-full bg-yellow-500/60" />
                                <span className="size-2.5 rounded-full bg-green-500/60" />
                                <span className="ml-3 text-xs text-gray-500">
                                    terminal.exe
                                </span>
                            </div>
                            <div className="h-76">
                                <CustomTerminal
                                    commands={terminalCommands}
                                    theme={{
                                        themeBGColor: "#090909",
                                        themeColor: "#ffb86a",
                                        themePromptColor: "#05df72"
                                    }}
                                    welcomeMessage={
                                        <span className="text-sm text-gray-400 jetbrains-mono">
                                            Portfolio [Version 1.0.0]
                                            <br />
                                            Type <span className="text-green-400">'help'</span> for a list of available commands.
                                            <br />
                                        </span>
                                    }
                                    promptLabel={
                                        <span className="text-sm jetbrains-mono">
                                            portfolio@shell:~$
                                        </span>
                                    }
                                    errorMessage={
                                        <span className="text-sm text-gray-400 jetbrains-mono">
                                            <span className="text-red-400">
                                                Command not found.
                                            </span>{" "}
                                            Type <span className="text-green-400">'help'</span> for a list of available commands.
                                        </span>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <GithubCalendar />
            </div>
        </section>
    );
};

export default About;