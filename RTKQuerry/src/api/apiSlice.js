import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', //Название редьюсера, в котором будут помещены данные(можно не задавать и будет подставлено то же самое)
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getHeroes: builder.query({
      //query - запросы на получение данных
      query: () => '/heroes',
    }),
  }),
});

export const { useGetHeroesQuery } = apiSlice; //Из слайса будут приходить хуки, с вот таким модифицированным названием
