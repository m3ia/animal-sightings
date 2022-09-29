import {useEffect, useState} from "react";
import AddSightingForm from "./AddSightingForm";
import isBefore from "date-fns/isBefore";
import isAfter from "date-fns/isAfter";
import format from "date-fns/format";

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
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
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
          if (healthFilter === true) {
            setSightings(() => [
              ...res
                .map((sighting) => {
                  return {
                    id: sighting.id,
                    location: sighting.location,
                    date: sighting.date_time,
                    individual: sighting.nick_name,
                    healthStatus: sighting.healthy,
                  };
                })
                .filter((s) => s.healthStatus === true),
            ]);
          } else if (startDateFilter !== "") {
            setSightings(() => [
              ...res
                .map((sighting) => {
                  return {
                    id: sighting.id,
                    location: sighting.location,
                    date: sighting.date_time,
                    individual: sighting.nick_name,
                    healthStatus: sighting.healthy,
                  };
                })
                .filter((s) => {
                  let startDate = new Date(startDateFilter);
                  return isBefore(startDate, new Date(s.date));
                }),
            ]);
          } else if (endDateFilter !== "") {
            setSightings(() => [
              ...res
                .map((sighting) => {
                  return {
                    id: sighting.id,
                    location: sighting.location,
                    date: sighting.date_time,
                    individual: sighting.nick_name,
                    healthStatus: sighting.healthy,
                  };
                })
                .filter((s) => {
                  let endDate = new Date(endDateFilter);
                  return isAfter(endDate, new Date(s.date));
                }),
            ]);
          } else {
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
          }
        });
    };
    getSightings();
  }, [sightings, healthFilter, startDateFilter, endDateFilter]);

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
        <div className="filters-div">
          <div className="health-filter-div">
            <input
              type="checkbox"
              value={healthFilter}
              onChange={() => setHealthFilter(!healthFilter)}
            />{" "}
            <strong> Filter by Health Status </strong>
          </div>
          <div className="date-range-filter-div">
            <strong>Filter By Date</strong>
            <input
              type="date"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
            />
            <input
              type="date"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
            />
          </div>
        </div>
        <ul>
          {/* {healthFilter === true
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
                }) */}
          {sightings.map((sighting, ind) => {
            return (
              <li key={ind} className="cards">
                id: {sighting.id}
                <br />
                sighting date: {format(new Date(sighting.date), "MM/dd/yyyy")}
                <br />
                location: {sighting.location}
                <br />
                individual: {sighting.individual.replace(",", "")}
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
