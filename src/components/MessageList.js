import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allMessages: [],
      displayedMessages: [],
      newMessageText: " "
    };
    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState(
        { allMessages: this.state.allMessages.concat(message) },
        () => {
          this.showMessages(this.props.activeRoom);
        }
      );
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeRoom !== prevProps.activeRoom) {
      this.showMessages(this.props.activeRoom);
    }
  }

  createMessage(newMessageText) {
    this.messagesRef.push({
      username: this.props.user ? this.props.user.displayName : "Guest",
      content: newMessageText,

      roomId: this.props.activeRoom.key
    });
    this.setState({ newMessageText: " " });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ newMessageText: e.target.value });
  }

  showMessages(activeRoom) {
    this.setState({
      displayedMessages: this.state.allMessages.filter(
        message => message.roomId === activeRoom.key
      )
    });
  }

  render() {
    return (
      <section className="message-list">
        <h1 className="room-title">
          {this.props.activeRoom ? this.props.activeRoom.name : ""}
        </h1>
        <ul>
          {this.state.displayedMessages.map(message => (
            <ul id="messages" key={message.key}>
              {" "}
              {message.username}: {message.content} {message.sentAt}{" "}
            </ul>
          ))}
        </ul>
        <form
          id="create-message"
          onSubmit={e => {
            e.preventDefault();
            this.createMessage(this.state.newMessageText);
          }}
        >
          <input
            type="text"
            value={this.state.newMessageText}
            onChange={this.handleChange.bind(this)}
            name="newMessageText"
            placeholder="Write your message here..."
          />
          <input type="submit" value="Send" />
        </form>
      </section>
    );
  }
}

export default MessageList;
