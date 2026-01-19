import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";

const AnimatedBackground = () => {
    const { darkMode } = useTheme();
    const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

    useEffect(() => {
        // Set dimensions on client side only
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Animated gradient background */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: darkMode
                        ? [
                            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                        ]
                        : [
                            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)",
                            "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
                        ],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full ${darkMode ? "bg-blue-400/20" : "bg-blue-500/10"
                        }`}
                    initial={{
                        x: Math.random() * dimensions.width,
                        y: Math.random() * dimensions.height,
                    }}
                    animate={{
                        x: [
                            Math.random() * dimensions.width,
                            Math.random() * dimensions.width,
                            Math.random() * dimensions.width,
                        ],
                        y: [
                            Math.random() * dimensions.height,
                            Math.random() * dimensions.height,
                            Math.random() * dimensions.height,
                        ],
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 5,
                    }}
                />
            ))}

            {/* Mesh gradient overlay */}
            <div
                className={`absolute inset-0 ${darkMode
                        ? "bg-gradient-to-br from-gray-900/50 via-transparent to-gray-900/50"
                        : "bg-gradient-to-br from-white/50 via-transparent to-white/50"
                    }`}
            />
        </div>
    );
};

export default AnimatedBackground;
