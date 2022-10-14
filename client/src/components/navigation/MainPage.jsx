const MainPage = ({setCurrentView}) => {
  return (
    <>
      {/* Parent div: main-menu-div */}
      <h1>Main Page</h1>
      <div className="main-menu-btns">
        <div
          className="sightings-menu-btn menu-btns"
          onClick={() => setCurrentView("sightings")}>
          <h2>Sightings</h2>
        </div>
        <div
          className="individuals-menu-btn menu-btns"
          onClick={() => setCurrentView("individuals")}>
          <h2>Individuals</h2>
        </div>
        <div
          className="locations-menu-btn menu-btns"
          onClick={() => setCurrentView("locations")}>
          <h2>Locations</h2>
        </div>
      </div>
    </>
  );
};

export default MainPage;
