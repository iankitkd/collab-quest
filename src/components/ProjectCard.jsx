import Link from "next/link";

export default function ProjectCard({ project }) {
    const {id, title, status, description, members} = project;
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {status}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          {description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex -space-x-2 overflow-hidden">
            {members.slice(0, 3).map((member, index) => (
              <div 
                key={index}
                className=" h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center text-xs text-gray-600"
              >
                {member.charAt(0).toUpperCase()}
              </div>
            ))}
            {project.members.length > 3 && (
              <div className=" h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                +{members.length - 3}
              </div>
            )}
          </div>
          <Link href={`/projects/${id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
              View Project →
          </Link>
        </div>
      </div>
    </div>
  );
}