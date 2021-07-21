import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Character } from "../../core/entities/Character";

interface CharacterModalProps {
  character?: Character;
  characterModal: boolean;
  handleClose: () => void;
}

const CharacterModal = ({
  character,
  characterModal,
  handleClose,
}: CharacterModalProps) => {
  return (
    <Dialog open={characterModal} onClose={handleClose}>
      <DialogTitle title={character?.name} color="black ">
        {character?.name}
      </DialogTitle>
      <DialogContent dividers>
        <img
          alt="character"
          src={character?.image}
          style={{ width: 200, height: 200 }}
        />
        <Typography variant="h6">
          Gender: {character?.gender}
          <br />
          Origin: {character?.origin.name}
          <br />
          Species: {character?.species}
          <br />
          Type: {character?.type}
          <br />
          Status: {character?.status}
          <br />
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterModal;
