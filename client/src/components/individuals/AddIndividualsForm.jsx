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
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton onClick={props.onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a New Sighting
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Sighting Form</h4>
        <form id="add-sighting" action="#">
          <fieldset>
            <p>
              <label>Date</label>
              <br />
              <input
                type="date"
                id="add-date"
                value={props.newSighting.date}
                onChange={(e) => {
                  props.setNewSighting((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }));
                }}
              />
            </p>
            <p>
              <label>Individual</label>
              <br />
              <Form.Select
                aria-label="Default select example"
                onChange={(e) =>
                  props.setNewSighting((prev) => ({
                    ...prev,
                    individualId: parseInt(e.target.value),
                  }))
                }>
                <option>Select Individual Name</option>
                {props.individuals.map((individual) => {
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
            </p>
            <p>
              <label>Location</label>
              <br />
              <input
                type="text"
                id="add-location"
                value={props.newSighting.location || ""}
                onChange={(e) =>
                  props.setNewSighting((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
              />
            </p>
            <p>
              <label>Health Status</label>
              <br />
              <input
                type="text"
                id="add-health-status"
                value={props.newSighting.healthStatus || ""}
                onChange={(e) =>
                  props.setNewSighting((prev) => ({
                    ...prev,
                    healthStatus: e.target.value,
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
            props.addSighting(e);
            props.onHide();
          }}>
          {" "}
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function AddIndividualsForm() {
  const [modalShow, setModalShow] = useState(false);
  const [individuals, setIndividuals] = useState([]);

  // Get Individuals
  // useEffect(() => {
  //   const getIndividuals = async () => {
  //     await fetch("http://localhost:8080/individuals")
  //       .then((res) => res.json())
  //       .then((res) => {
  //         props.setIndividuals(() => [
  //           ...res.map((individual) => {
  //             return {
  //               id: individual.id,
  //               nickName: individual.nick_name,
  //               seenDate: individual.seen_on,
  //               speciesId: individual.species_id,
  //             };
  //           }),
  //         ]);
  //       });
  //   };
  //   getIndividuals();
  // }, []);

  return (
    <>
      <div className="individuals-form-div">
        <Form>
          <Form.Group className="mb-3" controlId="formNickName">
            <Form.Label>Nick Name</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSeenDate">
            <Form.Label>Date Seen</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSpecies">
            <Form.Label>Species</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      {/* <Button
        variant="primary"
        onClick={() => setModalShow(true)}
        className="launch-modal-btn">
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
      /> */}
    </>
  );
}

export default AddIndividualsForm;
