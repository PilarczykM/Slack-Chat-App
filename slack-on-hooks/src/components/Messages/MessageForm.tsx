import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input, Segment } from "semantic-ui-react";
import firebase from "../../firebase";
import { State } from "../../store";

export const MessageForm: React.FC = () => {
  const activeChannel = useSelector((state: State) => state.activeChannel);
  const user = useSelector((state: State) => state.user);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
  };

  const createMessage = () => {
    const messageObj = {
      timestamp: new Date(),
      content: message,
      user: {
        id: user.uid,
        avatar: user.photoURL,
        name: user.displayName,
      },
    };

    return messageObj;
  };
  // TODO: Do rozkminienia, dodac redux jak zmienia sie channel czyscic i ustawiac na nowo
  // TODO: state channelMessages?
  const sendMessage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (message) {
      setIsLoading(true);

      let messagesRef = firebase.firestore().collection("channelsMessages");
      messagesRef
        .doc(activeChannel.id)
        .collection("messages")
        .add(createMessage())
        .then(() => {
          setIsLoading(false);
          setMessage("");
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  };

  return (
    <Segment className="message__form">
      <Input
        fluid
        name="message"
        style={{ marginBottom: "0.7em" }}
        onChange={handleInput}
        label={<Button icon="add" />}
        labelPosition="left"
        value={message}
        placeholder="Write your message"
      />
      <Button.Group icon widths="2">
        <Button
          color="orange"
          disabled={isLoading}
          content="Add replay"
          labelPosition="left"
          icon="edit"
          onClick={sendMessage}
        />
        <Button
          color="teal"
          content="Upload media"
          labelPosition="right"
          icon="cloud upload"
        />
      </Button.Group>
    </Segment>
  );
};
