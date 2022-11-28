//because movieCard is a component that will be in charge of fetching
import { Component } from "react";
import { Card, Spinner } from "react-bootstrap";
//data from the omdbAPI, this already tells me that MovieCard needs to be
//created as a Class Component

class MovieCard extends Component {
  //this.props.selectedMovieTitle is the movie chosen in dropdown menu

  //every time you fetch something from the internet and  you need your interface
  //to use it, put it into the statE: after setState your interface will render
  //again to show the dew data
  state = {
    selectedMovieObject: null,
    isLoading: true,
    //null is the perfect initial value for an OBJECT STATE PROPERT!!!!
  };

  componentDidMount() {
    //stuff lauched inside componentDidMont will execute one time upon launch!
    this.fetchMovieData();
  }

  fetchMovieData = async () => {
    try {
      let response = await fetch(
        "http://www.omdbapi.com/?apikey=d54c1d6b&s=" +
          this.props.selectedMovieTitle
      );
      console.log(response);
      if (response.ok) {
        let data = await response.json();
        let chosenMovieInfo = data.Search[0];
        console.log("chosen movie info:", chosenMovieInfo);
        this.setState({
          selectedMovieObject: chosenMovieInfo,
          isLoading: false,
        });
      } else {
        console.log("Something went wrong :(");
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div>
        {/* if we don't use ternary operator here, the page will be broken, because selectedMovieObject is null for start */}
        {this.state.isLoading ? (
          <Spinner animation="border" variant="warning" />
        ) : (
          <Card>
            <Card.Img
              variant="top"
              src={this.state.selectedMovieObject.Poster}
            />
            <Card.Body>
              <Card.Title>{this.state.selectedMovieObject.Title}</Card.Title>
              <Card.Text>
                {this.state.selectedMovieObject.Year} -{" "}
                {this.state.selectedMovieObject.imdbID}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

export default MovieCard;
