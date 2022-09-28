import {useEffect, useState} from "react";
import AddIndividualsForm from "./AddIndividualsForm";

const Individuals = () => {
  const [individuals, setIndividuals] = useState([]);
  const [individual, setIndividual] = useState({
    nickName: "",
    seenDate: "",
    speciesId: 0,
  });

  // Add Individual
  // const addSighting = async (e) => {
  //   e.preventDefault();

  //   const individual = {
  //     nickName: "",
  //     seenDate: "",
  //     speciesId: 0,
  //     location: newSighting.location,
  //     date: newSighting.date,
  //     individualId: newSighting.individualId,
  //     healthStatus: newSighting.healthStatus,
  //   };

  // const res = await fetch("http://localhost:8080/sightings", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   // Sent in with the request
  //   body: JSON.stringify(sighting),
  // });

  //   const content = await res.json();
  //   console.log("content", content);
  //   setIndividuals([...sightings, content]);
  //   setNewSighting({
  //     location: "",
  //     date: "",
  //     individualId: 0,
  //     healthStatus: "",
  //   });
  // };

  // Get Individuals
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
                speciesName: individual.scientific_name,
              };
            }),
          ]);
        });
    };
    getIndividuals();
  }, [individuals]);

  return (
    <>
      {/* Parent div: sightings-div */}
      <AddIndividualsForm
      // sightings={sightings}
      // setSightings={setSightings}
      // newSighting={newSighting}
      // setNewSighting={setNewSighting}
      // addSighting={addSighting}
      />
      <div className="cards-div">
        <ul>
          {individuals.map((individual, ind) => {
            return (
              <li key={ind} className="cards">
                Individual ID: {individual.id}
                <br />
                Individual Nickname: {individual.nickName}
                <br />
                Seen Date: {individual.seenDate},
                <br />
                Species: {individual.speciesName}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default Individuals;
