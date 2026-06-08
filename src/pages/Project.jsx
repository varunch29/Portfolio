import project from "/src/constant/projectData.js";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { FiGithub, FiExternalLink } from "react-icons/fi";
gsap.registerPlugin(ScrollTrigger, SplitText);

const Project = () => {
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
        <section ref={sectionRef} id="project" className="relative w-full bg-[#040404] text-gray-50 flex justify-center px-6 py-28 overflow-hidden">
            {/* BACKGROUND GRID */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: ` linear-gradient(rgba(34,197,94,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.035) 1px, transparent 1px) `, backgroundSize: "48px 48px", }} />
            <div className="max-w-7xl mx-auto flex flex-col gap-16">
                <div className="flex items-center gap-5">
                    <div className="flex flex-col gap-1">
                        <p className="text-green-400/60 text-xs tracking-widest uppercase">
                            <span className="text-green-400">03.</span> Case Studies
                        </p>
                        <div className="overflow-hidden">
                            <h2 ref={headingRef} className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tighter text-gray-50">
                                My <span className="text-green-400">Projects</span>
                            </h2>
                        </div>
                    </div>
                    <div className="flex-1 h-px bg-linear-to-r from-green-400/40 to-transparent mt-6" />
                </div>
                {/* PROJECT GRID */}
                <div ref={cardRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {project.map((proj) => (
                        <div key={proj.name} className="rounded border border-green-400/20 bg-gray-50/2 overflow-hidden p-6 flex flex-col  hover:border-green-400/40 transition-all duration-300" style={{ backdropFilter: "blur(8px)" }}>
                            {/* IMAGE */}
                            <div className="overflow-hidden rounded relative">
                                <span className="absolute bottom-2 right-2 bg-green-900 text-xs px-2 sm:px-3 py-1 rounded whitespace-nowrap">
                                    <span>{proj.projectType}</span>
                                </span>
                                <img src={proj.image} alt={proj.name} className="w-full h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                            {/* TITLE */}
                            <h3 className="text-2xl font-bold text-gray-50 mt-4">
                                {proj.name}
                            </h3>
                            {/* TIMESTAMP */}
                            <p className="text-gray-500 text-xs mt-2 flex-1">
                                {proj.timeStamp}
                            </p>
                            {/* DESCRIPTION */}
                            <p className="text-gray-400 text-sm mt-2 flex-1">
                                {proj.description}
                            </p>
                            {/* TECHNOLOGIES */}
                            <ul className="flex flex-wrap gap-2 mt-4">
                                {proj.technologies.map((tech) => (
                                    <li key={tech} className="px-2 py-1 text-xs text-green-400 rounded border border-green-400/20 bg-green-400/5">
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                            {/* BUTTONS */}
                            <div className="flex justify-between items-center mt-6">
                                <a href={proj.githubRepo} target="_blank" rel="noreferrer" className="px-3 flex justify-center gap-2 items-center py-1.5 rounded bg-green-500 text-black hover:bg-green-400 transition-all">
                                    <FiGithub />
                                    GitHub
                                </a>
                                <a href={proj.liveDemo} target="_blank" rel="noreferrer" className="px-3 py-1.5 flex justify-center gap-2 items-center rounded text-green-400 border border-green-400/20 hover:border-green-400/40 bg-green-400/5 hover:bg-green-400/10 transition-all">
                                    <FiExternalLink />
                                    Website
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Project;