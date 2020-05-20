import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Comment, Segment } from "semantic-ui-react";
import firebase from "../../firebase";
import { State } from "../../store";
import { Message } from "./Message";
import { MessageForm } from "./MessageForm";
import { MessagesHeader } from "./MessagesHeader";

export const Messages: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const user = useSelector((state: State) => state.user);
  const activeChannel = useSelector((state: State) => state.activeChannel);

  useEffect(() => {
    if (user.uid && activeChannel.id !== "") {
      addListeners(activeChannel.id);
    }
  }, [activeChannel]);

  const addListeners = (channelId: string) => {
    addMessagesListener(channelId);
  };

  const addMessagesListener = (channelId: string) => {
    setMessages([]);
    const channelsMessagesRef = firebase
      .firestore()
      .collection("channelsMessages");

    channelsMessagesRef
      .doc(channelId)
      .collection("messages")
      .onSnapshot((messageSnapshow) => {
        messageSnapshow.docChanges().forEach((doc) => {
          switch (doc.type) {
            case "added":
              setMessages((prevState) => [
                ...prevState,
                { id: doc.doc.id, ...doc.doc.data() },
              ]);
              break;
            default:
              break;
          }
        });
      });
  };

  const displayMessages = (messages: any[]) =>
    messages.length > 0 &&
    messages.map((message) => (
      <Message
        key={message.id}
        id={message.id}
        content={message.content}
        image={message.image}
        user={user}
        timestamp={message.timestamp}
      />
    ));

  return (
    <>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages">
          {displayMessages(messages)}
        </Comment.Group>
      </Segment>
      <MessageForm />
    </>
  );
};
