import React, { Component } from "react";

class MemeGenerator extends Component {
  state = {
    topText: "",
    bottomText: "",
    randomImg: "http://i.imgflip.com/1bij.jpg",
    allMemeImgs: []
  };

  /**
   * API call to "https://api.imgflip.com/get_memes"
   * Turn data to json file
   * Extract memes from array and save to allMemeImgs
   */
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  /**
   * On handleChange:
   * pull name and value from event.target
   * then check and see if name and value are equal
   */
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    // get a random int (index in the array)
    // get the meme from that index
    // set `randomImg` to the `.url` of the random item I grabbed
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    //console.log(randNum);
    const randImgMeme = this.state.allMemeImgs[randNum].url;
    this.setState({ randomImg: randImgMeme });
  };

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.topText}
            name="topText"
            placeholder="Top Text"
            onChange={this.handleChange}
          />
          <br />
          <input
            type="text"
            value={this.state.bottomText}
            name="bottomText"
            placeholder="Bottom Text"
            onChange={this.handleChange}
          />

          <button>Gen</button>
        </form>

        {/**--DISPLAY INFORMATION-- */}
        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
