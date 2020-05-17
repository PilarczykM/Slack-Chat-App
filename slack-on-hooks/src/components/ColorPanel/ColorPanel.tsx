import React from "react";
import { Button, Divider, Menu, Sidebar } from "semantic-ui-react";

export const ColorPanel: React.FC = () => {
  return (
    <Sidebar as={Menu} visible icon vertical inverted width="very thin">
      <Divider />
      <Button icon="add" color="blue" size="small" />
    </Sidebar>
  );
};
