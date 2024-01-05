import React, { useEffect, useState } from "react";
import { getAllSpells } from "../../data/spellData";
import { Link } from "react-router-dom";
import { Loading } from "../Loading";

export const Spells = ({ setShowNavbar }) => {
  const [loading, setLoading] = useState(true);
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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [desiredIntention, spells]);

  return (
    <>
      {loading === true ? (
        <Loading setShowNavbar={setShowNavbar} />
      ) : (
        <div className="spellView opacity-layer">
          <div className="spell-div min-h-screen bg-spellBook bg-cover relative overflow-auto">
            <div className="spell-book w-full max-w-md min-h-screen pb-10">
              <div className="ml-40">
                <div className="input mb-10 mt-11 flex">
                  <input
                    className="rounded-3xl bg-indigo-950 opacity-70 text-center border border-2 border-black font-custom text-3xl"
                    onChange={(event) => {
                      setDesiredIntention(event.target.value);
                    }}
                    type="text"
                    placeholder="Search Intention"
                    value={desiredIntention}
                  />
                </div>
                <div
                  className="spell-list grid grid-cols-2 gap-y-8 font-custom font-semibold text-emerald-500"
                  style={{ columnGap: "41rem" }}
                >
                  {filteredSpells.map((spellObj) => {
                    return (
                      <div
                        key={spellObj.id}
                        className="hover:text-indigo-400 whitespace-nowrap"
                      >
                        <Link to={`/spells/${spellObj.id}`}>
                          {spellObj.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
