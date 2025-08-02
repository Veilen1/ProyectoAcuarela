// Script de prueba para identificar el problema
// Ejecutar con: node scripts/test-firebase.js

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

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// ✅ PRUEBA 1: Documento súper simple
async function pruebaSimple() {
  try {
    console.log("\n🧪 PRUEBA 1: Documento básico...")
    await setDoc(doc(db, "test", "simple"), {
      nombre: "Test",
      numero: 123,
      activo: true,
    })
    console.log("✅ Documento básico creado correctamente")
    return true
  } catch (error) {
    console.error("❌ Error en documento básico:", error.message)
    return false
  }
}

// ✅ PRUEBA 2: Solo información del artista
async function pruebaArtista() {
  try {
    console.log("\n🧪 PRUEBA 2: Solo artista...")
    const artistaSimple = {
      name: "Maria Isabel Devrient",
      bio: "Artista de acuarelas",
      email: "devrientmaria2@gmail.com",
      birthYear: 1969,
      nationality: "Argentina",
    }

    await setDoc(doc(db, "artist", "info"), artistaSimple)
    console.log("✅ Artista creado correctamente")
    return true
  } catch (error) {
    console.error("❌ Error creando artista:", error.message)
    return false
  }
}

// ✅ PRUEBA 3: Una pintura súper básica
async function pruebaPintura() {
  try {
    console.log("\n🧪 PRUEBA 3: Una pintura básica...")
    const pinturaSimple = {
      title: "Mi Primera Pintura",
      year: 2023,
      description: "Una pintura de prueba",
      price: 500,
      isAvailable: true,
    }

    const docRef = await addDoc(collection(db, "paintings"), pinturaSimple)
    console.log("✅ Pintura creada con ID:", docRef.id)
    return true
  } catch (error) {
    console.error("❌ Error creando pintura:", error.message)
    return false
  }
}

// ✅ PRUEBA 4: Pintura con más campos
async function pruebaPinturaCompleta() {
  try {
    console.log("\n🧪 PRUEBA 4: Pintura con más campos...")
    const pinturaCompleta = {
      title: "Jardín de Primavera",
      year: 2023,
      description: "Una delicada representación de un jardín en primavera",
      imageUrl: "https://example.com/imagen.jpg",
      price: 850,
      currency: "EUR",
      isAvailable: true,
      isFeatured: true,
      technique: "Acuarela húmeda",
      size: "30x40 cm",
      category: "Paisajes",
    }

    const docRef = await addDoc(collection(db, "paintings"), pinturaCompleta)
    console.log("✅ Pintura completa creada con ID:", docRef.id)
    return true
  } catch (error) {
    console.error("❌ Error creando pintura completa:", error.message)
    return false
  }
}

// 🚀 EJECUTAR TODAS LAS PRUEBAS
async function ejecutarPruebas() {
  console.log("🔍 INICIANDO DIAGNÓSTICO DE FIREBASE...\n")

  const prueba1 = await pruebaSimple()
  if (!prueba1) {
    console.log("\n❌ PROBLEMA: No se pueden crear documentos básicos")
    console.log("🔧 SOLUCIÓN: Revisa la configuración de Firebase y las reglas de Firestore")
    return
  }

  const prueba2 = await pruebaArtista()
  if (!prueba2) {
    console.log("\n❌ PROBLEMA: Error en los datos del artista")
    return
  }

  const prueba3 = await pruebaPintura()
  if (!prueba3) {
    console.log("\n❌ PROBLEMA: Error en datos básicos de pintura")
    return
  }

  const prueba4 = await pruebaPinturaCompleta()
  if (!prueba4) {
    console.log("\n❌ PROBLEMA: Error en campos adicionales de pintura")
    return
  }

  console.log("\n🎉 ¡TODAS LAS PRUEBAS PASARON!")
  console.log("✅ Firebase está funcionando correctamente")
  console.log("🚀 Ahora puedes usar el script principal")
}

ejecutarPruebas()
