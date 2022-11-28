import { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import MovieCard from "./components/MovieCard";
import MovieForm from "./components/MovieForm";

//we use state because we'll have input field. So we change the function component to class component

class App extends Component {
  state = {
    selectedMovieTitle: "Doctor Strange",
  };

  changeSelectedMovieTitle = (newMovieTitle) => {
    this.setState({
      selectedMovieTitle: newMovieTitle,
    });
  };
  render() {
    return (
      <div className="App">
        <Container>
          <Row className="justify-content-center mt-4">
            <Col xs={12} md={6}>
              <h1>Movie Info App!</h1>
              <MovieForm
                selectedMovieTitle={this.state.selectedMovieTitle}
                changeSelectedMovieTitle={this.changeSelectedMovieTitle}
              />
            </Col>
          </Row>
          <Row className="justify-content-center mt-4">
            <Col xs={12} md={6}>
              <MovieCard selectedMovieTitle={this.state.selectedMovieTitle} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
