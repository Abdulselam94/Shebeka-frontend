import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const NetworkBackground = ({
    nodeCount = 50,
    connectionDistance = 150,
    nodeColor = "rgba(59, 130, 246, 0.5)", // blue-500 with opacity
    lineColor = "rgba(59, 130, 246, 0.2)",
    nodeSize = 3,
    speed = 0.5
}) => {
    const canvasRef = useRef(null);
    const nodesRef = useRef([]);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Initialize nodes
        class Node {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * speed;
                this.vy = (Math.random() - 0.5) * speed;
                this.radius = nodeSize;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Keep within bounds
                this.x = Math.max(0, Math.min(canvas.width, this.x));
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = nodeColor;
                ctx.fill();
            }
        }

        // Create nodes
        nodesRef.current = Array.from({ length: nodeCount }, () => new Node());

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            nodesRef.current.forEach((node) => {
                node.update();
                node.draw();
            });

            // Draw connections
            for (let i = 0; i < nodesRef.current.length; i++) {
                for (let j = i + 1; j < nodesRef.current.length; j++) {
                    const nodeA = nodesRef.current[i];
                    const nodeB = nodesRef.current[j];

                    const dx = nodeA.x - nodeB.x;
                    const dy = nodeA.y - nodeB.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = 1 - distance / connectionDistance;
                        ctx.beginPath();
                        ctx.moveTo(nodeA.x, nodeA.y);
                        ctx.lineTo(nodeB.x, nodeB.y);
                        ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/g, `${opacity * 0.2})`);
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [nodeCount, connectionDistance, nodeColor, lineColor, nodeSize, speed]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 -z-10 overflow-hidden"
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{
                    background: "transparent"
                }}
            />
        </motion.div>
    );
};

export default NetworkBackground;
