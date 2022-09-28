import {useState, useEffect} from "react";
import {Button, Modal, Form} from "react-bootstrap";

function FormModal(props) {
  // Get Individuals
  useEffect(() => {
    const getIndividuals = async () => {
      await fetch("http://localhost:8080/individuals")
        .then((res) => res.json())
        .then((res) => {
          props.setIndividuals(() => [
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a New Sighting
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Sighting Form</h4>
        <form
          id="add-sighting"
          action="#"
          onSubmit={() => props.addSighting(props.newSighting)}>
          <fieldset>
            <p>
              <label>Date</label>
              <br />
              <input
                type="date"
                id="add-date"
                value={props.newSighting.date}
                onChange={(e) =>
                  props.setNewSighting((prev) => (prev.date = e.target.value))
                }
              />
            </p>
            <p>
              <label>Individual</label>
              <br />
              <Form.Select aria-label="Default select example">
                <option>Individual</option>
                {props.individuals.map((individual) => {
                  return (
                    <option
                      key={individual.id}
                      value={props.newSighting.individual}
                      onSelect={(e) =>
                        props.setNewSighting(
                          (prev) => (prev.individual = e.target.value)
                        )
                      }>
                      {individual.nickName}
                    </option>
                  );
                })}
              </Form.Select>
            </p>
            <p>
              <label>Location</label>
              <br />
              <input
                type="text"
                id="add-location"
                value={props.newSighting.location}
                onChange={(e) =>
                  props.setNewSighting(
                    (prev) => (prev.location = e.target.value)
                  )
                }
              />
            </p>
            <p>
              <label>Health Status</label>
              <br />
              <input
                type="bool"
                id="add-health-status"
                value={props.newSighting.healthStatus}
                onChange={(e) =>
                  props.setNewSighting(
                    (prev) => (prev.healthStatus = e.target.value)
                  )
                }
              />
            </p>
          </fieldset>
          <input type="submit" value="Add" />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function AddSightingForm({
  sightings,
  setSightings,
  newSighting,
  setNewSighting,
  addSighting,
}) {
  const [modalShow, setModalShow] = useState(false);
  const [individuals, setIndividuals] = useState([]);
  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <FormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        newSighting={newSighting}
        setNewSighting={setNewSighting}
        addSighting={addSighting}
        individuals={individuals}
        setIndividuals={setIndividuals}
      />
    </>
  );
}

export default AddSightingForm;
