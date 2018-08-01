import React, { Component } from 'react'
import './App.css'
import Timer from './Timer.js'
import SetTimer from './SetTimer.js'
import format from './format.js'
const sesh = 10
const br = 20

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      session: sesh,
      break: br,
      running: false,
      time: sesh * 60 * 1000
    }
  }

  setSession = t => {
    console.log('in session ', this.state.running)
    if (!this.state.running) {
      console.log(t)
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

  updateTime = t => {
    this.setState({
      time: t
    })
  }

  setRunning = b => {
    this.setState(
      {
        running: b
      },
      () => console.log('flag ', this.state.running)
    )
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
        <Timer
          app={this.state}
          setSession={this.setSession}
          setBreak={this.setBreak}
          setRunning={this.setRunning}
          updateTime={this.updateTime}
        />
      </div>
    )
  }
}

export default App
