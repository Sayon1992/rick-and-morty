import React from "react";
import { Character } from "../../core/entities/Character";

interface CharacterProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterProps) => {
  return <div>{character.name}</div>;
};

export default CharacterCard;
