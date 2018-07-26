import React, { Component } from 'react'

class SetTimer extends Component {
  state = {
    time: this.props.time
  }

  increment = () => {
    let t = this.state.time + 5
    this.setState({
      time: t
    })

    this.props.label == 'session'
      ? this.props.setSession(t)
      : this.props.setBreak(t)
  }

  decrement = () => {
    let t = this.state.time - 5

    this.setState({
      time: t
    })

    this.props.label == 'session'
      ? this.props.setSession(t)
      : this.props.setBreak(t)
  }

  render () {
    return (
      <div id='label'>
        <p>{this.props.label}</p>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <p>{this.state.time}</p>
      </div>
    )
  }
}

export default SetTimer
