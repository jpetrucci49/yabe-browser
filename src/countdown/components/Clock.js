import React, { Component } from 'react'

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  async componentWillMount() {
    this.getTimeUntil(this.props.expiration)
  }

  async componentDidMount() {
    this.countdown = setInterval(() => this.getTimeUntil(this.props.expiration), 1000)
  }

  async componentWillUnmount() {
    clearInterval(this.countdown)
  }

  getTimeUntil(deadline){
    const time = Date.parse(deadline) - Date.parse(new Date())
    const seconds = Math.floor((time/1000)%60)
    const minutes = Math.floor((time/1000/60)%60)
    const hours = Math.floor(time/(1000*60*60)%24)
    const days = Math.floor(time/(1000*60*60*24))
    this.setState({
      days: this.leading0(days),
      hours: this.leading0(hours),
      minutes: this.leading0(minutes),
      seconds: this.leading0(seconds)
    })
  }

  leading0(num) {
    if (num <= 0) {
      return num
    } else if (num < 10) {
      return '0' + num
    }
    return num
  }

  counter() {
    const { days, hours, minutes, seconds } = this.state
    const expired = (days < 0 && hours < 0 && minutes < 0 && seconds <= 0)
    if (expired) {
      return 'This auction has expired.'
    } else {
      let timer = ''
      if (days > 0) {
        timer += `${days} days, `
      }
      if (hours > 0) {
        timer += `${hours} hours, `
      }
      if (minutes > 0) {
        timer += `${minutes} minutes, `
      }
      if (seconds >= 0) {
        timer += `${seconds} seconds`
      }
      return timer += ' remaining'
    }
  }

  render() {
    return (
      <section className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <p>
              {this.counter()}
            </p>
          </div>
        </div>
      </section>
    )
  }
}

export default Clock
