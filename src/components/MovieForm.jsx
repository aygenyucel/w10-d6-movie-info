import { Form } from "react-bootstrap";
function MovieForm(props) {
  return (
    <Form>
      <Form.Group controlId="">
        <Form.Label>Choose your movie here!</Form.Label>
        <Form.Control
          as="select"
          value={props.selectedMovieTitle}
          onChange={(e) => props.changeSelectedMovieTitle(e.target.value)}
          //twp way data binding!
        >
          <option>Doctor Strange</option>
          <option>Ironman</option>
          <option>Black Widow</option>
          <option>The Avengers</option>
          <option>The Hulk</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
}

export default MovieForm;
