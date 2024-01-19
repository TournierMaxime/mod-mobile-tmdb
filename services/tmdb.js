import axios from "axios"
import { EXPO_TMDB_API, EXPO_TMDB_API_KEY } from '@env'

const tmdbApi = axios.create({
  baseURL: EXPO_TMDB_API,
})

const ReleaseDates = (id) => {
  return tmdbApi.get(`/movie/${id}/release_dates`, {
    params: {
      api_key: EXPO_TMDB_API_KEY
    },
  });
};

const NowPlaying = (page, language) => {
  return tmdbApi.get("/movie/now_playing", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page,
    },
  });
};

const Upcoming = (page, language) => {
  return tmdbApi.get("/movie/upcoming", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page
    },
  });
};

const OnTheAir = (page, language) => {
  return tmdbApi.get("/tv/on_the_air", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page
    },
  });
};

const Popular = (page, language) => {
  return tmdbApi.get("/tv/popular", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page
    },
  });
};

const Search = (page, query, language) => {
  return tmdbApi.get("/search/multi", {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page,
      include_adult: false,
      query
    },
  });
};

const MovieDetails = (id, language) => {
  return tmdbApi.get(`/movie/${id}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const MovieWatchProviders = (id) => {
  return tmdbApi.get(`/movie/${id}/watch/providers`, {
    params: {
      api_key: EXPO_TMDB_API_KEY
    },
  });
};

const SerieDetails = (id, language) => {
  return tmdbApi.get(`/tv/${id}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const SeasonDetails = (id, seasonNumber, language) => {
  return tmdbApi.get(`/tv/${id}/season/${seasonNumber}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const SeasonWatchProviders = (id, seasonNumber, language) => {
  return tmdbApi.get(`/tv/${id}/season/${seasonNumber}/watch/providers`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const PeopleDetails = (id, language) => {
  return tmdbApi.get(`/person/${id}`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const MovieCrew = (id, language) => {
  return tmdbApi.get(`/movie/${id}/credits`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const MovieTrailer = (id, language) => {
  return tmdbApi.get(`/movie/${id}/videos`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const SerieCrew = (id, language) => {
  return tmdbApi.get(`/tv/${id}/credits`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const SerieTrailer = (id, language) => {
  return tmdbApi.get(`/tv/${id}/videos`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const PeopleCareer = (id, language) => {
  return tmdbApi.get(`/person/${id}/combined_credits`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language
    },
  });
};

const Trending = (page, language) => {
  return tmdbApi.get(`/trending/all/day`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page
    },
  });
};

const TrendingTV = (page, language) => {
  return tmdbApi.get(`/trending/tv/week`, {
    params: {
      api_key: EXPO_TMDB_API_KEY,
      language,
      page
    },
  });
};

const PeopleExternalIds = (id) => {
  return tmdbApi.get(`/person/${id}/external_ids`, {
    params: {
      api_key: EXPO_TMDB_API_KEY
    },
  });
};


export { 
  ReleaseDates,
  NowPlaying,
  Upcoming,
  OnTheAir,
  Popular,
  Search,
  MovieDetails,
  SerieDetails,
  PeopleDetails,
  MovieCrew,
  MovieTrailer,
  SerieCrew,
  SerieTrailer,
  PeopleCareer,
  Trending,
  TrendingTV,
  SeasonDetails,
  SeasonWatchProviders,
  MovieWatchProviders,
  PeopleExternalIds
};
