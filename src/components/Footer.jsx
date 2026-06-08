const Footer = () => {
    return (
        <section className="w-full py-8 bg-[#040404] text-gray-300 flex flex-col items-center justify-center gap-4 border-t border-gray-50/10 backdrop-blur-md">
            <h1 className="text-2xl font-bold text-gray-50 tracking-wide">
                Portfolio<span className="text-green-500">.Dev</span>
            </h1>
            <p className="text-center text-sm leading-relaxed" suppressHydrationWarning>
                © {new Date().getFullYear()}{" "}
                <span className="font-bold">Portfolio</span>. All rights reserved.
            </p>
        </section>
    );
};

export default Footer;