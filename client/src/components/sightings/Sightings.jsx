import {useEffect, useState} from "react";
import AddSightingForm from "./AddSightingForm";
import isBefore from "date-fns/isBefore";
import isAfter from "date-fns/isAfter";
import format from "date-fns/format";
import {Form} from "react-bootstrap";

const transformData = (serverSighting) => {
  return {
    id: serverSighting.id,
    location: serverSighting.location,
    date: serverSighting.date_time,
    individualId: serverSighting.individual_id,
    individual: serverSighting.nick_name,
    healthStatus: serverSighting.healthy,
  };
};
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
  const [updatedSighting, setUpdatedSighting] = useState(null);
  const [individuals, setIndividuals] = useState([]);

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
    setSightings([...sightings, transformData(content)]);
    setNewSighting({
      location: "",
      date: "",
      individualId: 0,
      healthStatus: "",
    });
  };

  // Edit Sighting
  const clickEdit = (sighting) => {
    console.log("sighting: ", sighting);
    setUpdatedSighting({...sighting});
  };

  const editSighting = async (e, id) => {
    console.log(1);
    e.preventDefault();

    console.log(2);
    const rawRes = await fetch(`http://localhost:8080/sightings/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSighting),
    });
    console.log(3);
    const content = await rawRes.json();

    console.log(4);
    setSightings(content.map(transformData));
    console.log(5);
    setUpdatedSighting(null);
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
                    individualId: sighting.individual_id,
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
                    individualId: sighting.individual_id,
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
                    individualId: sighting.individual_id,
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
                  individualId: sighting.individual_id,
                  individual: sighting.nick_name,
                  healthStatus: sighting.healthy,
                };
              }),
            ]);
          }
        });
    };
    getSightings();
  }, [healthFilter, startDateFilter, endDateFilter]);

  // Get Individual
  useEffect(() => {
    const getIndividuals = async () => {
      await fetch("http://localhost:8080/individuals")
        .then((res) => res.json())
        .then((res) => {
          setIndividuals(() => [
            ...res.map((individual) => {
              return {
                id: individual.id,
                nickName: individual.nick_name,
                seenDate: individual.seen_on,
                speciesId: individual.species_id,
              };
            }),
          ]);
        });
    };
    getIndividuals();
  }, []);
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
            <strong>Filter By Date:</strong>
            <br />
            <label>
              Starting Date:
              <input
                type="date"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
              />
            </label>
            <br />
            <label>
              Ending Date:
              <input
                type="date"
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
              />
            </label>
          </div>
        </div>
        {/* Sightings Table */}
        <div className="table-div">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Sighting Date</th>
                <th scope="col">Location</th>
                <th scope="col">Individual</th>
                <th scope="col">Health Status</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            {sightings.map((sighting, ind) => {
              return (
                <tbody key={ind}>
                  {updatedSighting !== null &&
                  updatedSighting.id === sighting.id ? (
                    <tr key={ind}>
                      <td>{sighting.id}</td>
                      <td>
                        <input
                          type="date"
                          id="add-date"
                          value={updatedSighting.date}
                          onChange={(e) => {
                            setUpdatedSighting((prev) => ({
                              ...prev,
                              date: format(
                                new Date(e.target.value),
                                "yyyy-MM-dd"
                              ),
                            }));
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="add-location"
                          value={updatedSighting.location || ""}
                          placeholder="Add location"
                          onChange={(e) =>
                            updatedSighting((prev) => ({
                              ...prev,
                              location: e.target.value,
                            }))
                          }
                        />
                      </td>
                      <td>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e) =>
                            setUpdatedSighting((prev) => ({
                              ...prev,
                              individualId: parseInt(e.target.value),
                            }))
                          }>
                          <option>Select Individual Name</option>
                          {individuals.map((individual) => {
                            return (
                              <option
                                key={individual.id}
                                value={individual.id}
                                name={individual.id}>
                                {individual.nickName}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="add-health-status"
                          value={updatedSighting.healthStatus}
                          onChange={(e) =>
                            setUpdatedSighting((prev) => ({
                              ...prev,
                              healthStatus: e.target.value,
                            }))
                          }
                        />
                      </td>
                      <td>
                        <button onClick={() => setUpdatedSighting(null)}>
                          <span className="material-symbols-outlined">
                            cancel
                          </span>
                        </button>
                      </td>
                      <td>
                        <button
                          type="submit"
                          onClick={(e) => {
                            editSighting(e, sighting.id);
                          }}>
                          <span className="material-symbols-outlined">
                            save
                          </span>
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={ind}>
                      <td>{sighting.id}</td>
                      <td>{sighting.date}</td>
                      <td>{sighting.location}</td>
                      <td>{sighting.individual}</td>
                      <td>
                        {sighting.healthStatus === true ? "true" : "false"}
                      </td>
                      <td>
                        <span
                          className="material-icons"
                          onClick={() => clickEdit(sighting)}>
                          edit
                        </span>
                      </td>
                      <td>
                        <span className="material-icons">delete</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};
export default Sightings;
