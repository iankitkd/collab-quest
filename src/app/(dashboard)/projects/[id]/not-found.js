import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
      <p className="text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
      <Link
        href="/dashboard"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}