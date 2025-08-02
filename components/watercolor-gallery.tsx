import { getPaintings } from "@/lib/database"
import { PaintingCard } from "@/components/painting-card"
import { AlertCircle, Palette, Database } from "lucide-react"
import { isFirebaseConfigured } from "@/lib/firebase"

export async function WatercolorGallery() {
  if (!isFirebaseConfigured) {
    return (
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-50/70 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-red-100/50">
            <Database className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-red-800 mb-2">Firebase No Configurado</h3>
            <p className="text-red-600 mb-4">
              Para ver las pinturas, necesitas configurar Firebase con tus credenciales.
            </p>
          </div>
        </div>
      </section>
    )
  }

  try {
    console.log("🎨 Cargando galería completa...")
    const paintings = await getPaintings()

    if (paintings.length === 0) {
      return (
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-blue-50/70 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-blue-100/50">
              <Palette className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-blue-800 mb-2">No Hay Pinturas en la Base de Datos</h3>
              <p className="text-blue-600 mb-4">
                La colección 'paintings' está vacía. Ejecuta el script para agregar pinturas.
              </p>
              <div className="text-sm text-blue-600 bg-blue-50 rounded-lg p-4">
                <p className="font-medium mb-2">Para agregar pinturas:</p>
                <p>1. Ejecuta: node scripts/agregar-pinturas.js</p>
                <p>2. O agrega datos manualmente en Firebase Console</p>
              </div>
            </div>
          </div>
        </section>
      )
    }

    console.log(`✅ Mostrando ${paintings.length} pinturas en la galería`)

    return (
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-gray-800 mb-4">Mi Galería</h2>
            <p className="text-gray-600 font-light mb-8">
              Explora mi colección completa de {paintings.length} obras en acuarela
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mx-auto rounded-full opacity-60"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paintings.map((painting) => (
              <PaintingCard key={painting.id} painting={painting} />
            ))}
          </div>

          {/* Información adicional */}
          <div className="mt-12 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 inline-block">
              <p className="text-gray-600 text-sm">
                📊 Total: <span className="font-semibold">{paintings.length}</span> obras • 🎨 Disponibles:{" "}
                <span className="font-semibold">{paintings.filter((p) => p.isAvailable).length}</span> • ⭐ Destacadas:{" "}
                <span className="font-semibold">{paintings.filter((p) => p.isFeatured).length}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error("❌ Error loading gallery:", error)

    return (
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-50/70 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-red-100/50">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-red-800 mb-2">Error al Cargar la Galería</h3>
            <p className="text-red-600 mb-4">Hubo un problema conectando con Firebase. Revisa la configuración.</p>
            <div className="text-sm text-red-600 bg-red-50 rounded-lg p-4">
              <p className="font-medium mb-2">Posibles soluciones:</p>
              <p>1. Verifica que Firebase esté configurado correctamente</p>
              <p>2. Asegúrate de que la colección 'paintings' exista</p>
              <p>3. Revisa la consola del navegador para más detalles</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
