import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpellById } from "../../data/spellData";
import { Loading } from "../Loading";

export const SpellDetails = ({ setShowNavbar }) => {
  const { spellId } = useParams();
  const [spell, setSpell] = useState({});
  const [loading, setLoading] = useState(true);
  const spellInstructionsArray = spell?.instructions?.split("\n");

  useEffect(() => {
    getSpellById(spellId).then((spellObj) => {
      setSpell(spellObj);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [spellId]);

  return (
    <>
      {loading === true ? (
        <Loading setShowNavbar={setShowNavbar} />
      ) : (
        <div className="detail-opacity-layer font-custom">
          <div className="entire_detail_container min-h-screen relative">
            <img
              style={{ height: "120%" }}
              className="absolute top-0 left-0"
              src="https://clipart.info/images/ccovers/1486144399Old-Open-Book-PNG-ClipArt.png"
              alt="old open book"
            />
            <div className="spell-page flex justify-between relative z-10 text-white">
              <div className="spell-detail-side w-1/2 pr-4 mt-12">
                <h1 className="text-emerald-500 black-text-outline text-7xl mb-4 ml-28 mt-6">
                  {spell.name}
                </h1>
                <div className="intention flex text-4xl text-emerald-500 black-text-outline p-4">
                  <div className="ml-36 mr-4 underline">intention:</div>
                  <div>{spell.intention}</div>
                </div>
                <div className="chant flex text-4xl text-emerald-500 black-text-outline p-4">
                  <div className="ml-36 mr-4 underline">chant:</div>
                  <div className="mr-10">
                    {spell.chant ? (
                      <div className="italic">{'"' + spell.chant + '"'}</div>
                    ) : (
                      <div>no chant</div>
                    )}
                  </div>
                </div>
                <div className="repeat_chant flex text-4xl text-emerald-500 black-text-outline p-4">
                  <div className="ml-36 mr-4 underline">repeat chant:</div>
                  <div>
                    {spell.repeat_chant
                      ? `${spell.repeat_chant} times`
                      : "no chant"}
                  </div>
                </div>
                <div className="when_most_powerful flex text-4xl text-emerald-500 black-text-outline p-4">
                  <div className="ml-36 mr-4 underline">
                    when the spell will be most powerful:
                  </div>
                  <div className="mr-10">{spell.when_most_powerful}</div>
                </div>
                <div className="location flex text-4xl text-emerald-500 black-text-outline">
                  <div className="ml-40 mr-4 underline">
                    where to perform spell:
                  </div>
                  <div className="mr-10">{spell.location}</div>
                </div>
                <div className="instructions flex text-4xl text-emerald-500 black-text-outline p-4">
                  <div className="ml-36 mr-4 underline">instructions:</div>
                  <ul className="instructions_list mr-10 text-left">
                    {spellInstructionsArray?.map((sentence, index) => (
                      <li key={index} className="pl-5">
                        {sentence}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="additional_info flex text-4xl text-emerald-500 black-text-outline p-4 -mb-24">
                    <div className="ml-32 mr-4 whitespace-nowrap underline">
                      additional info:
                    </div>
                    <div className="mr-10">{spell.additional_info}</div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 mt-12 mr-10">
                <div className="mb-10">
                  <h1 className="ingredient_list_header text-emerald-500 black-text-outline text-7xl mb-4 text-center">
                    Ingredients
                  </h1>
                  <div className="ingredient_message text-indigo-400 text-4xl font-semibold black-text-outline text-center mb-3">{`(ingredients not in your inventory will appear purple)`}</div>
                  <div className="text-wrap ml-12" style={{ width: "600px" }}>
                    {spell?.spells_ingredients?.map((ingredient) => {
                      return (
                        <li
                          className={`ingredient_list_item text-4xl text-emerald-500 black-text-outline ${
                            ingredient.is_owned
                              ? ""
                              : "text-indigo-500 text-4xl black-text-outline "
                          }`}
                          key={`ingredient-${ingredient.ingredient.id}`}
                        >
                          {ingredient.measurement} {ingredient.ingredient.label}
                        </li>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h1 className="equipment_list_header text-emerald-500 black-text-outline text-7xl mb-4">
                    Equipment
                  </h1>
                  {spell?.equipment?.map((equipment) => {
                    return (
                      <li
                        key={`equipment-${equipment.id}`}
                        className="text-4xl text-emerald-500 black-text-outline"
                      >
                        {equipment.label}
                      </li>
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
