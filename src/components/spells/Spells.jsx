import { useEffect, useState } from "react";
import { getAllSpells } from "../../data/spellData";
import { Link } from "react-router-dom";

export const Spells = () => {
  const [spells, setSpells] = useState([]);
  const [desiredIntention, setDesiredIntention] = useState("");
  const [filteredSpells, setFilteredSpells] = useState([]);

  useEffect(() => {
    getAllSpells().then((spellsArray) => {
      setSpells(spellsArray);
    });
  }, []);

  useEffect(() => {
    const spellsFilteredDown = spells.filter((spell) =>
      spell.intention.toLowerCase().includes(desiredIntention.toLowerCase())
    );
    setFilteredSpells(spellsFilteredDown);
  }, [desiredIntention, spells]);

  return (
    <div>
      <input
        onChange={(event) => {
          setDesiredIntention(event.target.value);
        }}
        type="text"
        placeholder="Search Intention"
        value={desiredIntention}
      />
      {filteredSpells.map((spellObj) => {
        return (
          <div key={spellObj.id}>
            <Link to={`/spells/${spellObj.id}`}>{spellObj.name}</Link>
          </div>
        );
      })}
    </div>
  );
};
