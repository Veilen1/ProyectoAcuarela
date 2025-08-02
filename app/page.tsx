import { Suspense } from "react"
import { ArtistHero } from "@/components/artist-hero"
import { FeaturedPaintings } from "@/components/featured-paintings"
import { WatercolorGallery } from "@/components/watercolor-gallery"
import { GalleryStats } from "@/components/gallery-stats"
import { GalleryLoading } from "@/components/gallery-loading"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="relative">
        {/* Watercolor background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10">
          <Suspense fallback={<div className="animate-pulse bg-white/30 h-96 mx-4 rounded-3xl"></div>}>
            <ArtistHero />
          </Suspense>

          <Suspense fallback={<div className="animate-pulse bg-white/30 h-32 mx-4 rounded-2xl mb-8"></div>}>
            <GalleryStats />
          </Suspense>

          <Suspense fallback={<GalleryLoading />}>
            <FeaturedPaintings />
          </Suspense>

          <Suspense fallback={<GalleryLoading />}>
            <WatercolorGallery />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
