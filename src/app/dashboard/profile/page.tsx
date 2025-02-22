//src/app/dashboard/profile/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Building2,
  Calendar,
  Award,
  Bookmark,
  ChevronRight,
  GraduationCap,
  Clock,
  BarChart,
} from "lucide-react";
import SuperAdminNavbar from "@/components/Navbar";

export default function Profile() {
  const mockStudentProfile = {
    id: "1",
    systemId: "STU2024001",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    rollNo: "CS2024001",
    course: "Bachelor of Computer Science",
    semester: 6,
    college: "College of Engineering",
    department: "Computer Science and Engineering",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    academicYear: "2023-2024",
    cgpa: 3.8,
    attendance: 92,
    enrollmentDate: "2021-08-15",
    status: "Active",
    skills: [
      "JavaScript",
      "React",
      "Python",
      "Data Structures",
      "Machine Learning",
      "Database Management",
    ],
    achievements: [
      {
        title: "First Place - University Hackathon",
        date: "2024-02-15",
        description: "Led team to victory in annual coding competition",
      },
      {
        title: "Dean's List",
        date: "2023-12-20",
        description: "Achieved academic excellence for Fall 2023 semester",
      },
      {
        title: "Research Publication",
        date: "2023-10-05",
        description: "Co-authored paper on AI applications in education",
      },
    ],
  };

  const {
    name,
    avatar,
    email,
    phone,
    rollNo,
    systemId,
    course,
    semester,
    college,
    department,
    academicYear,
    cgpa,
    attendance,
    enrollmentDate,
    status,
    skills,
    achievements,
  } = mockStudentProfile;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <SuperAdminNavbar />
      <div className="max-w-6xl mx-auto pt-20">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Image
                src={avatar}
                alt={name}
                width={160}
                height={160}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-100"
              />
              <span
                className={`absolute bottom-2 right-2 w-4 h-4 rounded-full ${
                  status === "Active" ? "bg-green-400" : "bg-gray-400"
                } border-2 border-white`}
              ></span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {name}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center justify-center md:justify-start text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{phone}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span>Roll No: {rollNo}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start text-gray-600">
                  <Bookmark className="w-4 h-4 mr-2" />
                  <span>System ID: {systemId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Academic Information */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                Academic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>Course: {course}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Semester: {semester}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Building2 className="w-4 h-4 mr-2" />
                  <span>College: {college}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>Department: {department}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Academic Year: {academicYear}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>
                    Enrolled: {new Date(enrollmentDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <BarChart className="w-5 h-5 mr-2 text-blue-600" />
                Performance Metrics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">CGPA</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {cgpa.toFixed(2)}
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-600 rounded-full h-2"
                      style={{ width: `${(cgpa / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Attendance</div>
                  <div className="text-2xl font-bold text-green-600">
                    {attendance}%
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-600 rounded-full h-2"
                      style={{ width: `${attendance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills and Achievements */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                Achievements
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
