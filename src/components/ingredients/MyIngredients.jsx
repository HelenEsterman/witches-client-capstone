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
import { Loading } from "../Loading";
import Select from "react-select";

export const MyIngredients = ({ setShowNavbar }) => {
  const [loading, setLoading] = useState(true);
  const [hoveredIngredientId, setHoveredIngredientId] = useState(null);
  const [myIngredients, setMyIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientSelectChoices, setIngredientSelectChoices] = useState();
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
    const ingredientOptions = ingredients.map((ingredient) => ({
      label: ingredient.label,
      value: ingredient.id,
      target: { name: "ingredient", value: ingredient.id },
    }));
    setIngredientSelectChoices(ingredientOptions);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [updatedIngredient, deleteIngredient]);

  const handleInputChanges = (event) => {
    const updatedIngredientCopy = { ...updatedIngredient };
    if (event.target.name === "unit") {
      updatedIngredientCopy[event.target.name] = {
        id: parseInt(event.target.value),
      };
    } else if (event.target.name === "ingredient") {
      updatedIngredientCopy[event.target.name] = {
        id: event.target.value,
      };
    } else {
      updatedIngredientCopy[event.target.name] = parseInt(event.target.value);
    }
    setUpdatedIngredient(updatedIngredientCopy);
  };

  return (
    <>
      {loading === true ? (
        <Loading setShowNavbar={setShowNavbar} />
      ) : (
        <div className="ingredient-view opacity-layer overflow-auto">
          <dialog className="dialog-css bg-black" ref={deleteConfirmationModal}>
            <button
              className="text-xl absolute top-2 right-10 cursor-pointer hover:text-indigo-400"
              onClick={() => deleteConfirmationModal.current.close()}
              //This handles the X button (close button)
            >
              X
            </button>
            <h1 className="text-center mt-10 mb-8 font-custom text-emerald-500 black-text-shadow text-4xl">
              Are you sure you want to delete this ingredient from your
              inventory?
            </h1>
            <div className="w-full flex flex-col items-center">
              <button
                className="btn bg-emerald-900 border-2 border-emerald-300 rounded-3xl hover:bg-emerald-300 font-custom h-11 w-20 text-2xl"
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
                className="btn bg-red-200 border-2 border-red-300 rounded-3xl font-custom h-11 w-20 text-2xl hover:bg-red-300 mt-4"
                onClick={() => deleteConfirmationModal.current.close()}
                //handles the cancel button
              >
                No
              </button>
            </div>
          </dialog>
          <dialog
            className="ingredient-edit-modal bg-black rounded-3xl "
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
                <Select
                  options={ingredientSelectChoices}
                  onChange={handleInputChanges}
                  value={{
                    label: updatedIngredient?.ingredient.label
                      ? updatedIngredient.ingredient.label
                      : "",
                    value: updatedIngredient?.ingredient.id
                      ? updatedIngredient.ingredient.id
                      : "",
                  }}
                />
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
          <h1 className="mb-10 font-custom text-4xl text-white">
            Hover over ingredients to see their healing properties!
          </h1>
          <div className="entire_ingredient_inventory flex flex-wrap">
            {types.map((typeObj) => {
              const filteredIngredients = myIngredients.filter(
                (ingredient) => ingredient.ingredient.type.id === typeObj.id
              );
              return (
                <div
                  key={typeObj.id}
                  className="relative ingredients-container"
                >
                  <h1 className="type-header font-custom text-6xl text-indigo-400 font-semibold black-text-shadow">
                    {typeObj.label}
                  </h1>
                  <img
                    src="https://images.rawpixel.com/image_transparent_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zNV8zZF9pbGx1c3RyYXRpb25fb2ZfYV9tYWdpY19wb3Rpb25faWNvbl9tYXR0ZV9lNzA5M2Q2MS1mNDEwLTQyNjYtYTZjMy0wMWM1M2RhNzMwM2IucG5n.png"
                    alt="potion"
                    className="ingredient-bg opacity-70"
                  />
                  <div className="ingredient-div absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-emerald-500 black-text-outline font-bold font-custom z-2 mt-32">
                    {filteredIngredients.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className="individual-ingredient-div"
                      >
                        <div
                          onMouseEnter={() =>
                            setHoveredIngredientId(ingredient.id)
                          }
                          onMouseLeave={() => setHoveredIngredientId(null)}
                          className="individual-ingredient"
                        >
                          {hoveredIngredientId === ingredient.id ? (
                            <span>
                              {ingredient.ingredient.healing_property}
                            </span>
                          ) : (
                            <>
                              {ingredient.quantity} {ingredient?.unit.label} of{" "}
                              {ingredient.ingredient.label}
                            </>
                          )}
                          <button
                            className="delete_ingredient_button p-3 black-text-outline"
                            onClick={() => {
                              setDeleteIngredient(ingredient.id);
                              deleteConfirmationModal.current.showModal();
                            }}
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </button>
                          <button
                            className="edit_ingredient_button p-3 black-text-outline"
                            onClick={() => {
                              setUpdatedIngredient(ingredient);
                              editIngredientModal.current.showModal();
                            }}
                          >
                            <i className="fa-regular fa-pen-to-square"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="add_ingredient_button font-custom text-3xl text-white bg-emerald-900 purple-box-shadow p-3 rounded-3xl mb-14 hover:bg-emerald-300"
            onClick={() => {
              navigate("/add-to-inventory");
            }}
          >
            Add Ingredient
          </button>
        </div>
      )}
    </>
  );
};
