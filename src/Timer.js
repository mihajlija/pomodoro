import React, { Component } from 'react'
import SetTimer from './SetTimer.js'
import format from './format.js'

class Timer extends Component {
  constructor () {
    super()
    this.state = {
      sessionFlag: true,
      paused: false
    }
    this.timer = 0
  }

  tickTock = () => {
    let time = this.props.app.time

    if (time === 0) {
      this.alarm()
      if (this.state.sessionFlag) {
        this.props.updateTime(this.props.app.break * 60 * 1000)
      } else {
        this.props.updateTime(this.props.app.session * 60 * 1000)
      }
      this.setState({
        sessionFlag: !this.state.sessionFlag
      })
    }
    time = this.props.app.time - 1000
    this.props.updateTime(time)
  }

  alarm = () => {
    this.beep.play()
  }

  startTimer = () => {
    this.props.setRunning(true)
    this.setState({
      pause: false,
      sessionFlag: true
    })
    this.timer = setInterval(this.tickTock, 1000)
  }

  stopTimer = () => {
    this.props.setRunning(false)
    this.setState({
      pause: true
    })
    clearInterval(this.timer)
  }

  resetTimer = () => {
    clearInterval(this.timer)

    this.props.setSession(25)
    this.props.setBreak(5)
    this.beep.pause()
    this.beep.currentTime = 0
    this.setState({
      running: false,
      pause: false
    })
  }

  render () {
    const timeFormat = format(this.props.app.time)
    const minutes = ('0' + timeFormat.m).slice(-2)
    const seconds = ('0' + timeFormat.s).slice(-2)
    return (
      <div>
        <button onClick={this.startTimer}>Start</button>
        <button onClick={this.stopTimer}>Stop</button>
        <button onClick={this.resetTimer}>Reset</button>
        <h1>{minutes} : {seconds}</h1>
        <p>
          {this.state.sessionFlag && this.state.running
            ? 'work bitch'
            : 'chill'}
        </p>
        <audio
          id='beep'
          preload='auto'
          src='https://goo.gl/65cBl1'
          ref={audio => {
            this.beep = audio
          }}
        />
      </div>
    )
  }
}

export default Timer
