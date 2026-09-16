import CurrentWeatherCard from "./CurrentWeatherCard";
import LocationCard from "./LocationCard";
import SunTimesCard from "./SunTimesCard";
import WeatherDetails from "./WeatherDetails";

function WeatherDashboard() {
    return (
        <main>
            <CurrentWeatherCard />
            <LocationCard />
            <SunTimesCard />
            <WeatherDetails />
        </main>
    )
}

export default WeatherDashboard;