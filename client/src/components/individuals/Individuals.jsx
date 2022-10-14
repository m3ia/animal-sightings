import {useEffect, useState} from "react";
import AddIndividualsForm from "./AddIndividualsForm";

const Individuals = () => {
  const [individuals, setIndividuals] = useState([]);
  const [newIndividual, setNewIndividual] = useState({
    nickName: "",
    seenDate: "",
    speciesId: 0,
  });

  // Add Individual
  const addIndividual = async (e) => {
    e.preventDefault();

    const individual = {
      nickName: newIndividual.nickName,
      seenDate: newIndividual.seenDate,
      speciesId: newIndividual.speciesId,
    };

    const res = await fetch("http://localhost:8080/individuals", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // Sent in with the request
      body: JSON.stringify(individual),
    });

    const content = await res.json();
    console.log("content", content);
    setIndividuals([...individuals, content]);
    setNewIndividual({
      nickName: "",
      seenDate: "",
      speciesId: 0,
    });
  };

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
      {/* Parent div: individuals-div */}
      <AddIndividualsForm
        individuals={individuals}
        setIndividuals={setIndividuals}
        newIndividual={newIndividual}
        setNewIndividual={setNewIndividual}
        addIndividual={addIndividual}
      />
      <div className="cards-div">
        <h3>Individuals</h3>
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
