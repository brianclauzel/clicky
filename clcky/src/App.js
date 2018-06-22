import React, { Component } from 'react';
import ImageCard from "./components/ImageCard";
import Wrapper from "./components/Wrapper";
import defaultImages from "./images.json";
import './App.css';
import PointCounter from './components/PointCounter';

class App extends Component {

  state = {
    images: defaultImages,
    score: 0,
    topScore: 0,
    clickedOnArray: []
  };

  shuffle = () => {
    var images = this.state.images;
    var m = images.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = images[m];
      images[m] = images[i];
      images[i] = t;
    }
    this.setState({images: images});
  }

  reset = () => {
    const {images} = this.state;
    // loop over images and set isClicked to false
    images.forEach(image => {
      image.clickedOn = false;
    });
    this.setState({images: images, score: 0, });
  }

  correct = (id) => {
    var {images, score, topScore} = this.state;
    if (score > 11) {
      alert("You beat the game! good job, fool.");
      this.reset();
    }
    else {
      images[id].clickedOn = true
      this.setState({images: images, score: score+1});
    }
  }

  incorrect = (id) => {
    console.log("you lost, please play again");
      alert("You clicked the same one twice!");
      this.reset();
  }


  counter = (id) => {
    var {images, score, topScore} = this.state;
    if (images[id].clickedOn) {
      this.incorrect(id);
    }
    else {
      this.correct(id);
    }
    this.shuffle();
  }

  componentDidMount = () => {
    this.shuffle();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clicky Brew Game</h1>
          <PointCounter score={this.state.score} topScore={this.state.topScore}/>
        </header>
        <p className="App-intro">
          Click as many images as you can to gain points, but you can only click each one once.
        </p>
        <Wrapper>
        {this.state.images.map((image, i) =>   (
          <ImageCard
            counter={this.counter}
            id={i}
            key={image.id}
            name={image.name}
            image={image.image}
          />
        ))}
        </Wrapper>
      </div>
    );
  }
}

export default App;
