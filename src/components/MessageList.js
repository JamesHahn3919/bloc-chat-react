import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allMessages: [],
      displayedMessages: []
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
        <h1 className="room-name">
          {this.props.activeRoom ? this.props.activeRoom.name : ""}
        </h1>
        <ul id="message-list">
          {this.state.displayedMessages.map(message => (
            <ul key={message.key}>
              {" "}
              {message.username}: {message.content} {message.sentAt}{" "}
            </ul>
          ))}
        </ul>
      </section>
    );
  }
}

export default MessageList;