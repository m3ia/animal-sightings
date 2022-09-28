const MainPage = ({setCurrentView}) => {
  return (
    <>
      {/* Parent div: main-menu-div */}
      <h1>Main Page</h1>
      <div className="main-menu-btns">
        <div
          className="sightings-menu-btn"
          onClick={() => setCurrentView("sightings")}>
          Sightings
        </div>
        <div
          className="individuals-btn"
          onClick={() => setCurrentView("individuals")}>
          Individuals
        </div>
      </div>
    </>
  );
};

export default MainPage;
