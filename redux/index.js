import {
  nowPlayingReducer,
  movideDetailsReducer,
  upcomingReducer,
  movieCrewReducer,
  movieTrailerReducer,
  releaseDatesReducer,
  movieWatchProvidersReducer,
  trendingReducer,
  movieRecommendationReducer
} from './reducers/movies'
import {
  detailsPeopleReducer,
  peopleCareerReducer,
  peopleExternalIdsReducer,
} from './reducers/people'
import {
  onTheAirReducer,
  popularReducer,
  serieDetailsReducer,
  serieCrewReducer,
  serieTrailerReducer,
  seasonWatchProvidersReducer,
  trendingTVReducer,
  seasonDetailsReducer,
  serieRecommendationReducer
} from './reducers/series'
import searchReducer from './reducers/search'

const movieTmdbReducer = {
  nowPlaying: nowPlayingReducer,
  upcoming: upcomingReducer,
  movieDetails: movideDetailsReducer,
  movieCrew: movieCrewReducer,
  movieTrailer: movieTrailerReducer,
  trending: trendingReducer,
  releaseDates: releaseDatesReducer,
  movieWatchProviders: movieWatchProvidersReducer,
  movieRecommendation: movieRecommendationReducer
}

const serieTmdbReducer = {
  onTheAir: onTheAirReducer,
  popular: popularReducer,
  serieDetails: serieDetailsReducer,
  serieCrew: serieCrewReducer,
  serieTrailer: serieTrailerReducer,
  seasonDetails: seasonDetailsReducer,
  seasonWatchProviders: seasonWatchProvidersReducer,
  trendingTV: trendingTVReducer,
  serieRecommendation: serieRecommendationReducer
}

const peopleTmdbReducer = {
  peopleExternalIds: peopleExternalIdsReducer,
  peopleDetails: detailsPeopleReducer,
  peopleCareer: peopleCareerReducer,
}

const searchTmdbReducer = {
  search: searchReducer,
}

export { movieTmdbReducer, serieTmdbReducer, peopleTmdbReducer, searchTmdbReducer }
