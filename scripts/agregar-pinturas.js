// Script para agregar nuevas pinturas
// Ejecutar con: node scripts/agregar-pinturas.js

import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB61oOfUw8Y77Bt5miT3DOUHNhln8J1hIY",
  authDomain: "proyectomercha.firebaseapp.com",
  projectId: "proyectomercha",
  storageBucket: "proyectomercha.firebasestorage.app",
  messagingSenderId: "433430867164",
  appId: "1:433430867164:web:061a687272325b3e459819",
  measurementId: "G-GXE7XC6J0Q",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// 🎨 AGREGA TUS NUEVAS PINTURAS AQUÍ
const nuevasPinturas = [
  {
    title: "Paisaje de Montaña",
    year: 2024,
    description: "Vista panorámica de las montañas al amanecer con colores suaves y delicados.",
    imageUrl: "https://via.placeholder.com/600x400/87CEEB/000000?text=Paisaje+de+Montaña",
    price: 950,
    isAvailable: true,
    isFeatured: true,
    technique: "Acuarela sobre papel",
    category: "Paisajes",
    size: "35x50 cm",
    colors: ["#87CEEB", "#FFB6C1", "#F0E68C", "#98FB98"],
    tags: ["montaña", "amanecer", "naturaleza"],
    materials: ["Papel Arches 300g", "Acuarelas Winsor & Newton"],
    dimensions: { width: 35, height: 50, unit: "cm" },
    currency: "EUR",
    metadata: { views: 0, likes: 0, sold: false },
  },
  {
    title: "Rosas en el Jardín",
    year: 2024,
    description: "Delicadas rosas rojas y rosadas en un jardín lleno de vida y color.",
    imageUrl: "https://via.placeholder.com/600x400/FF69B4/000000?text=Rosas+en+el+Jardín",
    price: 750,
    isAvailable: true,
    isFeatured: false,
    technique: "Acuarela húmeda sobre húmeda",
    category: "Flores",
    size: "25x35 cm",
    colors: ["#FF69B4", "#DC143C", "#98FB98", "#F0E68C"],
    tags: ["rosas", "jardín", "flores", "romántico"],
    materials: ["Papel Fabriano 250g", "Acuarelas Schmincke"],
    dimensions: { width: 25, height: 35, unit: "cm" },
    currency: "EUR",
    metadata: { views: 0, likes: 0, sold: false },
  },
  // Agrega más pinturas aquí cuando quieras...
]

async function agregarNuevasPinturas() {
  try {
    console.log("🎨 Agregando nuevas pinturas...")

    for (const pintura of nuevasPinturas) {
      const docRef = await addDoc(collection(db, "paintings"), pintura)
      console.log(`✅ "${pintura.title}" agregada con ID: ${docRef.id}`)
    }

    console.log(`\n🎉 ¡${nuevasPinturas.length} pinturas agregadas exitosamente!`)
    console.log("🌐 Ve a tu sitio web para verlas")
  } catch (error) {
    console.error("❌ Error agregando pinturas:", error)
  }
}

agregarNuevasPinturas()
