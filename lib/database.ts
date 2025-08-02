import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  limit,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore"
import { db, isFirebaseConfigured } from "./firebase"

export type Painting = {
  id: string
  title: string
  year: number
  description: string
  imageUrl: string
  colors: string[]
  technique: string
  size: string
  price: number
  currency: string
  isAvailable: boolean
  isFeatured: boolean
  category: string
  tags: string[]
  materials: string[]
  dimensions: {
    width: number
    height: number
    unit: string
  }
  metadata: {
    views: number
    likes: number
    sold: boolean
    soldDate?: Date
  }
}

export type ArtistInfo = {
  name: string
  bio: string
  birthYear: number
  nationality: string
  email: string
  phone?: string
  website?: string
  socialMedia?: {
    instagram?: string
    facebook?: string
    twitter?: string
  }
  experience?: {
    yearsActive: number
    exhibitions: number
    awards: string[]
  }
  specialties?: string[]
  statement?: string
}

// Convertir documento de Firestore a tipo Painting
function convertDocToPainting(doc: QueryDocumentSnapshot<DocumentData>): Painting {
  const data = doc.data()

  return {
    id: doc.id,
    title: data.title || "Sin título",
    year: data.year || new Date().getFullYear(),
    description: data.description || "",
    imageUrl: data.imageUrl || "/placeholder.svg?height=400&width=500&text=Sin+imagen",
    colors: data.colors || [],
    technique: data.technique || "",
    size: data.size || "",
    price: data.price || 0,
    currency: data.currency || "EUR",
    isAvailable: data.isAvailable ?? true,
    isFeatured: data.isFeatured ?? false,
    category: data.category || "Sin categoría",
    tags: data.tags || [],
    materials: data.materials || [],
    dimensions: data.dimensions || { width: 0, height: 0, unit: "cm" },
    metadata: {
      views: data.metadata?.views || 0,
      likes: data.metadata?.likes || 0,
      sold: data.metadata?.sold || false,
      soldDate: data.metadata?.soldDate?.toDate(),
    },
  }
}

// ===== FUNCIONES PRINCIPALES =====

export async function getPaintings(): Promise<Painting[]> {
  if (!isFirebaseConfigured) {
    console.log("⚠️ Firebase no configurado")
    return []
  }

  try {
    console.log("🔥 Obteniendo pinturas desde Firebase...")
    const paintingsRef = collection(db, "paintings")
    const q = query(paintingsRef, orderBy("year", "desc"))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      console.log("📭 No se encontraron pinturas en la colección 'paintings'")
      return []
    }

    const paintings = querySnapshot.docs.map(convertDocToPainting)
    console.log(`✅ ${paintings.length} pinturas cargadas desde Firebase`)
    return paintings
  } catch (error) {
    console.error("❌ Error obteniendo pinturas desde Firebase:", error)
    return []
  }
}

// ✅ SOLUCIÓN 1: Función simplificada sin índices complejos
export async function getFeaturedPaintings(): Promise<Painting[]> {
  if (!isFirebaseConfigured) {
    return []
  }

  try {
    console.log("🌟 Obteniendo pinturas destacadas...")

    // Obtener todas las pinturas y filtrar en memoria (más simple)
    const allPaintings = await getPaintings()

    // Filtrar destacadas y disponibles
    const featuredPaintings = allPaintings
      .filter((painting) => painting.isFeatured && painting.isAvailable)
      .sort((a, b) => b.year - a.year) // Ordenar por año descendente
      .slice(0, 6) // Limitar a 6

    console.log(`✅ ${featuredPaintings.length} pinturas destacadas cargadas`)
    return featuredPaintings
  } catch (error) {
    console.error("❌ Error obteniendo pinturas destacadas:", error)
    return []
  }
}

// ✅ SOLUCIÓN 2: Query más simple por separado
export async function getFeaturedPaintingsSimple(): Promise<Painting[]> {
  if (!isFirebaseConfigured) {
    return []
  }

  try {
    console.log("🌟 Obteniendo pinturas destacadas (método simple)...")
    const paintingsRef = collection(db, "paintings")

    // Solo filtrar por isFeatured, sin múltiples where
    const q = query(paintingsRef, where("isFeatured", "==", true), limit(10))

    const querySnapshot = await getDocs(q)
    const paintings = querySnapshot.docs.map(convertDocToPainting)

    // Filtrar disponibles en memoria
    const availableFeatured = paintings.filter((painting) => painting.isAvailable).slice(0, 6)

    console.log(`✅ ${availableFeatured.length} pinturas destacadas cargadas`)
    return availableFeatured
  } catch (error) {
    console.error("❌ Error obteniendo pinturas destacadas:", error)
    return []
  }
}

export async function getArtistInfo(): Promise<ArtistInfo | null> {
  if (!isFirebaseConfigured) {
    return null
  }

  try {
    console.log("👤 Obteniendo información del artista...")
    const docRef = doc(db, "artist", "info")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      console.log("✅ Información del artista cargada")
      return data as ArtistInfo
    } else {
      console.log("📭 No se encontró información del artista")
      return null
    }
  } catch (error) {
    console.error("❌ Error obteniendo información del artista:", error)
    return null
  }
}

export async function getPaintingStats() {
  try {
    const paintings = await getPaintings()

    if (paintings.length === 0) {
      return {
        totalPaintings: 0,
        availablePaintings: 0,
        soldPaintings: 0,
        featuredPaintings: 0,
        averagePrice: 0,
        totalViews: 0,
        totalLikes: 0,
        categories: [],
      }
    }

    const totalPaintings = paintings.length
    const availablePaintings = paintings.filter((p) => p.isAvailable).length
    const soldPaintings = paintings.filter((p) => p.metadata.sold).length
    const featuredPaintings = paintings.filter((p) => p.isFeatured).length

    const availablePrices = paintings.filter((p) => p.isAvailable && p.price > 0).map((p) => p.price)
    const averagePrice =
      availablePrices.length > 0 ? availablePrices.reduce((sum, price) => sum + price, 0) / availablePrices.length : 0

    const totalViews = paintings.reduce((sum, p) => sum + p.metadata.views, 0)
    const totalLikes = paintings.reduce((sum, p) => sum + p.metadata.likes, 0)

    const categories = [...new Set(paintings.map((p) => p.category))].filter(Boolean)

    return {
      totalPaintings,
      availablePaintings,
      soldPaintings,
      featuredPaintings,
      averagePrice: Math.round(averagePrice),
      totalViews,
      totalLikes,
      categories,
    }
  } catch (error) {
    console.error("❌ Error obteniendo estadísticas:", error)
    return {
      totalPaintings: 0,
      availablePaintings: 0,
      soldPaintings: 0,
      featuredPaintings: 0,
      averagePrice: 0,
      totalViews: 0,
      totalLikes: 0,
      categories: [],
    }
  }
}
