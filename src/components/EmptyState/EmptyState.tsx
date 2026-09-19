import { Map } from "lucide-react";
import "./EmptyState.css";

export const EmptyState = () => {
  return (
    <div className="empty-state">
      <Map size={48} />
      <p>Type some city name</p>
    </div>
  );
}
