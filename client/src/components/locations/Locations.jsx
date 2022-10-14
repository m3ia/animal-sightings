import {useState, useEffect} from "react";
const Locations = () => {
  const [locations, setLocations] = useState({});

  useEffect(() => {
    const getLocations = async () => {
      await fetch("http://localhost:8080/locations")
        .then((res) => res.json())
        .then((res) => {
          setLocations({...res});
        });
    };
    getLocations();
  }, []);
  return (
    <>
      <div className="cards-div">
        {Object.keys(locations).map((loc, index) => {
          return (
            <div key={index} className="cards">
              <h5>{loc}</h5>
              <div>Individuals: {locations[loc]}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Locations;
