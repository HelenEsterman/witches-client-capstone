import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpellById } from "../../data/spellData";

export const SpellDetails = () => {
  const { spellId } = useParams();
  const [spell, setSpell] = useState({});

  useEffect(() => {
    getSpellById(spellId).then((spellObj) => {
      setSpell(spellObj);
    });
  }, [spellId]);

  return (
    <div>
      <div>{spell.name}</div>
      <div>{spell.intention}</div>
      <div>{spell.chant}</div>
      <div>{spell.repeat_chant}</div>
      <div>{spell.when_most_powerful}</div>
      <div>{spell.location}</div>
      <div>{spell.other_instructions}</div>
    </div>
  );
};
