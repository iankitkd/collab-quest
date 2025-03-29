"use client"
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { db } from '@/config/firebase';
import { useParams } from 'next/navigation';

export default function ProjectDetails() {
    const params = useParams();
    const { id } = params;

    const [project, setProject] = useState({
        title: 'AI-Powered Study Buddy',
        description: 'An AI-driven study assistant to help students organize their notes and schedules efficiently.',
        category: 'Education Tech',
        type: 'Public',
        teamSize: 5,
        requiredSkills: 'AI, Machine Learning, React, Firebase',
        roles: 'Frontend Developer, Backend Developer, Data Scientist',
        startDate: '2024-06-01',
        endDate: '2024-12-01',
        milestones: 'Prototype Development, Beta Testing, Final Deployment',
        communication: 'Slack, Email',
        fileLinks: 'Google Drive, GitHub',
        visibility: 'Public',
        feedback: true,
        members: ['alice@example.com', 'bob@example.com', 'charlie@example.com']
    });
    const [loading, setLoading] = useState(false);
    const [newMember, setNewMember] = useState('');

    useEffect(() => {
        if (id) {
            const fetchProject = async () => {
                try {
                    const docRef = doc(db, 'projects', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setProject(docSnap.data());
                    } else {
                        console.error('Project not found');
                    }
                } catch (error) {
                    console.error('Error fetching project:', error);
                }
                setLoading(false);
            };
            fetchProject();
        }
    }, [id]);

    const addMember = async () => {
        if (!newMember) return;
        try {
            const docRef = doc(db, 'projects', projectId);
            await updateDoc(docRef, {
                members: arrayUnion(newMember)
            });
            setNewMember('');
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10 border border-gray-200">
            <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-6">{project.title}</h2>
            <p className="text-gray-600 text-lg mb-6 text-center">{project.description}</p>
            
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <p><strong>Category:</strong> {project.category}</p>
                    <p><strong>Type:</strong> {project.type}</p>
                    <p><strong>Team Size:</strong> {project.teamSize}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <p><strong>Start Date:</strong> {project.startDate}</p>
                    <p><strong>End Date:</strong> {project.endDate}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <p><strong>Required Skills:</strong> {project.requiredSkills}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <p><strong>Roles:</strong> {project.roles}</p>
                </div>
            </div>
            
            <div className="mt-8 bg-blue-100 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold">Milestones</h3>
                <p className="text-gray-700">{project.milestones}</p>
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-semibold">Team Members</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                    {project.members.map((member, index) => (
                        <span key={index} className="bg-gray-500 text-white px-4 py-2 rounded-full text-sm">{member}</span>
                    ))}
                </div>
            </div>

            <div className="mt-8 bg-gray-100 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold">Add Member</h3>
                <div className="flex gap-2 mt-3">
                    <input type="text" value={newMember} onChange={(e) => setNewMember(e.target.value)} placeholder="Enter member email" className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                    <button onClick={addMember} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">Add</button>
                </div>
            </div>
        </div>
    );
}
