
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
          <div className="flex gap-6 mb-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy</a>
          </div>
          <div className="text-gray-400">
            © {new Date().getFullYear()} Collab Quest. All rights reserved.
          </div>
        </div>
    </footer>
  )
}
