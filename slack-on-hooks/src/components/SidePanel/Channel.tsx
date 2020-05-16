import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Icon, Input, Menu, Modal } from "semantic-ui-react";
import firebase from "../../firebase";
import { State } from "../../store";
import {
  addChannelActionCreator,
  modifyChannelActionCreator,
  removeChannelActionCreator,
} from "../../store/channels/slice";
import { IChannel } from "../../store/channels/types";

interface IInputValues {
  channelName: string;
  channelDetails: string;
}

export const Channel: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const channels = useSelector((state: State) => state.channels);
  const [inputValues, setInputValues] = useState<IInputValues>({
    channelDetails: "",
    channelName: "",
  });

  const userSelector = useSelector((state: State) => state.user);

  useEffect(() => {
    let channelRef = firebase.firestore().collection("channels");
    channelRef.onSnapshot((snap) => {
      // Podpiac to pod redux, w zaleznosci od typu dawanego bedzie sie dodawalo, usuwalo, modyfikowalo channele.
      snap.docChanges().forEach((doc) => {
        const { channelDetails, channelName, createdBy, id } = doc.doc.data();
        const { email, name, avatar } = createdBy;
        switch (doc.type) {
          case "added":
            dispatch(
              addChannelActionCreator({
                id,
                channelName,
                channelDetails,
                createdBy: {
                  email,
                  name,
                  avatar,
                },
              })
            );
            break;
          case "modified":
            dispatch(
              modifyChannelActionCreator({
                id,
                channelName,
                channelDetails,
                createdBy: {
                  email,
                  name,
                  avatar,
                },
              })
            );
            break;
          case "removed":
            dispatch(removeChannelActionCreator({ id }));
        }
      });
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!validateInput()) return;

    let newChannel = {
      channelName: inputValues.channelName,
      channelDetails: inputValues.channelDetails,
      createdBy: {
        name: userSelector.displayName,
        email: userSelector.email,
        avatar: userSelector.photoURL,
      },
    };

    let channelRef = firebase.firestore().collection("channels");

    channelRef
      .add(newChannel)
      .then((newChannelRef) => {
        let { id } = newChannelRef;

        newChannelRef
          .set({
            ...newChannel,
            id,
          })
          .then(() => {
            clearModal();
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const displayChannels = (channelArg: IChannel[]) =>
    channelArg.length > 0 &&
    channelArg.map((channel: IChannel) => (
      <Menu.Item
        key={channel.id}
        onClick={() => console.log(channel)}
        name={channel.channelName}
        style={{ opacity: "0.7" }}
      >
        # {channel.channelName}
      </Menu.Item>
    ));

  const validateInput = () =>
    inputValues.channelName && inputValues.channelDetails;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const clearModal = () => {
    setInputValues({
      channelName: "",
      channelDetails: "",
    });
    closeModal();
  };

  return (
    <>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          ({channels.length}){" "}
          <Icon name="add" onClick={() => setIsModalOpen(true)} />
        </Menu.Item>
        {displayChannels(channels)}
      </Menu.Menu>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeIcon
        style={{ maxWidth: "500px" }}
      >
        <Modal.Header>Add channel!</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                fluid
                label="Chanel name"
                name="channelName"
                onChange={handleChange}
                value={inputValues.channelName}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="Chanel details"
                name="channelDetails"
                onChange={handleChange}
                value={inputValues.channelDetails}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={(e) => handleSubmit(e)}>
            <Icon name="checkmark" /> Add
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="close" /> Cancle
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
