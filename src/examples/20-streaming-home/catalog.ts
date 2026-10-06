export interface Movie {
  id: string
  title: string
  genre: string
  description: string
  year: number
  duration: string
  hero: string
  poster: string
  recommendedOrder: number
}

export type Favorites = Record<string, boolean>

export async function fetchMovies(): Promise<Movie[]> {
  const response = await fetch('/SolidTV_Assets/movies.json')

  if (!response.ok) {
    throw new Error(`Could not load the catalog (${response.status})`)
  }

  return response.json()
}
