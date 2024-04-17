import { apiSlice } from "../../app/api/apiSlice";
import { WeatherData } from "../../interface/weather";

export const weatherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GETS
    getWeather: builder.query<WeatherData, any>({
      query: () => ({
        url: `weather`,
        method: "GET",
      })
    }),
  }),
});

export const {
  // GETS
  useGetWeatherQuery,
} = weatherApiSlice;
