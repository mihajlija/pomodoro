import React, { Component } from 'react'
import './App.css'
import Timer from './Timer.js'
import SetTimer from './SetTimer.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      session: 25,
      break: 5,
      timeFormat: {
        h: 0,
        m: 25,
        s: 0,
        total: 25 * 60 * 1000
      },
      time: 25 * 60 * 1000
    }

    this.timer = 0
  }

  setSession = t => {
    this.setState({
      session: t,
      time: t * 60 * 1000,
      timeFormat: this.formatTime(t * 60 * 1000)
    })
  }

  setBreak = t => {
    this.setState({
      break: t
    })
  }

  formatTime = ms => {
    let t = ms
    let seconds = Math.floor(t / 1000 % 60)
    let minutes = Math.floor(t / 1000 / 60 % 60)
    let hours = Math.floor(t / (1000 * 60 * 60) % 24)

    let time = {
      h: hours,
      m: minutes,
      s: seconds,
      total: t
    }

    return time
  }

  tickTock = () => {
    let time = this.state.time - 1000
    this.setState({
      timeFormat: this.formatTime(time),
      time: time
    })

    if (time === 0) {
      clearInterval(this.timer)
    }
  }

  startTimer = () => {
    this.timer = setInterval(this.tickTock, 1000)
  }

  stopTimer = () => {
    clearInterval(this.timer)
  }

  componentDidMount () {
    let timeLeft = this.state.session * 60 * 1000
    this.setState({ time: timeLeft })
  }

  render () {
    const minutes = ('0' + this.state.timeFormat.m).slice(-2)
    const seconds = ('0' + this.state.timeFormat.s).slice(-2)
    return (
      <div className='App'>
        <SetTimer
          time={this.state.session}
          setSession={this.setSession}
          label='session'
        />
        <SetTimer
          time={this.state.break}
          setBreak={this.setBreak}
          label='break'
        />
        <div>
          <button onClick={this.startTimer}>Start</button>
          <button onClick={this.stopTimer}>Stop</button>
          <p>{minutes} : {seconds}</p>
        </div>
      </div>
    )
  }
}

export default App
