import {useState, useEffect} from "react";
import {Button, Modal, Form} from "react-bootstrap";

function FormModal(props) {
  // Get Species for selection
  useEffect(() => {
    const getSpecies = async () => {
      await fetch("http://localhost:8080/species")
        .then((res) => res.json())
        .then((res) => {
          props.setSpecies(() => [
            ...res.map((s) => {
              return {
                id: s.id,
                commonName: s.common_name,
                scientificName: s.scientific_name,
              };
            }),
          ]);
        });
    };
    getSpecies();
  }, []);

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton onClick={props.onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a New Individual
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Individual Form</h4>
        <form id="add-individual" action="#">
          <fieldset>
            <p>
              <label>Nick Name</label>
              <br />
              <input
                type="text"
                id="add-individual-nickname"
                value={props.newIndividual.nickName}
                onChange={(e) => {
                  props.setNewIndividual((prev) => ({
                    ...prev,
                    nickName: e.target.value,
                  }));
                }}
              />
            </p>
            <p>
              <label>Species</label>
              <br />
              <Form.Select
                aria-label="Default select example"
                onChange={(e) =>
                  props.setNewIndividual((prev) => ({
                    ...prev,
                    speciesId: parseInt(e.target.value),
                  }))
                }>
                <option>Select Species Type</option>
                {props.species.map((s) => {
                  return (
                    <option key={s.id} value={s.id} name={s.id}>
                      {s.commonName} ({s.scientificName})
                    </option>
                  );
                })}
              </Form.Select>
            </p>
            <p>
              <label>Last Date Seen</label>
              <br />
              <input
                type="date"
                id="add-individual-date-seen"
                value={props.newIndividual.seenDate}
                onChange={(e) =>
                  props.setNewIndividual((prev) => ({
                    ...prev,
                    seenDate: e.target.value,
                  }))
                }
              />
            </p>
          </fieldset>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={props.onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            props.addIndividual(e);
            props.onHide();
          }}>
          {" "}
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function AddIndividualsForm({
  individuals,
  setIndividuals,
  newIndividual,
  setNewIndividual,
  addIndividual,
}) {
  const [modalShow, setModalShow] = useState(false);
  const [species, setSpecies] = useState([]);

  return (
    <>
      <div className="individuals-form-div"></div>
      <Button
        variant="primary"
        onClick={() => setModalShow(true)}
        className="launch-modal-btn">
        Launch vertically centered modal
      </Button>

      <FormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        newIndividual={newIndividual}
        setNewIndividual={setNewIndividual}
        addIndividual={addIndividual}
        species={species}
        setSpecies={setSpecies}
      />
    </>
  );
}

export default AddIndividualsForm;
