import "./App.css";
import {useState} from "react";
import MainPage from "./components/navigation/MainPage";
import Sightings from "./components/sightings/Sightings";
import Footer from "./components/navigation/Footer";
import AddIndividualsForm from "./components/individuals/AddIndividualsForm";
import Individuals from "./components/individuals/Individuals"

function App() {
  const [currentView, setCurrentView] = useState("main");
  const viewOptions = ["main", "sightings", "individuals-form"];
  return (
    <div className="App">
      <div className="main-menu-div">
        {currentView === "main" && <MainPage setCurrentView={setCurrentView} />}
      </div>
      <div className="sightings-div">
        {currentView === "sightings" && (
          <Sightings setCurrentView={setCurrentView} />
        )}
      </div>
      <div className="individuals-div">
        {currentView === "individuals" && (
          <Individuals setCurrentView={setCurrentView} />
        )}
      </div>
      <div>
        <Footer setCurrentView={setCurrentView} />
      </div>
    </div>
  );
}

export default App;
