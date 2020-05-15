import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Grid, Header, Image } from "semantic-ui-react";
import firebase from "../../firebase";
import { State } from "../../store";
import { logoutActionCreator } from "../../store/user/slice";
import { UserPanelHeader } from "./UserPanelHeader";

export const UserPanel: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);

  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{user.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    { key: "avatar", text: <span>Change Avatar</span> },
    { key: "signedout", text: <span onClick={handleSignOut}>Signed out</span> },
  ];

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => dispatch(logoutActionCreator));
  };
  return (
    <Grid>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2rem" }}>
          {/* App Header */}
          <UserPanelHeader title="DevChat" />
          {/* User dropdown */}
          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  {" "}
                  <Image src={user.photoURL} spaced="right" avatar />{" "}
                  {user.displayName}
                </span>
              }
              options={dropdownOptions()}
            />
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};
