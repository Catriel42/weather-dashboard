import { Sunrise, Sunset } from "lucide-react";
import "./SunTimesCard.css";

function SunTimesCard() {
  return (
    <article className="sun-times-card">
      <h2>Sun Times</h2>

      <div className="sun-time">
        <Sunrise size={22} />

        <div>
          <span>Sunrise</span>
          <strong>06:12 AM</strong>
        </div>
      </div>

      <div className="sun-time">
        <Sunset size={22} />

        <div>
          <span>Sunset</span>
          <strong>06:32 PM</strong>
        </div>
      </div>
    </article>
  );
}

export default SunTimesCard;