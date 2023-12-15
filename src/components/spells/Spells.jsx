import { useEffect, useState } from "react";
import { getAllSpells } from "../../data/spellData";
import { Link } from "react-router-dom";

export const Spells = () => {
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    getAllSpells().then((spellsArray) => {
      setSpells(spellsArray);
    });
  }, []);

  return (
    <div>
      {spells.map((spellObj) => {
        return (
          <div key={spellObj.id}>
            <Link to={`/spells/${spellObj.id}`}>{spellObj.name}</Link>
          </div>
        );
      })}
    </div>
  );
};
