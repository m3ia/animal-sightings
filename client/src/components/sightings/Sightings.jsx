import {useEffect, useState} from "react";
import AddSightingForm from "./AddSightingForm";

const Sightings = () => {
  const [sightings, setSightings] = useState([]);
  const [newSighting, setNewSighting] = useState({
    id: "",
    location: "",
    date: "",
    individualId: 0,
    healthStatus: "",
  });

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
      <AddSightingForm
        sightings={sightings}
        setSightings={setSightings}
        newSighting={newSighting}
        setNewSighting={setNewSighting}
        addSighting={addSighting}
      />
      <div className="cards-div">
        <ul>
          {sightings.map((sighting, ind) => {
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
