import { getPaintingStats } from "@/lib/database"
import { isFirebaseConfigured } from "@/lib/firebase"
import { Palette, CheckCircle, Euro, Eye, Heart, ShoppingBag } from "lucide-react"

export async function GalleryStats() {
  const stats = await getPaintingStats()

  const statItems = [
    {
      icon: Palette,
      label: "Obras Totales",
      value: stats.totalPaintings.toString(),
      color: "text-blue-600",
    },
    {
      icon: CheckCircle,
      label: "Disponibles",
      value: stats.availablePaintings.toString(),
      color: "text-green-600",
    },
    {
      icon: ShoppingBag,
      label: "Vendidas",
      value: stats.soldPaintings.toString(),
      color: "text-purple-600",
    },
    {
      icon: Euro,
      label: "Precio Promedio",
      value: stats.averagePrice > 0 ? `€${stats.averagePrice.toLocaleString("es-ES")}` : "N/A",
      color: "text-orange-600",
    },
    {
      icon: Eye,
      label: "Visualizaciones",
      value: stats.totalViews.toLocaleString("es-ES"),
      color: "text-indigo-600",
    },
    {
      icon: Heart,
      label: "Me Gusta",
      value: stats.totalLikes.toString(),
      color: "text-red-600",
    },
  ]

  return (
    <section className="px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {!isFirebaseConfigured && (
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100/70 backdrop-blur-sm text-amber-800 px-4 py-2 rounded-full text-sm font-medium border border-amber-200/50">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              Modo demostración - Configurar Firebase para datos reales
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statItems.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-white/50 hover:bg-white/70 transition-all duration-300"
              >
                <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <div className="text-lg font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Categories */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Categorías</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {stats.categories.map((category, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-white/50"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
