"use client"

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
// import { getUserProjects, createProject } from '../lib/firestore';
import ProjectCard from '@/components/ProjectCard';
import NewProjectModal from '@/components/NewProjectModal';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Header } from '@/components';

const dummyProjects = [
    {
      id: '1',
      title: 'Campus Event Planner',
      description: 'A platform for students to organize and manage campus events with RSVP functionality and notifications.',
      status: 'active',
      owner: 'user1',
      members: ['user1', 'user2', 'user3'],
      requiredSkills: ['React', 'Node.js', 'UI Design'],
      createdAt: new Date('2023-05-15'),
      updatedAt: new Date('2023-06-20')
    },
    {
      id: '2',
      title: 'Study Group Finder',
      description: 'Match students with similar courses and schedules to form study groups.',
      status: 'active',
      owner: 'user2',
      members: ['user2', 'user4', 'user5'],
      requiredSkills: ['JavaScript', 'Firebase', 'CSS'],
      createdAt: new Date('2023-06-10'),
      updatedAt: new Date('2023-07-05')
    },
    {
      id: '3',
      title: 'Textbook Exchange',
      description: 'Peer-to-peer marketplace for buying and selling used textbooks.',
      status: 'paused',
      owner: 'user1',
      members: ['user1', 'user3', 'user6'],
      requiredSkills: ['React', 'Express', 'MongoDB'],
      createdAt: new Date('2023-04-22'),
      updatedAt: new Date('2023-05-30')
    },
    {
      id: '4',
      title: 'Campus Navigation App',
      description: 'Interactive map with building locations and indoor navigation for new students.',
      status: 'active',
      owner: 'user3',
      members: ['user3', 'user7', 'user8', 'user9'],
      requiredSkills: ['React Native', 'GIS', 'UI/UX'],
      createdAt: new Date('2023-07-01'),
      updatedAt: new Date('2023-07-15')
    },
    {
      id: '5',
      title: 'Lecture Note Sharing',
      description: 'Platform for students to share and rate lecture notes by course and professor.',
      status: 'planning',
      owner: 'user4',
      members: ['user4', 'user10'],
      requiredSkills: ['Next.js', 'Firebase', 'Markdown'],
      createdAt: new Date('2023-08-05'),
      updatedAt: new Date('2023-08-05')
    }
  ];

export default function Dashboard() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const fetchProjects = async () => {
        try {
        //   const userProjects = await getUserProjects(currentUser.uid);
        //   setProjects(userProjects);
        setProjects(dummyProjects);
        } catch (error) {
          console.error("Error fetching projects:", error);
        } finally {
          setIsLoadingProjects(false);
        }
      };
      
      fetchProjects();
    }
  }, [currentUser]);

  const handleCreateProject = async (projectData) => {
    try {
      setIsLoadingProjects(true);
    //   await createProject({
    //     ...projectData,
    //     owner: currentUser.uid,
    //     members: [currentUser.uid],
    //   });
    //   // Refresh projects
    //   const updatedProjects = await getUserProjects(currentUser.uid);
    //   setProjects(updatedProjects);
    //   setShowNewProjectModal(false);
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setIsLoadingProjects(false);
    }
  };


  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900">Your Projects</h2>
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              New Project
            </button>
          </div>

          {/* Projects Grid */}
          {isLoadingProjects ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="mt-2 text-lg font-medium text-gray-900">No projects</h3>
              <p className="mt-1 text-gray-500">
                Get started by creating a new project.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  New Project
                </button>
              </div>
            </div>
          )}
        </main>

        {/* New Project Modal */}
        <NewProjectModal
          isOpen={showNewProjectModal}
          onClose={() => setShowNewProjectModal(false)}
          onCreate={handleCreateProject}
        />
      </div>
    </ProtectedRoute>
  );
}