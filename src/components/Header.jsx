"use client"
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Header() {
    const router = useRouter();
    const { currentUser, logout, loading } = useAuth();

    const handleLogout = async () => {
      try {
        await logout();
        router.push('/');
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <div className="text-2xl font-bold text-indigo-600">Collab Quest</div>
        { currentUser && (
          <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, {currentUser?.email}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>
        )}

    </header>
  )
}
