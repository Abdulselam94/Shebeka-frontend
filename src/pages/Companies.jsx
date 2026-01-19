import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Companies = () => {
    const companies = [
        {
            id: 1,
            name: "TechCorp",
            logo: "💻",
            industry: "Technology",
            location: "San Francisco, CA",
            employees: "500-1000",
            openJobs: 12,
            description: "Leading technology company specializing in cloud solutions",
        },
        {
            id: 2,
            name: "Innovate Inc",
            logo: "📊",
            industry: "Consulting",
            location: "New York, NY",
            employees: "1000-5000",
            openJobs: 8,
            description: "Global consulting firm helping businesses transform",
        },
        {
            id: 3,
            name: "Creative Labs",
            logo: "🎨",
            industry: "Design",
            location: "Remote",
            employees: "50-200",
            openJobs: 5,
            description: "Award-winning design studio creating digital experiences",
        },
        {
            id: 4,
            name: "DataPro",
            logo: "📈",
            industry: "Analytics",
            location: "Austin, TX",
            employees: "200-500",
            openJobs: 15,
            description: "Data analytics platform powering business decisions",
        },
        {
            id: 5,
            name: "HealthTech Solutions",
            logo: "⚕️",
            industry: "Healthcare",
            location: "Boston, MA",
            employees: "1000-5000",
            openJobs: 20,
            description: "Revolutionizing healthcare through technology",
        },
        {
            id: 6,
            name: "EduLearn",
            logo: "📚",
            industry: "Education",
            location: "Remote",
            employees: "100-500",
            openJobs: 7,
            description: "Online learning platform for professional development",
        },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Discover Top Companies
                        </h1>
                        <p className="text-xl text-blue-100 mb-8">
                            Explore companies hiring on Shebeka and find your perfect match
                        </p>
                        <div className="flex justify-center">
                            <input
                                type="text"
                                placeholder="Search companies..."
                                className="w-full max-w-md px-4 py-3 rounded-l-lg text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none"
                            />
                            <button className="px-6 py-3 bg-blue-700 hover:bg-blue-800 rounded-r-lg font-semibold">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-gray-50 dark:bg-gray-800 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-2">1,200+</div>
                            <div className="text-gray-600">Companies</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
                            <div className="text-gray-600">Open Positions</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                            <div className="text-gray-600">Industries</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                            <div className="text-gray-600">Satisfaction Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Companies Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Companies</h2>
                        <p className="text-gray-600">Companies actively hiring on our platform</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {companies.map((company) => (
                            <div
                                key={company.id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-3xl mr-4">
                                            {company.logo}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {company.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">{company.industry}</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-4 line-clamp-2">
                                    {company.description}
                                </p>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {company.location}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        {company.employees} employees
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t">
                                    <span className="text-sm font-medium text-blue-600">
                                        {company.openJobs} open positions
                                    </span>
                                    <Link
                                        to={`/applicant/jobs?company=${company.name}`}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                                    >
                                        View Jobs
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Is Your Company Hiring?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join hundreds of companies finding top talent on Shebeka
                    </p>
                    <Link
                        to="/register"
                        className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Post a Job
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Companies;
