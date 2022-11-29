//because movieCard is a component that will be in charge of fetching
// import { Component } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
//data from the omdbAPI, this already tells me that MovieCard needs to be
//created as a Class Component

const MovieCard = (props) => {
  //this.props.selectedMovieTitle is the movie chosen in dropdown menu

  //every time you fetch something from the internet and  you need your interface
  //to use it, put it into the statE: after setState your interface will render
  //again to show the dew data
  // state = {
  //   selectedMovieObject: null,
  //   isLoading: true,
  //   //null is the perfect initial value for an OBJECT STATE PROPERTY!!!!
  // };

  const [selectedMovieObject, setSelectedMovieObject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // componentDidMount() {
  //   //stuff lauched inside componentDidMont will execute one time upon launch!
  //   this.fetchMovieData();
  // }

  useEffect(() => {
    fetchMovieData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //componentDidMount is perfect for fetching data initially, to fill up our
  // component with dynamic content for its initial load

  //when we need an operation like fetch to be re-executed though,
  //we might need to intereact with the updating phase of a component..

  //a component updates whenever a change is detected in its STATE or in its PROPS
  //to intercept these updating phases and inject your own logic into them
  //you need to work with componentDidUpdate, whic is a lifecylce method
  //that is being automatically executed just AFTER the detection of an update

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("MOVIECARD HAS BEEN UPDATED");
  //   console.log("prevProps:", prevProps);
  //   console.log("currentProps:", this.props);
  //   // this.fetchMovieData(); //You can't do that, it gives infinite loop,
  //   //because our function sets state, and thats fired componentDidUpdated again

  //   //what can we do to solve the problem, we can use this
  //   // we^d like this this componentDidUpdate method to be launched in this situation
  //   //whenever the title changes from the props, but not when the state is set!

  //   //every time you use componentDidUpdate, you have to put a constraint!
  //   //you want to pull handbrake
  //   if (prevProps.selectedMovieTitle !== this.props.selectedMovieTitle) {
  //     this.fetchMovieData();
  //     //this if statement launches the fetch function JUST when the selectedMovieTitle
  //     //changes from the props, NOT when the state  is being set one more time
  //   }
  // }

  useEffect(() => {
    fetchMovieData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedMovieTitle]);

  const fetchMovieData = async () => {
    try {
      let response = await fetch(
        "http://www.omdbapi.com/?apikey=d54c1d6b&s=" + props.selectedMovieTitle
      );
      console.log(response);
      if (response.ok) {
        let data = await response.json();
        let chosenMovieInfo = data.Search[0];
        console.log("chosen movie info:", chosenMovieInfo);
        // this.setState({
        //   selectedMovieObject: chosenMovieInfo,
        //   isLoading: false,
        // });
        setSelectedMovieObject(chosenMovieInfo);
        setIsLoading(false);
      } else {
        console.log("Something went wrong :(");
        // this.setState({ isLoading: false });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      // this.setState({ isLoading: false });
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* if we don't use ternary operator here, the page will be broken, because selectedMovieObject is null for start */}
      {isLoading ? (
        <Spinner animation="border" variant="warning" />
      ) : (
        <Card>
          <Card.Img variant="top" src={selectedMovieObject.Poster} />
          <Card.Body>
            <Card.Title>{selectedMovieObject.Title}</Card.Title>
            <Card.Text>
              {selectedMovieObject.Year} - {selectedMovieObject.imdbID}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default MovieCard;
