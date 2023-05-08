interface Movie {
    id: string
    title: string
    genres: string[]
  }
  
  interface MovieDetails {
    id: string
    title: string
    description: string
    genres: string[]
    duration: number
    releaseDate: string
    releaseYear: number
    topCast: Cast[]
    moods: string[]
  }
  
  interface Cast {
    name: string
    characterName: string
  }