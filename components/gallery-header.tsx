import { Palette, Droplets } from "lucide-react"

export function GalleryHeader() {
  return (
    <header className="text-center py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Palette className="w-8 h-8 text-blue-600" />
          <h1 className="text-5xl md:text-6xl font-light text-gray-800 tracking-wide">Acuarelas</h1>
          <Droplets className="w-8 h-8 text-purple-600" />
        </div>

        <p className="text-xl text-gray-600 font-light leading-relaxed mb-8">
          Una colección de obras que capturan la esencia fluida y translúcida del arte en acuarela
        </p>

        <div className="w-32 h-1 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mx-auto rounded-full opacity-60"></div>
      </div>
    </header>
  )
}
