import CurrentWeatherCard from "./CurrentWeatherCard";
import LocationCard from "./LocationCard";
import SunTimesCard from "./SunTimesCard";
import WeatherDetails from "./WeatherDetails";
import ResultCard from "./ResultCard";
import SearchBar from "./SearchBar";

function WeatherDashboard() {
    return (
        <main>
            <CurrentWeatherCard />
            <LocationCard />
            <SunTimesCard />
            <WeatherDetails />
            <ResultCard />
            <SearchBar />
        </main>
    )
}

export default WeatherDashboard;