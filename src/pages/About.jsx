import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AnimatedBackground from "../components/common/AnimatedBackground";

const About = () => {
    const team = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            image: "👩‍💼",
            bio: "15+ years in HR tech",
        },
        {
            name: "Michael Chen",
            role: "CTO",
            image: "👨‍💻",
            bio: "Former Google engineer",
        },
        {
            name: "Emily Rodriguez",
            role: "Head of Product",
            image: "👩‍🎨",
            bio: "Product design expert",
        },
        {
            name: "David Kim",
            role: "Head of Sales",
            image: "👨‍💼",
            bio: "B2B sales specialist",
        },
    ];

    const values = [
        {
            icon: "🎯",
            title: "Mission-Driven",
            description: "We're committed to connecting talent with opportunity",
        },
        {
            icon: "🤝",
            title: "Trust & Transparency",
            description: "Building relationships based on honesty and integrity",
        },
        {
            icon: "🚀",
            title: "Innovation",
            description: "Constantly improving our platform and services",
        },
        {
            icon: "🌍",
            title: "Diversity & Inclusion",
            description: "Creating opportunities for everyone, everywhere",
        },
    ];

    return (
        <div className="min-h-screen relative">
            <AnimatedBackground />
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            About Shebeka
                        </h1>
                        <p className="text-xl text-blue-100">
                            We're on a mission to connect talented professionals with their dream careers
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                    </div>
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-4">
                            Founded in 2024, Shebeka was born from a simple observation: the job search process
                            was broken. Job seekers spent countless hours applying to positions without feedback,
                            while employers struggled to find qualified candidates in a sea of applications.
                        </p>
                        <p className="mb-4">
                            We set out to change that. By leveraging modern technology and focusing on user
                            experience, we've created a platform that makes job searching efficient, transparent,
                            and even enjoyable.
                        </p>
                        <p>
                            Today, we're proud to serve thousands of job seekers and hundreds of companies,
                            facilitating meaningful connections that change lives and build businesses.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
                            <div className="text-gray-600">Active Job Seekers</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">1,200+</div>
                            <div className="text-gray-600">Partner Companies</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
                            <div className="text-gray-600">Jobs Posted Monthly</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                            <div className="text-gray-600">User Satisfaction</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-md transition-shadow"
                            >
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            The passionate people behind Shebeka
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-md transition-shadow"
                            >
                                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                                    {member.image}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                                <p className="text-sm text-gray-600">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of professionals who found their dream jobs through Shebeka
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/register"
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            to="/applicant/jobs"
                            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                        >
                            Browse Jobs
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
