import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useGetWeatherQuery } from "../../features/weather/weatherApiSlice";
import { sharedRoute } from "../../routes";
import "./weather.scss";

const Weather = () => {
  const { data: weatherData, isLoading } = useGetWeatherQuery({});

  return (
    <div className="card-blurred">
      <div className="weather-wrapper">
        <div className="description">
          <h2>Current Weather</h2>
          {weatherData && (
            <>
              <p>{weatherData?.weather[0]?.description}</p>
              <span className="temp">
                {Math.round(weatherData?.main?.temp ?? 0)}&deg;c
              </span>
            </>
          )}
        </div>

        {weatherData && (
          <img
            src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
            width={60}
            height={60}
            alt=""
          />
        )}
      </div>
      {isLoading && !weatherData ? <div className="loader"></div> : <></>}
    </div>
  );
};

export default Weather;
