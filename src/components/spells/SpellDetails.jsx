import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpellById } from "../../data/spellData";

export const SpellDetails = () => {
  const { spellId } = useParams();
  const [spell, setSpell] = useState({});
  const spellInstructionsArray = spell?.instructions?.split("\n");

  useEffect(() => {
    getSpellById(spellId).then((spellObj) => {
      setSpell(spellObj);
    });
  }, [spellId]);

  return (
    <div className="entire_detail_container flex justify-between">
      <div className="spell_detail_container max-w-lg ml-36">
        <div className="border border-emerald-300 text-3xl p-10">
          {spell.name}
        </div>
        <div className="intention border border-emerald-300 p-10">
          <p className="spell_detail_label text-emerald-300">intention:</p>
          {spell.intention}
        </div>
        <div className="chant border border-emerald-300 p-10">
          <p className="spell_detail_label text-emerald-300">chant:</p>
          <p className="italic">{`"${spell.chant}"`}</p>
        </div>
        <div className="repeat_chant border border-emerald-300 p-10">
          <p className="spell_detail_label text-emerald-300">repeat chant:</p>
          {spell.repeat_chant} times
        </div>
        <div className="when_most_powerful border border-emerald-300 p-10">
          <p className="spell_detail_label text-emerald-300">
            when the spell will be most powerful:
          </p>
          {spell.when_most_powerful}
        </div>
        <div className="location border border-emerald-300 p-10">
          <p className="spell_detail_label text-emerald-300">
            where to perform spell:
          </p>
          {spell.location}
        </div>
        <div className="instructions border border-emerald-300 p-10">
          <p className="spell_detail_label text-emerald-300">instructions:</p>
          <div className="instructions_list">
            {spellInstructionsArray?.map((sentence, index) => (
              <li key={index}>{sentence}</li>
            ))}
          </div>
        </div>
        <div
          className="additional_info border border-emerald-300 p-10"
          style={{ whiteSpace: "pre-line" }}
        >
          <p className="spell_detail_label text-emerald-300">
            additional info:
          </p>

          {spell.additional_info}
        </div>
      </div>

      <div className="whats_needed_container mr-56">
        <div className="ingredient_list_container mb-20">
          <h1 className="ingredient_list_header text-3xl mb-5">Ingredients</h1>
          <p className="ingredient_message text-purple-600 italic">{`(ingredients not in your inventory will appear purple)`}</p>
          {spell?.spells_ingredients?.map((ingredient) => {
            return (
              <li
                className={`ingredient_list_item ${
                  ingredient.is_owned ? "" : "text-purple-600"
                }`}
                key={`ingredient-${ingredient.ingredient.id}`}
              >
                {ingredient.measurement} {ingredient.ingredient.label}
              </li>
            );
          })}
        </div>
        <div>
          <h1 className="equipment_list_header text-3xl mb-5">Equipment</h1>
          {spell?.equipment?.map((equipment) => {
            return <li key={`equipment-${equipment.id}`}>{equipment.label}</li>;
          })}
        </div>
      </div>
    </div>
  );
};
