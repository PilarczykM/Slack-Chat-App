import React from "react";
import { Header, Icon, Input, Segment } from "semantic-ui-react";

export const MessagesHeader: React.FC = () => {
  return (
    <Segment clearing>
      <Header fluid as="h2" floated="left">
        <span>
          Channel
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
