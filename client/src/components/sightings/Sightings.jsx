import {useEffect, useState} from "react";
import AddSightingForm from "./AddSightingForm";
import Form from "react-bootstrap";

const Sightings = () => {
  const [sightings, setSightings] = useState([]);
  const [newSighting, setNewSighting] = useState({
    id: "",
    location: "",
    date: "",
    individualId: 0,
    healthStatus: "",
  });
  const [healthFilter, setHealthFilter] = useState(false);

  // Add Sighting
  const addSighting = async (e) => {
    e.preventDefault();

    const sighting = {
      location: newSighting.location,
      date: newSighting.date,
      individualId: newSighting.individualId,
      healthStatus: newSighting.healthStatus,
    };

    const res = await fetch("http://localhost:8080/sightings", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // Sent in with the request
      body: JSON.stringify(sighting),
    });

    const content = await res.json();
    console.log("content", content);
    setSightings([...sightings, content]);
    setNewSighting({
      location: "",
      date: "",
      individualId: 0,
      healthStatus: "",
    });
  };
  // Get Sightings
  useEffect(() => {
    const getSightings = async () => {
      await fetch("http://localhost:8080/sightings")
        .then((res) => res.json())
        .then((res) => {
          setSightings(() => [
            ...res.map((sighting) => {
              return {
                id: sighting.id,
                location: sighting.location,
                date: sighting.date_time,
                individual: sighting.nick_name,
                healthStatus: sighting.healthy,
              };
            }),
          ]);
        });
    };
    getSightings();
  }, [sightings]);

  return (
    <>
      {/* Parent div: sightings-div */}
      <AddSightingForm
        sightings={sightings}
        setSightings={setSightings}
        newSighting={newSighting}
        setNewSighting={setNewSighting}
        addSighting={addSighting}
      />
      <div className="cards-div">
        <h3>Sightings</h3>
        <div className="health-filter-div">
          <input
            type="checkbox"
            value={healthFilter}
            onChange={() => setHealthFilter(!healthFilter)}
          />{" "}
          <strong> Filter by Health Status </strong>
        </div>
        <ul>
          {healthFilter === true
            ? sightings
                .filter((s) => s.healthStatus === true)
                .map((sighting, ind) => {
                  return (
                    <li key={ind} className="cards">
                      id: {sighting.id}
                      <br />
                      location: {sighting.location}
                      <br />
                      individual: {sighting.individual},
                      <br />
                      healthStatus:{" "}
                      {sighting.healthStatus === true ? "true" : "false"}
                    </li>
                  );
                })
            : sightings.map((sighting, ind) => {
                return (
                  <li key={ind} className="cards">
                    id: {sighting.id}
                    <br />
                    location: {sighting.location}
                    <br />
                    individual: {sighting.individual},
                    <br />
                    healthStatus:{" "}
                    {sighting.healthStatus === true ? "true" : "false"}
                  </li>
                );
              })}
        </ul>
      </div>
    </>
  );
};
export default Sightings;
