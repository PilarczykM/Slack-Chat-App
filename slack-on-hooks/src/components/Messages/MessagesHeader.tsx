import React from "react";
import { useSelector } from "react-redux";
import { Header, Icon, Input, Segment } from "semantic-ui-react";
import { State } from "../../store";

export const MessagesHeader: React.FC = () => {
  const activeChannel = useSelector((state: State) => state.activeChannel);
  return (
    <Segment clearing>
      <Header fluid="true" as="h2" floated="left">
        <span>
          {activeChannel.channelName} channel
          <Icon name="star outline" color="black" />
        </span>
        <Header.Subheader>2 users</Header.Subheader>
      </Header>
      <Header floated="right">
        <Input
          icon="search"
          size="mini"
          name="searchTerm"
          placeholder="Search message"
        />
      </Header>
    </Segment>
  );
};
