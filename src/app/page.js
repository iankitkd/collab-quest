
import Link from 'next/link';
import { Footer, Header } from '@/components';
import { features } from '@/data/features';

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center px-6 py-12 md:py-24 max-w-6xl mx-auto">
          <div className="md:w-1/2 md:pr-12 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Collaborate on Projects That Matter
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with students across disciplines to bring your ideas to life. 
              Our platform matches you with perfect teammates based on skills, 
              interests, and availability.
            </p>
            <div className="flex gap-4">
              <Link href={"/login"} className="px-6 py-3 rounded-md font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                Find Projects
              </Link>
              <Link href={"/signup"} className="px-6 py-3 rounded-md font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="/collaboration.svg" 
              alt="Students collaborating" 
              className="w-full max-w-md" 
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Use CollabHub?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */} 
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}