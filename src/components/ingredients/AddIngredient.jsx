import { useEffect, useState } from "react";
import {
  getAllIngredients,
  getAllUnits,
  postInventoryIngredient,
} from "../../data/ingredientData";
import { useNavigate } from "react-router-dom";

export const AddIngredient = () => {
  const [inventoryIngredient, setInventoryIngredient] = useState({
    quantity: 0,
    ingredient: 0,
    unit: 0,
  });
  const [ingredients, setIngredients] = useState([]);
  const [units, setUnits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllIngredients().then((ingredientArray) => {
      setIngredients(ingredientArray);
    });
    getAllUnits().then((unitArray) => {
      setUnits(unitArray);
    });
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
    <div className="bg-black">
      <h1>Add Ingredient</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // This prevents issues with the form when hitting cancel
        }}
      >
        <fieldset>
          <label>Ingredients</label>
          {ingredients.map((ingredient) => (
            <div key={ingredient.id}>
              <input
                type="radio"
                id={ingredient.id}
                name="ingredient"
                value={ingredient.id}
                onChange={handleInputChanges}
              />
              <label htmlFor={ingredient.id}>{ingredient.label}</label>
            </div>
          ))}
        </fieldset>
        <fieldset>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={inventoryIngredient.quantity}
            onChange={handleInputChanges}
          />
        </fieldset>
        <fieldset>
          <label>Unit</label>
          <select
            name="unit"
            value={inventoryIngredient.unit}
            onChange={handleInputChanges}
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
          className="add_ingredient border border-emerald-300"
          onClick={handleSavingIngredient}
        >
          Add
        </button>
        <button
          className="add_ingredient border border-emerald-300"
          onClick={() => {
            navigate("/my-ingredients");
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
