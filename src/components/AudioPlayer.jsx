import React from "react";
import ReactDOM from "react-dom";

import WaveSurfer from 'wavesurfer.js';
import { FiPauseCircle, FiPlayCircle } from "react-icons/fi";
import { IconContext } from "react-icons";

class AudioPlayer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      playing: false,
      notPlayedYet: true,
      loading: true,
    }
    this.togglePlay = this.togglePlay.bind(this)
  }

  componentDidMount() {
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.wave')
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      barWidth: 6,
      barRadius: 4,
      cursorWidth: 0,
      height: "64",
      normalize: true,
      responsive: true,
      progressColor: "#808080",
      waveColor: "#80808080",
    })
    this.wavesurfer.load(this.props.src)
    this.wavesurfer.on('play', ()=>{ this.setState({playing: true}) })
    this.wavesurfer.on('pause', ()=>{ this.setState({playing: false}) })
  }

  togglePlay() {
    this.setState({notPlayedYet: false})
    this.wavesurfer.playPause();
  }

  render() {
    return (
      <div>
        <div className="opacity-75 mb-2">{this.props.name}</div>
        <div className="flex items-center gap-8">
          <IconContext.Provider value={{ size: "2em" }}>
            <button className="text-primary cursor-pointer" onClick={this.togglePlay}>
              { this.state.playing ? <FiPauseCircle/> : <FiPlayCircle/> }
            </button>
            <div className='waveform w-full transition-opacity duration-200' style={{
              opacity: (!this.state.playing && !this.state.notPlayedYet) ? "0.5" : "1",
            }}>
              <div className='wave'></div>
            </div>
          </IconContext.Provider>
        </div>
      </div>
    );
  }
}

AudioPlayer.defaultProps = {
  src: "",
  name: "Audio"
}

export {AudioPlayer};