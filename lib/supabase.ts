import { createClient } from "@supabase/supabase-js"

// Check if Supabase environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create Supabase client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Flag to check if Supabase is configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      artists: {
        Row: {
          id: number
          name: string
          bio: string | null
          birth_year: number | null
          nationality: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          bio?: string | null
          birth_year?: number | null
          nationality?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          bio?: string | null
          birth_year?: number | null
          nationality?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      paintings: {
        Row: {
          id: number
          title: string
          artist_id: number | null
          year: number
          description: string | null
          image_url: string | null
          colors: string[] | null
          technique: string | null
          size: string | null
          price: number | null
          is_available: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          artist_id?: number | null
          year: number
          description?: string | null
          image_url?: string | null
          colors?: string[] | null
          technique?: string | null
          size?: string | null
          price?: number | null
          is_available?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          artist_id?: number | null
          year?: number
          description?: string | null
          image_url?: string | null
          colors?: string[] | null
          technique?: string | null
          size?: string | null
          price?: number | null
          is_available?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
