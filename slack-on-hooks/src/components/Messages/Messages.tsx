import React from "react";
import { Comment, Segment } from "semantic-ui-react";
import { MessageForm } from "./MessageForm";
import { MessagesHeader } from "./MessagesHeader";

export const Messages: React.FC = () => {
  return (
    <>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages">{/* Messages */}</Comment.Group>
      </Segment>
      <MessageForm />
    </>
  );
};
