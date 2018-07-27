import React, { Component } from 'react'
import './App.css'
import Timer from './Timer.js'
import SetTimer from './SetTimer.js'
import format from './format.js'
const sesh = 0.2
const br = 0.5

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      session: sesh,
      break: br,
      sessionFlag: true,
      running: false,
      paused: false,
      time: sesh * 60 * 1000
    }

    this.timer = 0
  }

  setSession = t => {
    if (!this.state.running) {
      this.setState({
        session: t,
        time: t * 60 * 1000
      })
    }
  }

  setBreak = t => {
    this.setState({
      break: t
    })
  }

  tickTock = () => {
    let time = this.state.time

    if (time === 0) {
      this.alarm()
      if (this.state.sessionFlag) {
        this.setState({
          time: this.state.break * 60 * 1000
        })
      } else {
        this.setState({
          time: this.state.session * 60 * 1000
        })
      }
      this.setState({
        sessionFlag: !this.state.sessionFlag
      })
    }
    time = this.state.time - 1000
    this.setState({
      time: time
    })
  }

  alarm = () => {
    this.beep.play()
  }

  startTimer = () => {
    this.setState({
      running: true,
      pause: false,
      sessionFlag: true
    })
    this.timer = setInterval(this.tickTock, 1000)
  }

  stopTimer = () => {
    this.setState({
      running: false,
      pause: true
    })
    clearInterval(this.timer)
  }

  resetTimer = () => {
    clearInterval(this.timer)

    this.setSession(25)
    this.setBreak(5)
    this.beep.pause()
    this.beep.currentTime = 0
    this.setState({
      running: false,
      pause: false
    })
  }

  componentDidMount () {}

  render () {
    const timeFormat = format(this.state.time)
    const minutes = ('0' + timeFormat.m).slice(-2)
    const seconds = ('0' + timeFormat.s).slice(-2)
    return (
      <div className='App'>
        <SetTimer
          time={this.state.session}
          setTime={this.setSession}
          label='session'
        />
        <SetTimer
          time={this.state.break}
          setTime={this.setBreak}
          label='break'
        />
        <div>
          <button onClick={this.startTimer}>Start</button>
          <button onClick={this.stopTimer}>Stop</button>
          <button onClick={this.resetTimer}>Reset</button>
          <p>{minutes} : {seconds}</p>
          <p>
            {this.state.sessionFlag && this.state.running
              ? 'work bitch'
              : 'chill'}
          </p>
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

export default App
