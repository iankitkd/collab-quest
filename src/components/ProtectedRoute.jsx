"use client"

import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/');
    }
  }, [currentUser, loading, router]);

  if (loading || !currentUser) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return children;
}