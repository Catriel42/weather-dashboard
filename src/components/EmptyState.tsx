import { Map } from "lucide-react";
import "./EmptyState.css";

function EmptyState() {
  return (
    <div className="empty-state">
      <Map size={48} />
      <p>Type some city name</p>
    </div>
  );
}

export default EmptyState;
