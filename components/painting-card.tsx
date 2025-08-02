"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Eye, Star, ShoppingCart, Tag, Palette, Ruler } from "lucide-react"
import { cn } from "@/lib/utils"

interface Painting {
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

interface PaintingCardProps {
  painting: Painting
  showFeaturedBadge?: boolean
}

export function PaintingCard({ painting, showFeaturedBadge = false }: PaintingCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === "EUR" ? "€" : "$"
    return `${symbol}${price.toLocaleString("es-ES")}`
  }

  return (
    <div
      className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured badge */}
      {showFeaturedBadge && painting.isFeatured && (
        <div className="absolute -top-2 -right-2 z-20">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            Destacada
          </div>
        </div>
      )}

      {/* Availability indicator */}
      {!painting.isAvailable && (
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
            {painting.metadata.sold ? "Vendida" : "No disponible"}
          </div>
        </div>
      )}

      {/* Category tag */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-blue-500/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <Tag className="w-3 h-3" />
          {painting.category}
        </div>
      </div>

      <div className="relative z-10">
        {/* Image container */}
        <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
          <Image
            src={painting.imageUrl || "/placeholder.svg"}
            alt={painting.title}
            fill
            className={cn(
              "object-cover transition-all duration-700",
              isHovered ? "scale-110 blur-[1px]" : "scale-100",
              !painting.isAvailable && "grayscale",
            )}
          />

          {/* Overlay with watercolor effect */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-500",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Ver detalles</span>
                <span className="text-xs opacity-75">({painting.metadata.views} vistas)</span>
              </div>

              {painting.isAvailable && painting.price > 0 && (
                <button className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-white/30 transition-colors flex items-center gap-1">
                  <ShoppingCart className="w-3 h-3" />
                  Consultar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{painting.title}</h3>
              <p className="text-gray-600 font-medium">{painting.year}</p>
            </div>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "p-2 rounded-full transition-all duration-300 flex items-center gap-1",
                isLiked ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-400",
              )}
            >
              <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
              <span className="text-xs">{painting.metadata.likes}</span>
            </button>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{painting.description}</p>

          {/* Tags */}
          {painting.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {painting.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                  #{tag}
                </span>
              ))}
              {painting.tags.length > 3 && (
                <span className="text-gray-400 text-xs">+{painting.tags.length - 3} más</span>
              )}
            </div>
          )}

          {/* Color palette */}
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-gray-500" />
            <div className="flex gap-1">
              {painting.colors.slice(0, 5).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              {painting.colors.length > 5 && (
                <div className="w-4 h-4 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center">
                  <span className="text-xs text-gray-600">+{painting.colors.length - 5}</span>
                </div>
              )}
            </div>
          </div>

          {/* Technique and dimensions */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="bg-blue-50 px-3 py-1 rounded-full">{painting.technique}</span>
            <div className="flex items-center gap-1">
              <Ruler className="w-3 h-3" />
              <span>{painting.size}</span>
            </div>
          </div>

          {/* Materials */}
          {painting.materials.length > 0 && (
            <div className="text-xs text-gray-500">
              <span className="font-medium">Materiales:</span> {painting.materials.slice(0, 2).join(", ")}
              {painting.materials.length > 2 && "..."}
            </div>
          )}

          {/* Price and availability */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Estado:</span>
              <span
                className={cn(
                  "text-sm font-medium px-2 py-1 rounded-full",
                  painting.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
                )}
              >
                {painting.isAvailable ? "Disponible" : painting.metadata.sold ? "Vendida" : "No disponible"}
              </span>
            </div>

            {painting.price > 0 && painting.isAvailable && (
              <span className="text-lg font-semibold text-green-600">
                {formatPrice(painting.price, painting.currency)}
              </span>
            )}
          </div>

          {/* Sold date */}
          {painting.metadata.sold && painting.metadata.soldDate && (
            <div className="text-xs text-gray-500 text-center">
              Vendida el {painting.metadata.soldDate.toLocaleDateString("es-ES")}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
