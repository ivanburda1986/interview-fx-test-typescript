import React from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/context";
import styles from "./Searchbar.module.css";
import { FaGithub } from "react-icons/fa";

export const Searchbar: React.FC = () => {
  const location = useLocation();
  const context = React.useContext(AppContext);
  const searchStringRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const filterValue = decodeURIComponent(location.hash).replace(/#/gi, "");
    context.setFilterValueHandler(filterValue);
  }, [location.hash]);

  const handleSearch = React.useCallback(() => {
    if (searchStringRef.current) {
      window.location.hash = searchStringRef.current.value;
    }
  }, []);

  return (
    <div className={styles.searchbar}>
      <div className={styles.searchbarContainer}>
        <div>
          <label htmlFor="searchbar">Search</label>
          <input type="text" id="searchbar" placeholder="Currency code or name" value={context.filterValue} ref={searchStringRef} onChange={handleSearch} />
        </div>
        <a href="https://github.com/ivanburda1986/interview-fx-test-typescript" target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
      </div>
    </div>
  );
};
