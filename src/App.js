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
      time: {},
      seconds: 25
    }

    this.timer = 0
  }

  setSession = t => {
    this.setState({
      session: t,
      seconds: t * 60
    })
  }

  setBreak = t => {
    this.setState({
      break: t
    })
  }

  secondsToTime = secs => {
    let hours = Math.floor(secs / (60 * 60))

    let divisor_for_minutes = secs % (60 * 60)
    let minutes = Math.floor(divisor_for_minutes / 60)

    let divisor_for_seconds = divisor_for_minutes % 60
    let seconds = Math.ceil(divisor_for_seconds)

    let time = {
      h: hours,
      m: minutes,
      s: seconds
    }
    return time
  }

  tickTock = () => {
    let seconds = this.state.seconds - 1
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    })

    if (seconds === 0) {
      clearInterval(this.timer)
    }
  }

  startTimer = () => {
    if (this.timer === 0) {
      this.timer = setInterval(this.tickTock, 1000)
    }
  }

  componentDidMount () {
    let timeLeft = this.secondsToTime(this.state.session * 60)
    this.setState({ time: timeLeft })
  }

  render () {
    const minutes = ('0' + this.state.time.m).slice(-2)
    const seconds = ('0' + this.state.time.s).slice(-2)
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
          <p>{minutes} : {seconds}</p>
        </div>
      </div>
    )
  }
}

export default App
