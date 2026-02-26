import { getArtistInfo } from "@/lib/database"
import { Palette, Mail, Phone, Globe, Instagram, Facebook } from "lucide-react"

export async function ArtistHero() {
  const artist = await getArtistInfo()

  if (!artist) {
    return null
  }

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background watercolor effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-56 h-56 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-16 left-1/3 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Palette className="w-10 h-10 text-blue-600" />
            <h1 className="text-6xl md:text-7xl font-light text-gray-800 tracking-wide">{artist.name}</h1>
          </div>

          <p className="text-xl text-gray-600 font-light mb-2">Artista de Acuarelas • {artist.nationality}</p>

          <div className="w-40 h-1 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mx-auto rounded-full opacity-60 mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Artist Bio */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sobre la Artista</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{artist.bio}</p>

            <div className="text-sm text-gray-600">
              <p className="mb-1">
                <span className="font-medium">Nacida:</span> {artist.birthYear}
              </p>
              <p>
                <span className="font-medium">Especialidad:</span> Acuarelas Paisajistas
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contacto</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-blue-600" />
                <a href={`mailto:${artist.email}`} className="hover:text-blue-600 transition-colors">
                  {artist.email}
                </a>
              </div>

              {artist.phone && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-green-600" />
                  <a href={`tel:${artist.phone}`} className="hover:text-green-600 transition-colors">
                    {artist.phone}
                  </a>
                </div>
              )}

              {artist.website && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <a
                    href={`https://${artist.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-600 transition-colors"
                  >
                    {artist.website}
                  </a>
                </div>
              )}
            </div>

            {/* Social Media */}
            {artist.socialMedia && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Sígueme en:</h3>
                <div className="flex gap-3">
                  {artist.socialMedia.instagram && (
                    <a
                      href={`https://instagram.com/${artist.socialMedia.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}

                  {artist.socialMedia.facebook && (
                    <a
                      href={`https://facebook.com/${artist.socialMedia.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
