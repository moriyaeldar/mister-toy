import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socket.service'

class _ChatApp extends Component {
  state = {
    msg: { txt: '' },
    msgs: [],
    isBotMode: false,
    isTyping:false
  }

  componentDidMount() {
    socketService.setup()
    socketService.emit('chat topic', this.props.id)
    socketService.on('chat addMsg', this.addMsg)
  }

  componentWillUnmount() {
    socketService.off('chat addMsg', this.addMsg)
    socketService.terminate()
    clearTimeout(this.timeout)
  }

  addMsg = newMsg => {
    this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }))
    if (this.state.isBotMode) this.sendBotResponse();
  }

  sendBotResponse = () => {
    // Handle case: send single bot response (debounce).
    this.timeout && clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.setState(prevState => ({ msgs: [...prevState.msgs, { from: 'Bot', txt: 'You are amazing!' }] }))
    }, 1500)
  }
// addHistory(){

// }
  changeTopic = () => {
    socketService.emit('chat topic', this.state.topic)
  }
  isTyping=()=>{
this.setState({isTyping:true})
  }
  stopTyping=()=>{
this.setState({isTyping:false})
  }
  sendMsg = ev => {
    ev.preventDefault()
    const from = this.props.loggedInUser?.fullname || 'Me'
    socketService.emit('chat newMsg', { from, txt: this.state.msg.txt })
    this.setState({ msg: { from: 'Me', txt: '' } })
  }

  handleChange = ev => {
    const { name, value } = ev.target
    this.setState({ [name]: value }, this.changeTopic)
  }

  msgHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => {
      return {
        msg: {
          ...prevState.msg,
          [name]: value
        }
      }
    })
  }

  render() {
    return (
      <div className="chat">
        {this.state.isTyping&&
        <p>{this.props.loggedInUser.fullname} is typing..</p>}
        <h2>Lets Chat about toy num: {this.props.id}</h2>
        {/* <label>
          <input
            type="checkbox"
            name="isBotMode"
            checked={this.state.isBotMode}
            onChange={(ev) => this.setState({ isBotMode: ev.target.checked })}
          />
          Bot Mode
        </label> */}
        <div>
          <label>
            <input
              type="radio"
              name="topic"
              value="toy"
              checked={this.props.id === this.props.id}
              onChange={this.handleChange}
            />
            Toy
          </label>
          {/* <label>
            <input
              type="radio"
              name="topic"
              value="Politics"
              checked={this.state.topic === 'Politics'}
              onChange={this.handleChange}
            />
            Politics
          </label> */}
        </div>
        <form onSubmit={this.sendMsg}>
          <input
            type="text"
            value={this.state.msg.txt}
            onChange={this.msgHandleChange}
            name="txt"
            autoComplete="off"
            onKeyDown={this.isTyping}
          />
          <button onClick={this.stopTyping}>Send</button>
        </form>
        <ul>
          {this.state.msgs.map((msg, idx) => (
            <li key={idx}>{msg.from}: {msg.txt}</li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.user
  }
}
const mapDispatchToProps = {
}

export const ChatApp = connect(mapStateToProps, mapDispatchToProps)(_ChatApp)
