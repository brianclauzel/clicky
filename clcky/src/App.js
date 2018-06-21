import React, { Component } from 'react';
import ImageCard from "./components/ImageCard";
import Wrapper from "./components/Wrapper";
import images from "./images.json";
import './App.css';
import PointCounter from './components/PointCounter';

class App extends Component {

  state = {
    images,
    score: "0",
    topScore: "0"
  };

  randomize = image => {
    const images = this.state.images[Math.floor(image * Math.random())];
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clicky Brew Game</h1>
          <PointCounter />
        </header>
        <p className="App-intro">
          Click as many images as you can to gain points, but you can only click each one once.
        </p>
        <Wrapper>
        {this.state.images.map(image => (
          <ImageCard
            randomize={this.randomize}
            id={image.id}
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
