import { useEffect, useRef, useState } from "react";
import {
  allIngredientTypes,
  deleteIngredientFromInventory,
  editInventoryIngredient,
  getAllIngredients,
  getAllUnits,
  getCurrentUserIngredients,
} from "../../data/ingredientData";
import { useNavigate } from "react-router-dom";

export const MyIngredients = () => {
  const [hoveredIngredientId, setHoveredIngredientId] = useState(null);
  const [myIngredients, setMyIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [deleteIngredient, setDeleteIngredient] = useState("");
  const [units, setUnits] = useState([]);
  const [types, setTypes] = useState([]);
  const [updatedIngredient, setUpdatedIngredient] = useState({
    quantity: 0,
    ingredient: 0,
    unit: 0,
  });
  const navigate = useNavigate();
  //   creates reference for modal dialog tag
  const editIngredientModal = useRef();
  const deleteConfirmationModal = useRef();

  useEffect(() => {
    getCurrentUserIngredients().then((ingredientArr) => {
      setMyIngredients(ingredientArr);
    });
    getAllIngredients().then((ingredientArray) => {
      setIngredients(ingredientArray);
    });
    getAllUnits().then((unitArray) => {
      setUnits(unitArray);
    });
    allIngredientTypes().then((typesArray) => {
      setTypes(typesArray);
    });
  }, [updatedIngredient, deleteIngredient]);

  const handleInputChanges = (event) => {
    const updatedIngredientCopy = { ...updatedIngredient };
    if (event.target.name === "ingredient" || event.target.name === "unit") {
      updatedIngredientCopy[event.target.name] = {
        id: parseInt(event.target.value),
      };
    } else {
      updatedIngredientCopy[event.target.name] = parseInt(event.target.value);
    }
    setUpdatedIngredient(updatedIngredientCopy);
  };

  return (
    <div className="ingredient-view opacity-layer views">
      <dialog
        className="ingredient-edit-modal bg-white p-6 border-2 border-black rounded-lg "
        ref={deleteConfirmationModal}
      >
        <button
          className="text-xl absolute top-2 right-2 cursor-pointer hover:text-red-500"
          onClick={() => deleteConfirmationModal.current.close()}
          //This handles the X button (close button)
        >
          X
        </button>
        <h1 className="text-xl font-bold text-center mb-4">
          Are you sure you want to delete this ingredient from your inventory?
        </h1>
        <div className="w-full">
          <button
            className="btn mt-4 bg-green-200 border-2 border-green-300 rounded-md p-3 w-full font-semibold hover:bg-green-300"
            onClick={() => {
              deleteIngredientFromInventory(deleteIngredient).then(() => {
                setDeleteIngredient("");
                deleteConfirmationModal.current.close();
              });
            }}
          >
            Yes
          </button>
          <button
            className="btn bg-red-200 border-2 border-red-300 rounded-md p-3 w-full mt-2 font-semibold hover:bg-red-300"
            onClick={() => deleteConfirmationModal.current.close()}
            //handles the cancel button
          >
            No
          </button>
        </div>
      </dialog>
      <dialog
        className="ingredient-edit-modal bg-white p-6 border-2 border-black rounded-lg "
        ref={editIngredientModal}
      >
        <button
          className="text-xl absolute top-2 right-2 cursor-pointer hover:text-red-500"
          onClick={() => editIngredientModal.current.close()}
          //This handles the X button (close button)
        >
          X
        </button>
        <h1 className="text-xl font-bold text-center mb-4">
          Edit this ingredient
        </h1>
        <form
          className="flex flex-col gap-4 items-center"
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
                  checked={updatedIngredient.ingredient.id === ingredient.id}
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
              value={
                updatedIngredient.quantity ? updatedIngredient.quantity : ""
              }
              onChange={handleInputChanges}
            />
          </fieldset>
          <fieldset>
            <label>Unit</label>
            <select
              name="unit"
              value={
                updatedIngredient?.unit.id ? updatedIngredient.unit.id : ""
              }
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
          <div className="w-full">
            <button
              className="btn mt-4 bg-green-200 border-2 border-green-300 rounded-md p-3 w-full font-semibold hover:bg-green-300"
              onClick={() => {
                const finalIngredientObj = {
                  ingredient: updatedIngredient.ingredient.id,
                  quantity: updatedIngredient.quantity,
                  unit: updatedIngredient.unit.id,
                };
                editInventoryIngredient(
                  finalIngredientObj,
                  updatedIngredient.id
                ).then(() => {
                  setUpdatedIngredient({
                    quantity: 0,
                    ingredient: 0,
                    unit: 0,
                  });
                  editIngredientModal.current.close();
                });
              }}
              //handles the Ok button after editing
            >
              Ok
            </button>
            <button
              className="btn bg-red-200 border-2 border-red-300 rounded-md p-3 w-full mt-2 font-semibold hover:bg-red-300"
              onClick={() => editIngredientModal.current.close()}
              //handles the cancel button
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
      <div className="entire_ingredient_inventory flex  items-center justify-center bg-black">
        {types.map((typeObj) => {
          const filteredIngredients = myIngredients.filter(
            (ingredient) => ingredient.ingredient.type.id === typeObj.id
          );
          return (
            <div
              className="ingredients-container border border-emerald-300"
              key={typeObj.id}
            >
              <h1 className="type-header text-3xl text-emerald-300">
                {typeObj.label}
              </h1>
              {filteredIngredients.map((ingredient) => {
                return (
                  <div key={ingredient.id}>
                    <div
                      onMouseEnter={() => setHoveredIngredientId(ingredient.id)}
                      onMouseLeave={() => setHoveredIngredientId(null)}
                      className="individual-ingredient border border-emerald-300 h-24 w-52"
                    >
                      {hoveredIngredientId === ingredient.id ? (
                        <span>{ingredient.ingredient.healing_property}</span>
                      ) : (
                        <>
                          {ingredient.quantity} {ingredient?.unit.label} of{" "}
                          {ingredient.ingredient.label}
                        </>
                      )}
                      <button
                        className="delete_ingredient_button border border-emerald-300 p-3"
                        onClick={() => {
                          setDeleteIngredient(ingredient.id);
                          deleteConfirmationModal.current.showModal();
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="edit_ingredient_button border border-emerald-300 p-3"
                        onClick={() => {
                          setUpdatedIngredient(ingredient);
                          editIngredientModal.current.showModal();
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <button
        className="add_ingredient_button border border-emerald-300 p-3 "
        onClick={() => {
          navigate("/add-to-inventory");
        }}
      >
        Add Ingredient
      </button>
    </div>
  );
};
