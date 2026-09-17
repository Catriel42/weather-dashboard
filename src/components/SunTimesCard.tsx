import { Sunrise, Sunset } from "lucide-react";
import "./SunTimesCard.css";

interface SunTimesCardProps {
  sunriseTime: number; // Unix timestamp
  sunsetTime: number;
  timezoneOffset: number;
}

function formatTime(unixTime: number, offset: number) {
  const date = new Date((unixTime + offset) * 1000);
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  const strMinutes = minutes < 10 ? '0' + minutes : minutes;
  
  return `${hours}:${strMinutes} ${ampm}`;
}

function SunTimesCard({ sunriseTime, sunsetTime, timezoneOffset }: SunTimesCardProps) {
  return (
    <article className="sun-times-card">
      <h2>Sun Times</h2>

      <div className="sun-time">
        <Sunrise size={22} />

        <div>
          <span>Sunrise</span>
          <strong>{formatTime(sunriseTime, timezoneOffset)}</strong>
        </div>
      </div>

      <div className="sun-time">
        <Sunset size={22} />

        <div>
          <span>Sunset</span>
          <strong>{formatTime(sunsetTime, timezoneOffset)}</strong>
        </div>
      </div>
    </article>
  );
}

export default SunTimesCard;