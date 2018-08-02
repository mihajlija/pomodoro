import React, { Component } from 'react'

class SetTimer extends Component {
  increment = () => {
    let t = this.props.time
    if (this.props.time >= 1 && this.props.time < 60) {
      t = t + 1
    }
    this.props.setTime(t)
  }

  decrement = () => {
    let t = this.props.time
    if (this.props.time > 1 && this.props.time <= 60) {
      t = t - 1
    }
    this.props.setTime(t)
  }

  render () {
    return (
      <div className='labels'>
        <p>{this.props.label}</p>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <p>{this.props.time}</p>
      </div>
    )
  }
}

export default SetTimer
