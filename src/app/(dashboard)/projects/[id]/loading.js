export default function Loading() {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 h-16"></div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 h-24 animate-pulse bg-gray-200"></div>
            
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div className="h-40 animate-pulse bg-gray-200 rounded"></div>
                  <div className="h-20 animate-pulse bg-gray-200 rounded"></div>
                </div>
                
                <div className="space-y-6">
                  <div className="h-40 animate-pulse bg-gray-200 rounded"></div>
                  <div className="h-32 animate-pulse bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }