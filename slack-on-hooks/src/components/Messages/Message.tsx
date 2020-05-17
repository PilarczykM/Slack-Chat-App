import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Comment } from "semantic-ui-react";
import { State } from "../../store";
import { IUser } from "../../store/user/types";

interface MessageProp {
  user: IUser;
  id: string;
  content: string;
  timestamp: {
    seconds: string;
  };
}

export const Message: React.FC<MessageProp> = (message: MessageProp) => {
  const userId = useSelector((state: State) => state.user.uid);

  const isOwnMessage = (message: MessageProp): string => {
    return userId === message.user.uid ? "message__self" : "";
  };

  const calculateTime = (time: string) => moment(time).format("HH:mm:ss");

  return (
    <Comment>
      <Comment.Avatar
        src={
          message.user.photoURL
            ? message.user.photoURL
            : "https://api.adorable.io/avatars/285/abott@adorable.png"
        }
      />
      <Comment.Content className={isOwnMessage(message)}>
        <Comment.Author as="a">{message.user.displayName}</Comment.Author>
        <Comment.Metadata>
          {calculateTime(message.timestamp.seconds)}
        </Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};
