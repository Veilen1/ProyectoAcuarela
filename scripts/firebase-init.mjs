// Script corregido para cargar datos a Firebase
// Ejecutar con: node scripts/firebase-simple.js

import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB61oOfUw8Y77Bt5miT3DOUHNhln8J1hIY",
  authDomain: "proyectomercha.firebaseapp.com",
  projectId: "proyectomercha",
  storageBucket: "proyectomercha.firebasestorage.app",
  messagingSenderId: "433430867164",
  appId: "1:433430867164:web:061a687272325b3e459819",
  measurementId: "G-GXE7XC6J0Q"
};

console.log("🔥 Configuración Firebase:")
console.log("Project ID:", firebaseConfig.projectId)
console.log("Auth Domain:", firebaseConfig.authDomain)

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// ✅ DATOS CORREGIDOS - Sin campos problemáticos
const artistInfo = {
  name: "Maria Isabel Devrient",
  bio: "Artista especializada en acuarelas contemporáneas, explorando la interacción entre agua, color y emoción. Con más de 3 años de experiencia, he desarrollado un estilo único que combina paisajes bellos con la esencia de la vida.",
  birthYear: 1969,
  nationality: "Argentina",
  email: "devrientmaria2@gmail.com",
  socialMedia: {
    instagram: "@mariadevri",
  },
}

// ✅ PINTURAS CORREGIDAS - Estructura simple y válida
const paintings = [
  {
    title: "Jardín de Primavera",
    year: 2023,
    description:
      "Una delicada representación de un jardín en primavera, donde los colores se difuminan suavemente creando una atmósfera de tranquilidad y renovación.",
    imageUrl: "/placeholder.svg?height=400&width=500&text=Jardín+de+Primavera",
    colors: ["#FFB6C1", "#98FB98", "#87CEEB", "#DDA0DD"],
    technique: "Acuarela húmeda sobre húmeda",
    size: "30x40 cm",
    price: 850,
    currency: "EUR",
    isAvailable: true,
    isFeatured: true,
    category: "Paisajes",
    tags: ["primavera", "jardín", "flores"],
    materials: ["Papel Arches", "Acuarelas"],
    dimensions: {
      width: 30,
      height: 40,
      unit: "cm",
    },
    metadata: {
      views: 0,
      likes: 0,
      sold: false,
    },
  },
  {
    title: "Atardecer en el Lago",
    year: 2023,
    description:
      "Los reflejos dorados del atardecer danzan sobre la superficie del agua, capturados con la técnica de lavado que caracteriza mis obras.",
    imageUrl: "/placeholder.svg?height=400&width=500&text=Atardecer+en+el+Lago",
    colors: ["#FFD700", "#FF6347", "#4169E1", "#9370DB"],
    technique: "Técnica de lavado",
    size: "25x35 cm",
    price: 720,
    currency: "EUR",
    isAvailable: true,
    isFeatured: false,
    category: "Paisajes",
    tags: ["atardecer", "lago", "agua"],
    materials: ["Papel Fabriano", "Acuarelas"],
    dimensions: {
      width: 25,
      height: 35,
      unit: "cm",
    },
    metadata: {
      views: 0,
      likes: 0,
      sold: false,
    },
  },
  {
    title: "Flores Silvestres",
    year: 2024,
    description: "Un ramo de flores silvestres pintado con la espontaneidad que permite la acuarela.",
    imageUrl: "/placeholder.svg?height=400&width=500&text=Flores+Silvestres",
    colors: ["#FF69B4", "#32CD32", "#FFD700"],
    technique: "Pincelada suelta",
    size: "20x30 cm",
    price: 650,
    currency: "EUR",
    isAvailable: true,
    isFeatured: true,
    category: "Naturaleza muerta",
    tags: ["flores", "naturaleza"],
    materials: ["Papel Canson", "Acuarelas"],
    dimensions: {
      width: 20,
      height: 30,
      unit: "cm",
    },
    metadata: {
      views: 0,
      likes: 0,
      sold: false,
    },
  },
]

async function cargarDatos() {
  try {
    console.log("\n🚀 Iniciando carga de datos...")

    // 1. Cargar información del artista
    console.log("\n👤 Cargando información del artista...")
    await setDoc(doc(db, "artist", "info"), artistInfo)
    console.log("✅ Artista cargado correctamente")

    // 2. Cargar pinturas una por una
    console.log("\n🎨 Cargando pinturas...")
    for (let i = 0; i < paintings.length; i++) {
      const painting = paintings[i]
      try {
        const docRef = await addDoc(collection(db, "paintings"), painting)
        console.log(`✅ "${painting.title}" cargada con ID: ${docRef.id}`)
      } catch (paintingError) {
        console.error(`❌ Error cargando "${painting.title}":`, paintingError.message)
      }
    }

    console.log("\n🎉 ¡PROCESO COMPLETADO!")
    console.log(`📊 ${paintings.length} pinturas procesadas`)
    console.log("🌐 Ve a Firebase Console para verificar los datos")
  } catch (error) {
    console.error("❌ Error general:", error.message)
    console.log("\n🔍 Posibles soluciones:")
    console.log("1. Verifica que las variables de entorno estén correctas")
    console.log("2. Asegúrate de que Firestore esté habilitado")
    console.log("3. Revisa las reglas de Firestore")
  }
}

// Ejecutar
cargarDatos()
