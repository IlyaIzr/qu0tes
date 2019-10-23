import React, {Component} from 'react';
//import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      allimages: [],
      imageUrl: "",
      allHtext: [],
      allBtext: [],
      highText: "",
      bottomText: "",
    };
    this.onClick = this.onClick.bind(this);
  };


 componentDidMount(){
  fetch("https://ilyaizr.github.io/qoutes/jsons/imagesurls.json")
  .then(response => response.json())
  .then(response => {

    const {urls, mobile_Urls} = response;
    if(document.body.clientWidth>window.innerHeight){
      this.setState({allimages: urls})
    }
    else{
      this.setState({allimages: mobile_Urls})
    }

    const randNum = Math.floor(Math.random() * this.state.allimages.length)
    const randMemeImg = this.state.allimages[randNum]
    this.setState({imageUrl: randMemeImg})
  }
  );

  fetch("https://ilyaizr.github.io/qoutes/jsons/texts.json")
  .then(response => response.json())
  .then(response => {
    const {highText} = response
    const {bottomText} = response
    this.setState({allHtext: highText})
    this.setState({allBtext: bottomText})

    const randHNum = Math.floor(Math.random() * this.state.allHtext.length)
    const randHText = this.state.allHtext[randHNum]
    this.setState({highText: randHText})

    const randBNum = Math.floor(Math.random() * this.state.allBtext.length)
    const randBText = this.state.allBtext[randBNum]
    this.setState({bottomText: randBText})
  });

  const canvas = this.refs.canvas;
  const ctx = canvas.getContext("2d");
  const img = this.refs.image;
  let width = document.body.clientWidth*1.01;
  let height = window.innerHeight;

  img.onload = () => {
    ctx.drawImage(img, 0, 0, (width), (height));

    ctx.fillStyle = "lightPink";

    if (width>height){    //PC screens
      ctx.textAlign = "center";
      ctx.font = "5em Courier";
      ctx.fillText(this.state.highText, (width*0.3), (height*0.1), 600);
      ctx.strokeText(this.state.highText, (width*0.3), (height*0.1), 600);

      ctx.fillStyle = "LightBlue";
      ctx.fillText(this.state.bottomText, (width*0.65), (height*0.9), 500);
      ctx.strokeStyle = "black";
      ctx.strokeText(this.state.bottomText, (width*0.65), (height*0.9), 500);
      document.getElementById("button").addEventListener("mouseover", function(event) {
        event.target.style.opacity = "0.6";
        console.log(event.target);
      })
      document.getElementById("button").addEventListener("mouseleave", function(event) {
        event.target.style.opacity = "0.2";
        setTimeout(function() {
          event.target.style.opacity = "0.1";
        }, 1200);
        setTimeout(function() {
          event.target.style.opacity = "0";
        }, 2000)
      }, false)
    }

    else{               //narrow screens
      ctx.font = "7vw Courier";
      ctx.strokeText(this.state.highText, (width*0.1), (height*0.15));
      ctx.fillText(this.state.highText, (width*0.1), (height*0.15));
      ctx.fillStyle = "azure";
      ctx.strokeStyle = "navy";
      ctx.strokeText(this.state.bottomText, (width*0.25), (height*0.9));
      ctx.fillText(this.state.bottomText, (width*0.25), (height*0.9));

      
      let button = document.getElementById("button");
      button.style.right = "0px";
      button.style.top = "20%";
      button.style['border-radius'] = "15px 0px 0px 15px";
      button.style['border-right'] = "transparent";
      button.style.height = "60%";
      button.style.width = "30%";
      button.style.opacity = "0";
    };
  };

  let elem = document.getElementById('toRemove');
  elem.parentNode.removeChild(elem);
  };

  onClick(){    //generating new text and image
    const randNum = Math.floor(Math.random() * this.state.allimages.length);
    const randImg = this.state.allimages[randNum];
    this.setState({ imageUrl: randImg });

    const randHNum = Math.floor(Math.random() * this.state.allHtext.length);
    const randHText = this.state.allHtext[randHNum];
    this.setState({highText: randHText});

    const randBNum = Math.floor(Math.random() * this.state.allBtext.length);
    const randBText = this.state.allBtext[randBNum];
    this.setState({bottomText: randBText});
      if (window.innerWidth<window.innerHeight){
        document.getElementById('button').style.opacity="0.7";
        document.getElementById('button').style['border-color'] = "rgba(255,255,255,0.1)"
      };
  };

  render(){
    let w = document.body.clientWidth
    let h = window.innerHeight*1.01
    //console.log(w)
    //console.log(h)
    return (
      <div className="App">

        <button className="generator" id="button"
          formTarget ="_parent"
          autoFocus ={true}
          onClick={this.onClick}
          >generate
        </button>

        <canvas ref="canvas" width={w} height={h} id="canvas"/>

        <img src={this.state.imageUrl}
          width={w}
          height={h}
          ref="image"
          alt="beau"
          id="toRemove"/>
      </div>
    );
  };
};

export default App;
