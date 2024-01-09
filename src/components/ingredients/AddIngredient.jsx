import { useEffect, useState } from "react";
import {
  getAllIngredients,
  getAllUnits,
  postInventoryIngredient,
} from "../../data/ingredientData";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Loading";

export const AddIngredient = ({ setShowNavbar }) => {
  const [loading, setLoading] = useState(true);
  const [inventoryIngredient, setInventoryIngredient] = useState({
    quantity: 0,
    ingredient: 0,
    unit: 0,
  });
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState([]);
  const [units, setUnits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllIngredients().then((ingredientArray) => {
      const alphaIngredientsArray = ingredientArray.sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      setIngredients(alphaIngredientsArray);
    });
    getAllUnits().then((unitArray) => {
      setUnits(unitArray);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChanges = (event) => {
    const inventoryIngredientCopy = { ...inventoryIngredient };
    inventoryIngredientCopy[event.target.name] = event.target.value;
    setInventoryIngredient(inventoryIngredientCopy);
  };

  const handleSavingIngredient = (event) => {
    if (
      inventoryIngredient.ingredient > 0 &&
      inventoryIngredient.quantity > 0 &&
      inventoryIngredient.unit > 0
    ) {
      const inventoryIngredientCopy = { ...inventoryIngredient };
      parseInt(inventoryIngredientCopy[event.target.name]);
      postInventoryIngredient(inventoryIngredientCopy).then(() => {
        navigate("/my-ingredients");
      });
    } else {
      window.alert("Please fill out entire form");
    }
  };

  return (
    <>
      {loading === true ? (
        <Loading setShowNavbar={setShowNavbar} />
      ) : (
        <div className="opacity-layer overflow-auto">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              // This prevents issues with the form when hitting cancel
            }}
          >
            <div className="flex justify-around">
              <fieldset className="font-custom text-3xl">
                <label className="mr-6">Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={inventoryIngredient.quantity}
                  onChange={handleInputChanges}
                  className="rounded-3xl bg-indigo-950 text-center border border-2 border-black"
                />
              </fieldset>
              <fieldset className="font-custom text-3xl">
                <label className="mr-6">Unit *</label>
                <select
                  name="unit"
                  value={inventoryIngredient.unit}
                  onChange={handleInputChanges}
                  className="rounded-3xl bg-indigo-950 text-center border border-2 border-black w-52"
                >
                  <option value={0}>select unit</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </fieldset>
              <button
                className="add_ingredient bg-emerald-900 border-2 border-emerald-300 rounded-3xl hover:bg-emerald-300 font-custom h-11 w-20 text-2xl"
                onClick={handleSavingIngredient}
              >
                Add
              </button>
              <button
                className="cancel bg-red-200 border-2 border-red-300 rounded-3xl font-custom h-11 w-20 text-2xl hover:bg-red-300"
                onClick={() => {
                  navigate("/my-ingredients");
                }}
              >
                Cancel
              </button>
            </div>
            <div className="ingredient-radio-choices grid grid-cols-5 items-center justify-center ml-20 mt-10">
              {ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  onClick={(e) => setSelectedIngredient(parseInt(e.target.id))}
                  className={
                    ingredient.id === selectedIngredient
                      ? "ingredient-choice flex items-center justify-center bg-center bg-cover h-full border border-4 rounded-3xl border-indigo-400"
                      : "ingredient-choice flex items-center justify-center bg-center bg-cover h-full"
                  }
                >
                  <input
                    type="radio"
                    id={ingredient.id}
                    name="ingredient"
                    value={ingredient.id}
                    onChange={handleInputChanges}
                    className="opacity-0 cursor-pointer "
                  />
                  <label
                    htmlFor={ingredient.id}
                    className="ingredient-label mt-4 font-custom text-white black-text-outline text-center text-3xl cursor-pointer hover:text-indigo-400"
                  >
                    {ingredient.label}
                  </label>
                </div>
              ))}
            </div>
          </form>
        </div>
      )}
    </>
  );
};
