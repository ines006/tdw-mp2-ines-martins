import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY_DOG = 'live_GqObdLXi8EyzPdE0T65HbhArhCtyQZ5StHU60KUp2iWs2uevtOgHY8WdI9ZA9vUh';
const API_KEY_CAT = 'live_3TDC3LdCExFrC4B0Cr8XWKgvJWOdKM9RnIRNmy2av0TViFBi9mt2qMym0bKK6cae';

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

export const { useFetchDogsQuery, useFetchDogByIdQuery, useFetchAllDogsQuery } = dogApi;

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

export const { useFetchCatsQuery, useFetchCatByIdQuery, useFetchAllCatsQuery } = catApi;

// Configuração da store do Redux
const store = configureStore({
  reducer: {
    [dogApi.reducerPath]: dogApi.reducer, // Adiciona o reducer para gerenciar estado e cache da Dog API
    [catApi.reducerPath]: catApi.reducer, // Adiciona o reducer para a Cat API
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dogApi.middleware) // Middleware para gerenciar chamadas e cache da Dog API
      .concat(catApi.middleware), // Middleware para a Cat API
});

export default store;
