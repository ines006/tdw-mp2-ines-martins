import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// chaves da API 
const API_KEY_DOG = 'live_GqObdLXi8EyzPdE0T65HbhArhCtyQZ5StHU60KUp2iWs2uevtOgHY8WdI9ZA9vUh';
const API_KEY_CAT = 'live_3TDC3LdCExFrC4B0Cr8XWKgvJWOdKM9RnIRNmy2av0TViFBi9mt2qMym0bKK6cae';
// se possível usar variáveis de ambiente 
// const API_KEY_DOG = process.env.local.REACT_APP_API_KEY_DOG;
// const API_KEY_CAT = process.env.local.REACT_APP_API_KEY_CAT;

// Configuração da Dog API
export const dogApi = createApi({
  reducerPath: 'dogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.thedogapi.com/v1' }),
  endpoints: (builder) => ({
    fetchDogs: builder.query({
      query: ({ limit, page, order }) => ({
        url: 'images/search',
        params: {
          limit,
          page,
          order,
          api_key: API_KEY_DOG,
          has_breeds: true,
        },
      }),
    }),
    fetchDogById: builder.query({
      query: (id) => ({
        url: `images/${id}`,
        params: { api_key: API_KEY_DOG },
      }),
    }),
  }),
});

export const { useFetchDogsQuery, useFetchDogByIdQuery } = dogApi;

// Configuração da Cat API
export const catApi = createApi({
  reducerPath: 'catApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.thecatapi.com/v1' }),
  endpoints: (builder) => ({
    fetchCats: builder.query({
      query: ({ limit, page, order }) => ({
        url: 'images/search',
        params: {
          limit,
          page,
          order,
          api_key: API_KEY_CAT,
          has_breeds: true,
        },
      }),
    }),
    fetchCatById: builder.query({
      query: (id) => ({
        url: `images/${id}`,
        params: { api_key: API_KEY_CAT },
      }),
    }),
  }),
});

export const { useFetchCatsQuery, useFetchCatByIdQuery } = catApi;

// Configuração da store do Redux
const store = configureStore({
  reducer: {
    [dogApi.reducerPath]: dogApi.reducer, 
    [catApi.reducerPath]: catApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dogApi.middleware) 
      .concat(catApi.middleware), 
});

export default store;
