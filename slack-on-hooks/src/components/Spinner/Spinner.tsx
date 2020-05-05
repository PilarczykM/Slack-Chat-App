import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export const Spinner: React.FC = () => (
  <Dimmer active>
    <Loader content="Loading" size="massive" />
  </Dimmer>
);
