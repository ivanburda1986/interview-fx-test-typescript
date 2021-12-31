import React from "react";
import { AppContext } from "./context/context";
import { Header } from "./components/Header";
import { Searchbar } from "./components/Searchbar";
import { FXPairsList } from "./components/FXPairsList";
import "./App.css";

function App() {
  const [filterValue, setFilterValue] = React.useState<string>("");

  //Context provider
  const contextProvider = {
    filterValue,
    setFilterValueHandler,
  };

  //Methods
  function setFilterValueHandler(newFilterValue: string): void {
    setFilterValue(newFilterValue);
  }

  return (
    <div className="App">
      <AppContext.Provider value={contextProvider}>
        <Header />
        <Searchbar />
        <FXPairsList />
      </AppContext.Provider>
    </div>
  );
}

export default App;
