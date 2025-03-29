"use client"
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

export default function CreateProject() {
    const [project, setProject] = useState({
        title: '',
        description: '',
        category: '',
        type: 'Public',
        teamSize: 1,
        requiredSkills: '',
        roles: '',
        startDate: '',
        endDate: '',
        milestones: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProject({ ...project, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, 'projects'), project);
            setProject({
                title: '', description: '', category: '', type: 'Public',
                teamSize: 1, requiredSkills: '', roles: '', startDate: '',
                endDate: '', milestones: '',
            });
        } catch (error) {
            console.error('Error creating project:', error);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create a New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" value={project.title} onChange={handleChange} placeholder="Project Title" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                <textarea name="description" value={project.description} onChange={handleChange} placeholder="Project Description" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                <input type="text" name="category" value={project.category} onChange={handleChange} placeholder="Category" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                <select name="type" value={project.type} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                    <option value="Invite-Only">Invite-Only</option>
                </select>
                <input type="number" name="teamSize" value={project.teamSize} onChange={handleChange} placeholder="Team Size" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                <input type="text" name="requiredSkills" value={project.requiredSkills} onChange={handleChange} placeholder="Required Skills (comma-separated)" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                <input type="text" name="roles" value={project.roles} onChange={handleChange} placeholder="Roles (comma-separated)" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                <span className='text-xs'>Start Date</span> 
                <input type="date" name="startDate" value={project.startDate} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                <span className='text-xs'>End Date</span> 
                <input type="date" name="endDate" value={project.endDate} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                <textarea name="milestones" value={project.milestones} onChange={handleChange} placeholder="Key Milestones" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
   
                <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300" disabled={loading}>{loading ? 'Creating...' : 'Create Project'}</button>
            </form>
        </div>
    );
}
