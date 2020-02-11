import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      minSet: 25,
      minClock: 25,
      secClock: "00",
      secCal: 0,
      minCal: 25,
      break: 5,
      iconState: 1,
      iconId: "fa fa-play",
      title: "Session"
    }

    this.buttonState = true;
    this.clickLeftBreak = this.clickLeftBreak.bind(this);
    this.clickRightBreak = this.clickRightBreak.bind(this);
    this.clickLeftSession = this.clickLeftSession.bind(this);
    this.clickRightSession = this.clickRightSession.bind(this);
    this.clickPlay = this.clickPlay.bind(this);
    this.clickReset = this.clickReset.bind(this);
  }

  clickLeftBreak() {
    if (this.buttonState) {
      let num = this.state.break;
      num--;
      if (num <= 1) num = 1;
      this.setState({
        break: num
      })
    }
  }

  clickRightBreak() {
    if (this.buttonState) {
      let num = this.state.break;
      num++;
      if (num >= 10) num = 10;
      this.setState({
        break: num
      })
    }
  }

  clickLeftSession() {
    if (this.buttonState) {
      let num = this.state.minCal;
      let numSt
      num--;
      if (num <= 1) num = 1;
      numSt = `${num}`;
      if (num < 10) numSt = `0${num}`;
      this.setState({
        minSet: numSt,
        minClock: numSt,
        minCal: num,
      })
    }
  }

  clickRightSession() {
    if (this.buttonState) {
      let num = this.state.minCal;
      let numSt
      num++;
      if (num >= 60) num = 60;
      numSt = `${num}`;
      if (num < 10) numSt = `0${num}`;
      this.setState({
        minSet: numSt,
        minClock: numSt,
        minCal: num,
      })
    }
  }

  clickPlay() {
    this.changeIcon()
    console.log("play")
    console.log(this.state.iconId)
  }

  getsec() {
    let sec = this.state.secCal;
    let min = this.state.minCal;
    let secStr;
    let minStr;
    sec--;

    if (sec < 0) {
      if (min > 0) min--;
      sec = 59;
    }

    if (sec < 10) {
      secStr = `0${sec}`
    } else secStr = sec
    if (min < 10) {
      minStr = `0${min}`
    } else minStr = min
    this.setState({
      secClock: secStr,
      minClock: minStr,
      secCal: sec,
      minCal: min
    })
    if (sec === 0 && min === 0) {
      clearInterval(this.secID)
      this.playAudio();
      this.breakTime();
      console.log("getSec minclock: " + this.state.minClock)
      return
    }
  }

  timeStart() {
    this.secID = setInterval(() => {
      this.getsec()
    }, 1000);
  }

  timeStop() {
    clearInterval(this.secID);
    clearInterval(this.alarmID);
  }

  changeIcon() {
    let icon = this.state.iconState;
    icon = (icon + 1) % 2
    console.log(icon)
    this.setState({
      iconState: icon
    })
    switch (icon) {
      case 1:
        this.setState({
          iconId: "fa fa-play"
        })
        this.timeStop();
        this.buttonState = true;
        return
      case 0:
        this.setState({
          iconId: "fa fa-pause"
        })
        this.timeStart();
        this.buttonState = false;
        return
    }
  }

  clickReset() {
    this.setState({
      minSet: 25,
      minClock: 25,
      secClock: "00",
      secCal: 0,
      minCal: 25,
      break: 5,
      iconState: 1,
      iconId: "fa fa-play",
      title: "Session"
    })
    this.timeStop();
    this.buttonState = true;
  }

  playAudio() {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play()
  }

  breakTime() {
    let num = this.state.break;
    if (this.state.break < 10) num = `0${this.state.break}`
    this.setState({
      secCal: 0,
      minCal: this.state.break,
      minClock: num,
      title: "Break"
    })
    console.log(this.state.minClock)
    console.log(this.state.break)
    console.log("minclock" + this.state.minClock)
    this.timeStart()
  }

  render() {
    return (
      <div className="App">
        <div className="pomodoro-label">Pomodoro Clock</div>
        <div className="circle1">
          <div className="circle2">
            <div className="circle3">
              <div className="text-label">{this.state.title}</div>
              <div className="timer-label"> {this.state.minClock} : {this.state.secClock}</div>
            </div>
          </div>
        </div>

        <div className="setbutton-box">
          {/* -------------------break---------------*/}
          <div className="break-label">
            <div className="break-text-label"> Break Length</div>
            <div className="button-box">
              <div onClick={this.clickLeftBreak} className="cursor"> <i className="fa fa-arrow-left" aria-hidden="true"></i> </div>
              <div> {this.state.break} </div>
              <div onClick={this.clickRightBreak} className="cursor"> <i className="fa fa-arrow-right" aria-hidden="true"></i> </div>
            </div>
          </div>

          {/* -------------------session---------------*/}
          <div className="break-label">
            <div className="break-text-label"> Session Length</div>
            <div className="button-box">
              <div onClick={this.clickLeftSession} className="cursor" > <i className="fa fa-arrow-left" aria-hidden="true"></i> </div>
              <div> {this.state.minSet} </div>
              <div onClick={this.clickRightSession} className="cursor"> <i className="fa fa-arrow-right" aria-hidden="true"></i> </div>
            </div>
          </div>
        </div>

        <div className="active-box">
          <div className="circle-button" onClick={this.clickPlay}>
            <div className="cursor" ><i className={this.state.iconId} aria-hidden="true"></i></div>
          </div>

          <div className="circle-button" onClick={this.clickReset}>
            <div className="cursor"><i className="fa fa-repeat" aria-hidden="true"></i></div>
          </div>
        </div>

        <div>
          <audio className="audio-element">
            <source src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3"></source>
          </audio>
        </div>
      </div>
    )
  }
}
export default App;