// src/components/GroupRightSection.tsx
"use client";
import Image from "next/image";

export default function GroupRightSection({ groupId }: { groupId: string }) {
    // Dummy group data
    const group = {
        name: "AI Club",
        icon: "/madara.jpeg",
        description: "Official group for Artificial Intelligence enthusiasts at Sharda University. We explore ML, DL, and AI technologies through workshops and projects.",
        admin: "Dr. Ravi Sharma",
        members: 245,
        createdOn: "2022-09-01",
        posts: 89,
        rules: [
            "Be respectful to all members",
            "No spam or off-topic posts",
            "Keep discussions academic-focused"
        ]
    };

    return (
        <div className="p-4 space-y-6">
            <div className="text-center">
                <Image
                    src={group.icon}
                    alt="Group Icon"
                    width={308}
                    height={180}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500"
                />
                <h2 className="text-2xl font-bold mt-4">{group.name}</h2>
            </div>

            <div className="space-y-4">
                <p className="text-gray-700">{group.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="font-semibold">Admin</p>
                        <p>{group.admin}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <p className="font-semibold">Members</p>
                        <p>{group.members}</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="font-semibold">Created On</p>
                        <p>{new Date(group.createdOn).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="font-semibold">Total Posts</p>
                        <p>{group.posts}</p>
                    </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Group Rules</h3>
                    <ul className="list-disc list-inside space-y-1">
                        {group.rules.map((rule, index) => (
                            <li key={index} className="text-sm text-gray-700">{rule}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}