import React, { Component } from 'react'
import './buttons.css'
import './App.css'
import Timer from './Timer.js'
import SetTimer from './SetTimer.js'
import { minutesToMs } from './format.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      session: 25,
      break: 5,
      running: false,
      paused: false,
      time: minutesToMs(25)
    }
  }

  setSession = t => {
    if (!this.state.running) {
      this.setState({
        session: t,
        time: minutesToMs(t)
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
    this.setState({
      running: b,
      paused: !b
    })
  }

  reset = () => {
    this.setState({
      session: 25,
      break: 5,
      running: false,
      paused: false,
      time: minutesToMs(25)
    })
  }

  componentDidMount () {}

  render () {
    return (
      <div className='App'>
        <Timer
          app={this.state}
          setSession={this.setSession}
          setBreak={this.setBreak}
          setRunning={this.setRunning}
          reset={this.reset}
          updateTime={this.updateTime}
        />
        <div className='settings'>
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
        </div>
      </div>
    )
  }
}

export default App
