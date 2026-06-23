import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";

function setBodyOverflow(open) {
    if (typeof document !== "undefined") {
        document.body.style.overflow = open ? "hidden" : "";
    }
}

const links = [
    { label: "Home", href: "#home", num: "01" },
    { label: "About", href: "#about", num: "02" },
    { label: "Projects", href: "#project", num: "03" },
    { label: "Contact", href: "#contact", num: "04" },
];

const Navbar = () => {
    const menuOpen = useRef(false);
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(() => {
        if (typeof window === "undefined") return 0;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        return docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    });
    const [activeLink, setActiveLink] = useState("#home");
    const navRef = useRef(null);
    const mobileRef = useRef(null);
    const { contextSafe } = useGSAP({ scope: mobileRef });
    const toggleMenu = (open) => {
        const safeHandler = contextSafe(() => {
            menuOpen.current = open;
            setBodyOverflow(open);
            if (open) {
                gsap.fromTo(
                    mobileRef.current,
                    { x: "100%", opacity: 0 },
                    { x: "0%", opacity: 1, duration: 0.40, ease: "expo.out" },
                );
                gsap.fromTo(
                    "#mobile-links a",
                    { x: 40, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.4,
                        stagger: 0.05,
                        ease: "back.out(1.5)",
                        delay: 0.1,
                    },
                );
            } else {
                gsap.to(mobileRef.current, {
                    x: "100%",
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in",
                });
            }
        });
        safeHandler();
    };
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
            const sections = links.map((l) => l.href.replace("#", ""));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveLink(links[i].href);
                    break;
                }
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(Math.min(100, scrolled));
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <>
            <nav ref={navRef} className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-black/95" : "bg-transparent"}`}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* LOGO */}
                    <a id="nav-logo" href="/" className="flex items-center gap-2 group">
                        <span className="text-green-400 text-lg font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                            {"<"}
                        </span>
                        <span className="text-gray-50 font-bold text-lg tracking-tight">
                            Varun Reddy
                            <span className="text-green-400">.Dev</span>
                        </span>
                        <span className="text-green-400 text-lg font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                            {"/>"}
                        </span>
                    </a>
                    {/* DESKTOP LINKS */}
                    <div id="nav-links" className="hidden md:flex items-center gap-1">
                        {links.map(({ label, href, num }) => {
                            const isActive = activeLink === href;
                            return (
                                <a key={href} href={href} className={`relative group flex items-center gap-1.5 px-4 py-2 text-sm rounded transition-all duration-300 ${isActive ? "text-green-400" : "text-gray-400 hover:text-gray-50"}`}>
                                    <span className={`text-xs transition-colors duration-300 ${isActive ? "text-green-500" : "text-gray-600 group-hover:text-green-600"}`}>
                                        {num}.
                                    </span>
                                    {label}
                                </a>
                            );
                        })}
                    </div>
                    {/* CTA */}
                    {/* <a id="nav-cta" href="#resume" target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#040404] bg-green-400 rounded hover:bg-green-500 transition-all duration-300 aldrich-regular">
                        <svg className="size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                            <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                            <path d="M10 9H8" />
                            <path d="M16 13H8" />
                            <path d="M16 17H8" />
                        </svg>
                        Resume
                    </a> */}
                    {/* HAMBURGER MENU */}
                    <button type="button" onClick={() => toggleMenu(true)} className="md:hidden flex items-center justify-center size-9 border border-gray-50/10 rounded text-gray-400">
                        <HiMenuAlt3 className="text-base" />
                    </button>
                </div>
                {/* PROGRESS BAR */}
                <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                    <div className="h-full bg-green-400/40 transition-none" style={{ width: `${progress}%` }} />
                </div>
            </nav>
            {/* MOBILE MENU OVERLAY */}
            <div ref={mobileRef} className="fixed inset-0 z-60 bg-[#040404]/95 backdrop-blur-xl md:hidden" style={{ transform: "translateX(100%)", opacity: 0 }}>
                {/* CORNER DECORATIONS */}
                <div className="absolute top-6 left-6 size-8 border-t border-l border-green-400/40" />
                <div className="absolute bottom-6 right-6 size-8 border-b border-r border-green-400/40" />
                {/* BACKGROUND GRID */}
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: ` linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px) `, backgroundSize: "48px 48px", }} />
                {/* CLOSE BTN */}
                <button type="button" onClick={() => toggleMenu(false)} className="absolute top-5 right-5 flex items-center justify-center size-9 border border-gray-50/10 rounded text-gray-400">
                    <IoClose className="text-base" />
                </button>
                {/* LINKS */}
                <div id="mobile-links" className="flex flex-col items-start justify-center h-full px-10 gap-2">
                    <p className="text-xs text-green-400/60 tracking-widest mb-4">
                        <span className="text-green-400">$</span> NAVIGATE --TO
                    </p>
                    {links.map(({ label, href, num }) => {
                        const isActive = activeLink === href;
                        return (
                            <a key={href} href={href} onClick={() => toggleMenu(false)} className={`group flex items-center gap-4 py-3 w-full border-b transition-all duration-300 ${isActive ? "border-green-400/40 text-green-400" : "border-gray-50/5 hover:border-gray-50/20 text-gray-400 hover:text-gray-50"}`}>
                                <span className={`text-xs transition-colors ${isActive ? "text-green-500" : "text-gray-600 group-hover:text-green-600"}`}>
                                    {num}.
                                </span>
                                <span className="text-3xl font-bold uppercase tracking-tight">
                                    {label}
                                </span>
                                <svg className={`w-5 h-5 ml-auto transition-all duration-300 ${isActive ? "text-green-500 translate-x-0" : "text-gray-600 -translate-x-2 group-hover:translate-x-0 group-hover:text-green-600"}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                        );
                    })}
                    {/* CTA */}
                    <a href="#resume" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#040404] bg-green-400 rounded hover:bg-green-500 transition-all aldrich-regular">
                        <svg className="size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                            <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                            <path d="M10 9H8" />
                            <path d="M16 13H8" />
                            <path d="M16 17H8" />
                        </svg>
                        <span className="flex items-center translate-y-px">Resume</span>
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;