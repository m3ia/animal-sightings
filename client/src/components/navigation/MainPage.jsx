const MainPage = ({setCurrentView}) => {
  return (
    <>
      {/* Parent div: main-menu-div */}
      <h1>Main Page</h1>
      <div className="main-menu-btns">
        <div
          className="sightings-menu-btn menu-btns"
          onClick={() => setCurrentView("sightings")}>
          Sightings
        </div>
        <div
          className="individuals-menu-btn menu-btns"
          onClick={() => setCurrentView("individuals")}>
          Individuals
        </div>
        <div
          className="locations-menu-btn menu-btns"
          onClick={() => setCurrentView("locations")}>
          Locations
        </div>
      </div>
    </>
  );
};

export default MainPage;
