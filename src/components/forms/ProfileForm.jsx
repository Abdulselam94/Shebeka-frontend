// // src/components/ProfileForm.jsx
// import { useState } from "react";
// import { addSkill, removeSkill, uploadResume } from "../../api/profile";

// const ProfileForm = ({ userData, onSubmit, loading = false }) => {
//   const [formData, setFormData] = useState(() => ({
//     fullName: "",
//     email: "",
//     phone: "",
//     location: "",
//     bio: "",
//     skills: [],
//     experience: [],
//     education: [],
//     resumeUrl: null,
//     resumeName: null,
//     ...userData,
//   }));

//   const [newSkill, setNewSkill] = useState("");
//   const [newExperience, setNewExperience] = useState({
//     company: "",
//     position: "",
//     startDate: "",
//     endDate: "",
//     current: false,
//     description: "",
//   });
//   const [newEducation, setNewEducation] = useState({
//     institution: "",
//     degree: "",
//     field: "",
//     startDate: "",
//     endDate: "",
//     current: false,
//   });
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [formErrors, setFormErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     // Clear error when user starts typing
//     if (formErrors[name]) {
//       setFormErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const validateForm = () => {
//     const errors = {};

//     if (!formData.fullName.trim()) {
//       errors.fullName = "Full name is required";
//     }

//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Email is invalid";
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Skills management using API
//   const handleAddSkill = async () => {
//     if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
//       try {
//         await addSkill(newSkill.trim());
//         setFormData((prev) => ({
//           ...prev,
//           skills: [...prev.skills, newSkill.trim()],
//         }));
//         setNewSkill("");
//         console.log("✅ Skill added:", newSkill.trim());
//       } catch (error) {
//         console.error("Error adding skill:", error);
//         alert("Failed to add skill. Please try again.");
//       }
//     }
//   };

//   const handleRemoveSkill = async (skillToRemove) => {
//     try {
//       await removeSkill(skillToRemove);
//       setFormData((prev) => ({
//         ...prev,
//         skills: prev.skills.filter((skill) => skill !== skillToRemove),
//       }));
//       console.log("✅ Skill removed:", skillToRemove);
//     } catch (error) {
//       console.error("Error removing skill:", error);
//       alert("Failed to remove skill. Please try again.");
//     }
//   };

//   const handleAddExperience = () => {
//     if (newExperience.company && newExperience.position) {
//       setFormData((prev) => ({
//         ...prev,
//         experience: [...prev.experience, { ...newExperience, id: Date.now() }],
//       }));
//       setNewExperience({
//         company: "",
//         position: "",
//         startDate: "",
//         endDate: "",
//         current: false,
//         description: "",
//       });
//     }
//   };

//   const handleRemoveExperience = (id) => {
//     setFormData((prev) => ({
//       ...prev,
//       experience: prev.experience.filter((exp) => exp.id !== id),
//     }));
//   };

//   const handleAddEducation = () => {
//     if (newEducation.institution && newEducation.degree) {
//       setFormData((prev) => ({
//         ...prev,
//         education: [...prev.education, { ...newEducation, id: Date.now() }],
//       }));
//       setNewEducation({
//         institution: "",
//         degree: "",
//         field: "",
//         startDate: "",
//         endDate: "",
//         current: false,
//       });
//     }
//   };

//   const handleRemoveEducation = (id) => {
//     setFormData((prev) => ({
//       ...prev,
//       education: prev.education.filter((edu) => edu.id !== id),
//     }));
//   };

//   // File upload using API
//   // const handleFileUpload = async (file) => {
//   //   setUploading(true);
//   //   setUploadProgress(0);

//   //   try {
//   //     // Simulate progress (you can remove this in production)
//   //     const progressInterval = setInterval(() => {
//   //       setUploadProgress((prev) => {
//   //         if (prev >= 90) {
//   //           clearInterval(progressInterval);
//   //           return prev;
//   //         }
//   //         return prev + 10;
//   //       });
//   //     }, 200);

//   //     const result = await uploadResume(file);

//   //     clearInterval(progressInterval);
//   //     setUploadProgress(100);

//   //     setFormData((prev) => ({
//   //       ...prev,
//   //       resumeUrl: result.resumeUrl || result.url || result.fileUrl,
//   //       resumeName: result.resumeName || result.fileName || file.name,
//   //     }));

//   //     console.log("✅ Resume uploaded successfully!", result);
//   //   } catch (error) {
//   //     console.error("❌ Upload failed:", error);
//   //     alert("File upload failed. Please try again.");
//   //   } finally {
//   //     setUploading(false);
//   //     setTimeout(() => setUploadProgress(0), 1000);
//   //   }
//   // };

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     try {
//       // 1. Upload to Cloudinary (or another storage)
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", "your_unsigned_preset");

//       const cloudRes = await fetch(
//         "https://api.cloudinary.com/v1_1/<your-cloud-name>/auto/upload",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const cloudData = await cloudRes.json();
//       const resumeUrl = cloudData.secure_url; // get uploaded file URL

//       // 2. Send URL to backend
//       const res = await fetch("http://localhost:5000/api/users/resume", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // your auth token
//         },
//         body: JSON.stringify({ resumeUrl }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Upload failed");

//       alert("Resume uploaded successfully!");
//     } catch (error) {
//       console.error("Resume Upload Error:", error);
//       alert(error.message);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       alert("Please fix the form errors before submitting.");
//       return;
//     }

//     console.log("📝 Form submitted, calling parent onSubmit...");
//     onSubmit(formData);
//   };

//   // The rest of your JSX remains exactly the same...
//   // [Include all the JSX from your original ProfileForm component here]
//   // The form structure doesn't change, only the API calls are updated

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8">
//       {/* Personal Information Section - Same as before */}
//       <div className="bg-white rounded-lg shadow-sm border p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">
//           Personal Information
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Full Name *
//             </label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               required
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 formErrors.fullName ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your full name"
//             />
//             {formErrors.fullName && (
//               <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
//             )}
//           </div>

//           {/* Keep all your existing JSX form structure exactly as is */}
//           {/* ... rest of your form JSX ... */}
//         </div>
//       </div>

//       {/* Skills Section */}
//       <div className="bg-white rounded-lg shadow-sm border p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
//         <div className="mb-4">
//           <div className="flex gap-2">
//             <input
//               type="text"
//               value={newSkill}
//               onChange={(e) => setNewSkill(e.target.value)}
//               onKeyPress={(e) =>
//                 e.key === "Enter" && (e.preventDefault(), handleAddSkill())
//               }
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Add a skill (e.g., JavaScript, React, Project Management)"
//             />
//             <button
//               type="button"
//               onClick={handleAddSkill}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Add
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           {formData.skills.map((skill, index) => (
//             <div
//               key={index}
//               className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
//             >
//               {skill}
//               <button
//                 type="button"
//                 onClick={() => handleRemoveSkill(skill)}
//                 className="ml-2 text-blue-600 hover:text-blue-800"
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Resume Upload Section */}
//       <div className="bg-white rounded-lg shadow-sm border p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume</h3>

//         {formData.resumeUrl ? (
//           <div className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-lg">
//             <div className="flex items-center">
//               <svg
//                 className="w-8 h-8 text-green-600 mr-3"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//               <div>
//                 <p className="font-medium text-green-800">
//                   {formData.resumeName || "Resume"}
//                 </p>
//                 <p className="text-sm text-green-600">Uploaded successfully</p>
//               </div>
//             </div>
//             <button
//               type="button"
//               onClick={() =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   resumeUrl: null,
//                   resumeName: null,
//                 }))
//               }
//               className="text-red-600 hover:text-red-800 text-sm font-medium"
//             >
//               Remove
//             </button>
//           </div>
//         ) : (
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//             <svg
//               className="w-12 h-12 text-gray-400 mx-auto mb-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//               />
//             </svg>

//             {uploading ? (
//               <div className="space-y-3">
//                 <p className="text-sm text-gray-600">Uploading resume...</p>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-blue-600 h-2 rounded-full transition-all"
//                     style={{ width: `${uploadProgress}%` }}
//                   ></div>
//                 </div>
//                 <p className="text-xs text-gray-500">{uploadProgress}%</p>
//               </div>
//             ) : (
//               <>
//                 <p className="text-sm text-gray-600 mb-2">
//                   Upload your resume (PDF, DOC, DOCX) - Max 5MB
//                 </p>
//                 <input
//                   type="file"
//                   accept=".pdf,.doc,.docx"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                       if (file.size > 5 * 1024 * 1024) {
//                         alert("File size must be less than 5MB");
//                         return;
//                       }
//                       // handleFileUpload(file);
//                       onChange = { handleFileUpload };
//                     }
//                   }}
//                   className="hidden"
//                   id="resume-upload"
//                 />
//                 <label
//                   htmlFor="resume-upload"
//                   className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
//                 >
//                   Choose File
//                 </label>
//                 <p className="text-xs text-gray-500 mt-2">
//                   This is required to apply for jobs
//                 </p>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Experience Section - Same as before */}
//       <div className="bg-white rounded-lg shadow-sm border p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">
//           Work Experience
//         </h3>

//         {/* Add Experience Form */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Company *
//             </label>
//             <input
//               type="text"
//               value={newExperience.company}
//               onChange={(e) =>
//                 setNewExperience((prev) => ({
//                   ...prev,
//                   company: e.target.value,
//                 }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Company name"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Position *
//             </label>
//             <input
//               type="text"
//               value={newExperience.position}
//               onChange={(e) =>
//                 setNewExperience((prev) => ({
//                   ...prev,
//                   position: e.target.value,
//                 }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Job title"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Start Date
//             </label>
//             <input
//               type="month"
//               value={newExperience.startDate}
//               onChange={(e) =>
//                 setNewExperience((prev) => ({
//                   ...prev,
//                   startDate: e.target.value,
//                 }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               End Date
//             </label>
//             <input
//               type="month"
//               value={newExperience.endDate}
//               onChange={(e) =>
//                 setNewExperience((prev) => ({
//                   ...prev,
//                   endDate: e.target.value,
//                 }))
//               }
//               disabled={newExperience.current}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={newExperience.current}
//                 onChange={(e) =>
//                   setNewExperience((prev) => ({
//                     ...prev,
//                     current: e.target.checked,
//                     endDate: "",
//                   }))
//                 }
//                 className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//               />
//               <span className="ml-2 text-sm text-gray-700">
//                 I currently work here
//               </span>
//             </label>
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               value={newExperience.description}
//               onChange={(e) =>
//                 setNewExperience((prev) => ({
//                   ...prev,
//                   description: e.target.value,
//                 }))
//               }
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Describe your responsibilities and achievements..."
//             />
//           </div>
//           <div className="md:col-span-2">
//             <button
//               type="button"
//               onClick={handleAddExperience}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Add Experience
//             </button>
//           </div>
//         </div>

//         {/* Experience List */}
//         <div className="space-y-4">
//           {formData.experience.map((exp) => (
//             <div
//               key={exp.id}
//               className="flex justify-between items-start p-4 border rounded-lg"
//             >
//               <div>
//                 <h4 className="font-semibold text-gray-900">{exp.position}</h4>
//                 <p className="text-gray-600">{exp.company}</p>
//                 <p className="text-sm text-gray-500">
//                   {exp.startDate} - {exp.current ? "Present" : exp.endDate}
//                 </p>
//                 {exp.description && (
//                   <p className="text-gray-700 mt-2">{exp.description}</p>
//                 )}
//               </div>
//               <button
//                 type="button"
//                 onClick={() => handleRemoveExperience(exp.id)}
//                 className="text-red-600 hover:text-red-800"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Education Section - Same as before */}
//       <div className="bg-white rounded-lg shadow-sm border p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>

//         {/* Add Education Form */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Institution *
//             </label>
//             <input
//               type="text"
//               value={newEducation.institution}
//               onChange={(e) =>
//                 setNewEducation((prev) => ({
//                   ...prev,
//                   institution: e.target.value,
//                 }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="University or school"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Degree *
//             </label>
//             <input
//               type="text"
//               value={newEducation.degree}
//               onChange={(e) =>
//                 setNewEducation((prev) => ({ ...prev, degree: e.target.value }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Bachelor's, Master's, etc."
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Field of Study
//             </label>
//             <input
//               type="text"
//               value={newEducation.field}
//               onChange={(e) =>
//                 setNewEducation((prev) => ({ ...prev, field: e.target.value }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Computer Science, Business, etc."
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Start Date
//             </label>
//             <input
//               type="month"
//               value={newEducation.startDate}
//               onChange={(e) =>
//                 setNewEducation((prev) => ({
//                   ...prev,
//                   startDate: e.target.value,
//                 }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               End Date
//             </label>
//             <input
//               type="month"
//               value={newEducation.endDate}
//               onChange={(e) =>
//                 setNewEducation((prev) => ({
//                   ...prev,
//                   endDate: e.target.value,
//                 }))
//               }
//               disabled={newEducation.current}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={newEducation.current}
//                 onChange={(e) =>
//                   setNewEducation((prev) => ({
//                     ...prev,
//                     current: e.target.checked,
//                     endDate: "",
//                   }))
//                 }
//                 className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//               />
//               <span className="ml-2 text-sm text-gray-700">
//                 Currently studying here
//               </span>
//             </label>
//           </div>
//           <div className="md:col-span-2">
//             <button
//               type="button"
//               onClick={handleAddEducation}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Add Education
//             </button>
//           </div>
//         </div>

//         {/* Education List */}
//         <div className="space-y-4">
//           {formData.education.map((edu) => (
//             <div
//               key={edu.id}
//               className="flex justify-between items-start p-4 border rounded-lg"
//             >
//               <div>
//                 <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
//                 <p className="text-gray-600">{edu.institution}</p>
//                 <p className="text-sm text-gray-500">
//                   {edu.field} • {edu.startDate} -{" "}
//                   {edu.current ? "Present" : edu.endDate}
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => handleRemoveEducation(edu.id)}
//                 className="text-red-600 hover:text-red-800"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-semibold"
//         >
//           {loading ? "Saving..." : "Save Profile"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default ProfileForm;

// src/components/ProfileForm.jsx
import { useState } from "react";
import { addSkill, removeSkill } from "../../api/profile";

const ProfileForm = ({ userData, onSubmit, loading = false, token }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    skills: [],
    experience: [],
    education: [],
    resumeUrl: null,
    resumeName: null,
    ...userData,
  });

  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    current: false,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Skills
  const handleAddSkill = async () => {
    if (!newSkill.trim() || formData.skills.includes(newSkill.trim())) return;

    try {
      await addSkill(newSkill.trim());
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    } catch (error) {
      console.error("Error adding skill:", error);
      alert("Failed to add skill. Please try again.");
    }
  };

  const handleRemoveSkill = async (skill) => {
    try {
      await removeSkill(skill);
      setFormData((prev) => ({
        ...prev,
        skills: prev.skills.filter((s) => s !== skill),
      }));
    } catch (error) {
      console.error("Error removing skill:", error);
      alert("Failed to remove skill. Please try again.");
    }
  };

  // Experience
  const handleAddExperience = () => {
    if (!newExperience.company || !newExperience.position) return;

    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...newExperience, id: Date.now() }],
    }));

    setNewExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
  };

  const handleRemoveExperience = (id) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // Education
  const handleAddEducation = () => {
    if (!newEducation.institution || !newEducation.degree) return;

    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { ...newEducation, id: Date.now() }],
    }));

    setNewEducation({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
    });
  };

  const handleRemoveEducation = (id) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Resume Upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("http://localhost:5000/api/users/resume", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Pass token as prop
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      // Save response info to formData
      setFormData((prev) => ({
        ...prev,
        resumeUrl: data.resumeUrl || null, // backend can send filename or path
        resumeName: file.name,
      }));

      setUploadProgress(100);
      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error("Resume Upload Error:", error);
      alert(error.message);
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return alert("Please fix the errors first.");
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                formErrors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your full name"
              required
            />
            {formErrors.fullName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
              required
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Add phone, location, bio fields here */}
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAddSkill())
            }
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add a skill"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill) => (
            <div
              key={skill}
              className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume</h3>

        {formData.resumeUrl ? (
          <div className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <p className="font-medium text-green-800">
                {formData.resumeName}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  resumeUrl: null,
                  resumeName: null,
                }))
              }
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {uploading ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Uploading resume...</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{uploadProgress}%</p>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  id="resume-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="resume-upload"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  Choose File
                </label>
                <p className="text-xs text-gray-500 mt-2">Max 5MB</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Experience & Education sections remain unchanged (same pattern as Skills) */}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-semibold"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
