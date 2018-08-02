import React, { Component } from 'react'
import { formatTime, minutesToMs } from './format.js'

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
        this.props.updateTime(minutesToMs(this.props.app.break))
      } else {
        this.props.updateTime(minutesToMs(this.props.app.session))
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
    if (!this.props.app.running) {
      this.props.setRunning(true)
      this.timer = setInterval(this.tickTock, 1000)
    }
  }

  stopTimer = () => {
    if (!this.props.app.paused && this.props.app.running) {
      this.props.setRunning(false)
      clearInterval(this.timer)
    }
  }

  startStop = () => {
    !this.props.app.running ? this.startTimer() : this.stopTimer()
  }

  resetTimer = () => {
    clearInterval(this.timer)
    this.beep.pause()
    this.beep.currentTime = 0
    this.props.reset()
  }

  render () {
    const timeFormat = formatTime(this.props.app.time)
    const minutes = ('0' + timeFormat.m).slice(-2)
    const seconds = ('0' + timeFormat.s).slice(-2)
    const focus = this.props.app.running && this.state.sessionFlag
    const chill = this.props.app.running && !this.state.sessionFlag
    const paused = !this.props.app.running && this.props.app.paused

    return (
      <div className='timer'>
        <div
          className={
            focus ? 'countdown focus' : chill ? 'countdown chill' : 'countdown'
          }
        >
          <p className='prompt'>
            {focus ? 'focus' : chill ? 'chill' : paused ? 'paused' : ''}
          </p>
          <h1>
            {minutes}:{seconds}
          </h1>
          <div
            className={
              focus
                ? 'play play-focus paused'
                : chill
                    ? 'play play-chill paused'
                    : !this.props.app.running ? 'play' : 'play paused'
            }
            onClick={this.startStop}
          />
        </div>
        <div>
          <button onClick={this.resetTimer}>↺</button>
        </div>
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
