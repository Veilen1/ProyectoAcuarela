export function GalleryLoading() {
  return (
    <section className="px-4 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg animate-pulse">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6"></div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-6 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg w-32"></div>
                    <div className="h-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded w-24"></div>
                  </div>
                  <div className="w-9 h-9 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded w-full"></div>
                  <div className="h-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded w-3/4"></div>
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="w-4 h-4 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
