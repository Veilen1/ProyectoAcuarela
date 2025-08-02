import { getFeaturedPaintings } from "@/lib/database"
import { PaintingCard } from "@/components/painting-card"
import { Star } from "lucide-react"

export async function FeaturedPaintings() {
  const featuredPaintings = await getFeaturedPaintings()

  if (featuredPaintings.length === 0) {
    return (
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <h2 className="text-4xl font-light text-gray-800">Obras Destacadas</h2>
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
            </div>
            <p className="text-gray-600 font-light">No hay obras destacadas disponibles en este momento</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <h2 className="text-4xl font-light text-gray-800">Obras Destacadas</h2>
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
          </div>
          <p className="text-gray-600 font-light">Una selección especial de mis trabajos más representativos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPaintings.map((painting) => (
            <PaintingCard key={painting.id} painting={painting} showFeaturedBadge />
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-8 text-center">
          <div className="bg-yellow-50/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-yellow-100/50 inline-block">
            <p className="text-yellow-800 text-sm">⭐ Mostrando {featuredPaintings.length} obras destacadas</p>
          </div>
        </div>
      </div>
    </section>
  )
}
