import React, { useState } from "react";
import { Button, Icon, Input, Label, Modal } from "semantic-ui-react";

interface ModalProps {
  isModalOpen: boolean;
  closeModal: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  sendFile: (file: File) => void;
}

export const FileModal: React.FC<ModalProps> = ({
  isModalOpen,
  closeModal,
  sendFile,
}) => {
  const [file, setFile] = useState<File>();

  const addFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      let file = files[0];
      switch (file.type) {
        case "image/png":
        case "image/jpg":
        case "image/jpeg":
          setFile(file);
          break;
        default:
          break;
      }
    }
  };

  const prepareSendFile = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (file) {
      sendFile(file);
      setFile(undefined);
      closeModal(event);
    }
  };

  const clearModal = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setFile(undefined);
    closeModal(event);
  };

  return (
    <Modal
      open={isModalOpen}
      closeIcon
      onClose={clearModal}
      style={{ maxWidth: "550px" }}
    >
      <Modal.Header>Select image file</Modal.Header>
      <Modal.Content>
        <Input
          onChange={(e) => addFile(e)}
          name="file"
          fluid
          type="file"
          label="File types: .jpg, .png"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button as="div" labelPosition="right" onClick={clearModal}>
          <Button icon color="red">
            <Icon name="cancel" />
          </Button>
          <Label as="a" basic pointing="left">
            Cancle
          </Label>
        </Button>
        <Button as="div" labelPosition="left" onClick={prepareSendFile}>
          <Label as="a" basic pointing="right">
            Send
          </Label>
          <Button icon color="green">
            <Icon name="send" />
          </Button>
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
