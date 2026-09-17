import CurrentWeatherCard from "./CurrentWeatherCard";
import LocationCard from "./LocationCard";
import SunTimesCard from "./SunTimesCard";
import WeatherDetails from "./WeatherDetails";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import "./WeatherDashboard.css";

function WeatherDashboard() {
  return (
    <main className="weather-dashboard">
      <header className="dashboard-header">
        <SearchBar />
        <ThemeToggle />
      </header>
      <section className="weather-grid">
        <CurrentWeatherCard />
        <LocationCard />
        <SunTimesCard />
        <WeatherDetails />
      </section>
    </main>
  );
}

export default WeatherDashboard;
