import React, { Component } from 'react';
import ImageCard from "./components/ImageCard";
import Wrapper from "./components/Wrapper";
import defaultImages from "./images.json";
import './App.css';
import PointCounter from './components/PointCounter';
// https://aqueous-fjord-27825.herokuapp.com/

class App extends Component {

  state = {
    images: defaultImages,
    score: 0,
    topScore: 0
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

  win = () => {
    var {score} = this.state
    if (score >= 12) {
      alert("You beat the game! good job, fool.");
      this.setState({score: "You Win!"});
      this.reset();
    }
  }

  topScore = () => {
    var {score, topScore} = this.state;
    if (score > topScore) {
      this.setState({topScore: score});
    }
    else if (score < topScore) {
      this.setState({topScore: topScore});
    }
    else if (topScore > 11) {
      this.setState({topScore: 12});
    }
  }

  reset = () => {
    const {images} = this.state;
    images.forEach(image => {
      image.clickedOn = false;
    });
    this.setState({images: images, score: 0});
  }

  correct = (id) => {
    var {images, score} = this.state;
    if (score > 12) {
      this.win(); 
    }
    else {
      images[id].clickedOn = true
      this.setState({images: images, score: score+1, topScore: score+1});
      this.topScore();
    }
  }

  incorrect = () => {
      alert("You clicked the same one twice!");
      this.reset();
  }


  counter = (id) => {
    var {images} = this.state;
    if (images[id].clickedOn) {
      this.incorrect(id);
    }
    else {
      this.correct(id);
      this.win();
    }
    this.shuffle();
  }

  componentDidMount = () => {
    this.shuffle();
    this.topScore();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clicky Brew Game</h1>
          <PointCounter score={this.state.score} topScore={this.state.topScore}/>
        </header>
        <p className="App-intro">
          Game Rules: <br/>
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
        <footer className="footer">
          <div className="container">
            <p className="footer-tag"><a href="https://www.github.com/brianclauzel/clicky/">© 2018 Brian Clauzel</a></p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
