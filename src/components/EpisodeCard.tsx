import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { Episode } from "../../core/entities/Episode";
import { Character } from "../../core/entities/Character";

import rymPhoto from "../images/Rick_y_morty.webp";
import { useEffect } from "react";
import CharacterModal from "./CharacterModal";

interface CardProps {
  episode: Episode;
}

const useStyles = makeStyles({
  image: {
    height: 300,
    backgroundSize: "contain",
  },
  cardHeader: {
    textAlign: "center",
  },
  cardActions: {
    justifyContent: "center",
  },
  character: {
    width: 70,
    height: 70,
    marginRight: 5,
  },
  tooltip: {
    fontSize: "1em",
  },
  charactersTitle: {
    marginBottom: "3%",
    marginTop: "3%",
  },
  detail: {
    marginBottom: "3%",
  },
});

const EpisodeCard = ({ episode }: CardProps) => {
  const [modal, setModal] = useState(false);
  const [characterModal, setCharacterModal] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [character, setCharacter] = useState<Character | undefined>(undefined);

  const handleModal = () => {
    setModal(true);
  };

  const handleClose = () => {
    setCharacterModal(false);
  };

  const getCharacters = useCallback(() => {
    Promise.all(
      episode.characters.map((url) =>
        fetch(url).then((response) => response.json())
      )
    ).then((value: Character[]) => setCharacters(value));
  }, [episode.characters]);

  useEffect(() => {
    modal && getCharacters();
  }, [modal, getCharacters]);

  const classes = useStyles();

  return (
    <div>
      <Card>
        <CardHeader className={classes.cardHeader} title={episode.episode} />
        <CardMedia className={classes.image} image={rymPhoto} />
        <CardActions className={classes.cardActions}>
          <Button onClick={handleModal}>Details</Button>
        </CardActions>
      </Card>
      <Dialog onClose={() => setModal(false)} open={modal}>
        <DialogTitle>{episode.name}</DialogTitle>
        <DialogContent dividers>
          <Typography className={classes.detail} variant="h6">
            Release date: {episode.air_date}
            <br />
            Created: {new Date(episode.created).toLocaleDateString()}
            <br />
            Episode: {episode.episode}
          </Typography>
          <Divider />
          <Typography
            className={classes.charactersTitle}
            align="center"
            variant="h4"
          >
            Characters
          </Typography>
          {characters.map((item) => (
            <>
              <Tooltip classes={{ tooltip: classes.tooltip }} title={item.name}>
                <img
                  alt="character"
                  onClick={() => {
                    setCharacter(item);
                    setCharacterModal(true);
                  }}
                  src={item.image}
                  className={classes.character}
                />
              </Tooltip>
            </>
          ))}
        </DialogContent>
      </Dialog>
      <CharacterModal
        character={character}
        characterModal={characterModal}
        handleClose={handleClose}
      />
    </div>
  );
};

export default EpisodeCard;
