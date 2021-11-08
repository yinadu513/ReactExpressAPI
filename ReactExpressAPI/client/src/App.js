import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import ImgMain from "./components/ImgMain";
import ImgThumbnail from "./components/ImgThumbnail";

class App extends Component {
  state = {
    ImgData: [],
    counter: 0,
    imgInDisplay: [],
    gallerySize: 4,
    imgInCart: [],
  };

  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const response = await fetch("/api");
    let fetchedData = await response.json();
    this.setState({
      ImgData: fetchedData,
      imgInDisplay: fetchedData.slice(0, this.state.gallerySize),
    });
  };

  onClickPrevious = () => {
    if (this.state.counter > 0) {
      let AddImg =
        this.state.ImgData[
          this.state.ImgData.indexOf(this.state.imgInDisplay[0]) - 1
        ];
      if (AddImg) {
        this.state.imgInDisplay.pop();
        this.state.imgInDisplay.unshift(AddImg);
      }
      this.state.counter--;
      this.setState({ counter: this.state.counter });
      this.setState({ imgInDisplay: this.state.imgInDisplay });
    }
  };

  onClickNext = () => {
    if (this.state.counter < this.state.ImgData.length - 1) {
      let AddImg =
        this.state.ImgData[
          this.state.ImgData.indexOf(
            this.state.imgInDisplay[this.state.imgInDisplay.length - 1]
          ) + 1
        ];
      if (AddImg) {
        this.state.imgInDisplay.shift();
        this.state.imgInDisplay.push(AddImg);
      }
      this.state.counter++;
      this.setState({ counter: this.state.counter });
      this.setState({ imgInDisplay: this.state.imgInDisplay });
    }
  };

  handleAdd = (imgId) => {
    let checkImg = this.state.imgInCart.findIndex((i) => i.id === imgId);
    if (checkImg === -1) {
      let addImg = this.state.ImgData.find((i) => i.id === imgId);
      this.state.imgInCart = [...this.state.imgInCart, ...[addImg]];
      this.setState({ imgInCart: this.state.imgInCart });
    }
  };

  handleRemove = (imgId) => {
    let checkImg = this.state.imgInCart.findIndex((i) => i.id === imgId);
    if (checkImg !== -1) {
      this.state.imgInCart.splice(checkImg, 1);
      this.setState({ imgInCart: this.state.imgInCart });
    }
  };

  handlethmbnailClick = (imgId) => {
    this.setState({
      counter: this.state.ImgData.findIndex((i) => i.id === imgId),
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar imgInCart={this.state.imgInCart} />
        <div className="targetImgStyle p-4">
          <div className="center-block">
            {this.state.ImgData.length > 0 && (
              <ImgMain
                targetImg={this.state.ImgData[this.state.counter]}
                onhandleAdd={this.handleAdd}
                onhandleRemove={this.handleRemove}
                imgInCart={
                  this.state.imgInCart.indexOf(
                    this.state.ImgData[this.state.counter]
                  ) !== -1
                }
              />
            )}
          </div>
        </div>
        <div className="container">
          <div className="row align-items-center border mt-1">
            <div className="col-sm-2 p-2">
              {this.state.ImgData.length > this.state.gallerySize &&
                this.state.counter > 0 && (
                  <a className="btn previous">
                    <img
                      src="/previous.png"
                      alt="Pervious"
                      onClick={this.onClickPrevious}
                    />
                  </a>
                )}
            </div>
            {this.state.ImgData.length > 0 &&
              this.state.imgInDisplay.map((i) => (
                <div className="col-lg-2 p-2" key={i.id}>
                  <ImgThumbnail
                    targetImg={i}
                    selected={this.state.ImgData[this.state.counter] === i}
                    onhandleClick={this.handlethmbnailClick}
                    alt="thumbnail"
                  />
                </div>
              ))}
            <div className="col-sm-2 p-2">
              {this.state.ImgData.length > this.state.gallerySize &&
                this.state.counter < this.state.ImgData.length - 1 && (
                  <a className="btn next">
                    <img
                      src="/next.png"
                      alt="Next"
                      onClick={this.onClickNext}
                    />
                  </a>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
