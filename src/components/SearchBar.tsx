import { Search } from "lucide-react";
import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="search-bar">
      <Search />
      <input type="text" id="search" placeholder="Search city..." />

      <button type="button">Search</button>
    </div>
  );
}

export default SearchBar;
