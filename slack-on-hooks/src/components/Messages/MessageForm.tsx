import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import firebase from "../../firebase";
import { State } from "../../store";
import { FileModal } from "./FileModal";
import { ProgressBar } from "./ProgressBar";

export const MessageForm: React.FC = () => {
  const activeChannel = useSelector((state: State) => state.activeChannel);
  const user = useSelector((state: State) => state.user);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMediaUploadModalOpen, setIsMediaUploadModalOpen] = useState<boolean>(
    false
  );
  const [percentageUpload, setPercentageUpload] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploadingFail, setIsUploadingFail] = useState<Error>();

  const openModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsMediaUploadModalOpen(true);
  };

  const closeModal = () => {
    setIsMediaUploadModalOpen(false);
  };

  const sendFile = (file: File) => {
    let storageRef = firebase.storage().ref();
    let filePath = `chat/public/${uuid()}.jpg`;
    let metaData: firebase.storage.UploadMetadata = {
      contentType: file.type,
    };
    setIsUploading(true);
    let uploadingTask = storageRef.child(filePath).put(file, metaData);

    uploadingTask.on(
      "state_changed",
      (snap) => {
        let percentageUpload = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        setPercentageUpload(percentageUpload);
      },
      (err) => {
        console.error(err);
        setIsUploadingFail(err);
        setIsUploading(false);
      },
      () => {
        setIsUploading(false);
        setPercentageUpload(0);
        uploadingTask.snapshot.ref
          .getDownloadURL()
          .then((donwloadUrl) => {
            let messagesRef = firebase
              .firestore()
              .collection("channelsMessages");
            messagesRef
              .doc(activeChannel.id)
              .collection("messages")
              .add(createMessage(donwloadUrl))
              .then(() => {
                setIsLoading(false);
                setMessage("");
              })
              .catch((err) => {
                console.error(err);
                setIsLoading(false);
              });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    );
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
  };

  const createMessage = (fileUrl = null) => {
    let messageObj: any = {
      timestamp: new Date(),
      user: {
        id: user.uid,
        avatar: user.photoURL,
        name: user.displayName,
      },
    };
    if (fileUrl !== null) {
      messageObj["image"] = fileUrl;
    } else {
      messageObj["content"] = message;
    }

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
      {isUploading ? <ProgressBar progressNumber={percentageUpload} /> : null}
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
          onClick={(event) => openModal(event)}
          content="Upload media"
          labelPosition="right"
          icon="cloud upload"
        />
      </Button.Group>
      <FileModal
        isModalOpen={isMediaUploadModalOpen}
        closeModal={closeModal}
        sendFile={sendFile}
      />
    </Segment>
  );
};
