import {useEffect, useState} from "react";
import AddSightingForm from "./AddSightingForm";

const Sightings = () => {
  const [sightings, setSightings] = useState([]);
  const [newSighting, setNewSighting] = useState({
    id: "",
    location: "",
    date: "",
    individual: "",
    healthStatus: "",
  });

  // Add Sighting
  const addSighting = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhocalhost:8080/sightings", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSighting),
    });
    const content = await res.json();

    setSightings([...sightings, content]);
    setNewSighting({
      id: "",
      location: "",
      date: "",
      individual: "",
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
  }, []);

  return (
    <>
      <AddSightingForm
        sightings={sightings}
        setSightings={setSightings}
        newSighting={newSighting}
        setNewSighting={setNewSighting}
        addSighting={addSighting}
      />
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
              healthStatus: {sighting.healthStatus === true ? "true" : "false"}
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Sightings;
