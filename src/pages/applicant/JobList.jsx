import { useState } from "react";
import JobCard from "../../components/JobCard";

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    type: "",
    salary: "",
  });

  // Mock data - replace with actual API call
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "Remote",
      type: "Full-time",
      category: "Engineering",
      salary: "$80,000 - $120,000",
      description:
        "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces and implementing design systems.",
      postedDate: "2 days ago",
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Design Co",
      location: "New York, NY",
      type: "Full-time",
      category: "Design",
      salary: "$70,000 - $100,000",
      description:
        "Join our design team to create beautiful and intuitive user experiences for our products and services.",
      postedDate: "1 week ago",
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Startup Inc",
      location: "San Francisco, CA",
      type: "Full-time",
      category: "Product",
      salary: "$90,000 - $130,000",
      description:
        "We need a Product Manager to drive product strategy and work with cross-functional teams to deliver amazing products.",
      postedDate: "3 days ago",
    },
    {
      id: 4,
      title: "Backend Engineer",
      company: "Data Systems",
      location: "Remote",
      type: "Contract",
      category: "Engineering",
      salary: "$85,000 - $125,000",
      description:
        "Looking for a Backend Engineer to build scalable APIs and work with our database systems.",
      postedDate: "5 days ago",
    },
    {
      id: 5,
      title: "Marketing Specialist",
      company: "Growth Marketing",
      location: "Chicago, IL",
      type: "Part-time",
      category: "Marketing",
      salary: "$50,000 - $70,000",
      description:
        "Join our marketing team to help grow our brand and reach new customers through various channels.",
      postedDate: "1 day ago",
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Boston, MA",
      type: "Full-time",
      category: "Data Science",
      salary: "$95,000 - $140,000",
      description:
        "Seeking a Data Scientist to analyze complex data sets and build machine learning models.",
      postedDate: "4 days ago",
    },
  ];

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !filters.category || job.category === filters.category;
    const matchesLocation =
      !filters.location || job.location === filters.location;
    const matchesType = !filters.type || job.type === filters.type;

    return matchesSearch && matchesCategory && matchesLocation && matchesType;
  });

  const categories = [...new Set(jobs.map((job) => job.category))];
  const locations = [...new Set(jobs.map((job) => job.location))];
  const types = [...new Set(jobs.map((job) => job.type))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600">
            Discover {jobs.length} opportunities waiting for you
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Filters
              </h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Job title, company, or keyword"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Types</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilters({
                    category: "",
                    location: "",
                    type: "",
                    salary: "",
                  });
                }}
                className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredJobs.length} of {jobs.length} jobs
              </p>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Most Recent</option>
                <option>Most Relevant</option>
                <option>Highest Salary</option>
              </select>
            </div>

            <div className="grid gap-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilters({
                        category: "",
                        location: "",
                        type: "",
                        salary: "",
                      });
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;
