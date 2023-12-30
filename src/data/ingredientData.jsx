export const getCurrentUserIngredients = () => {
  return fetch("http://localhost:8000/myIngredients", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("witches_token")).token
      }`,
    },
  }).then((res) => res.json());
};

export const getAllIngredients = () => {
  return fetch("http://localhost:8000/ingredients", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("witches_token")).token
      }`,
    },
  }).then((res) => res.json());
};

export const getAllUnits = () => {
  return fetch("http://localhost:8000/units", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("witches_token")).token
      }`,
    },
  }).then((res) => res.json());
};

export const postInventoryIngredient = (newIngredient) => {
  const postOptions = {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("witches_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newIngredient),
  };
  return fetch("http://localhost:8000/myIngredients", postOptions);
};

export const editInventoryIngredient = (updatedIngredient, ingredientId) => {
  const putOptions = {
    method: "PUT",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("witches_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedIngredient),
  };
  return fetch(
    `http://localhost:8000/myIngredients/${ingredientId}`,
    putOptions
  );
};

export const allIngredientTypes = () => {
  return fetch("http://localhost:8000/types", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("witches_token")).token
      }`,
    },
  }).then((res) => res.json());
};

export const deleteIngredientFromInventory = (ingredientId) => {
  return fetch(`http://localhost:8000/myIngredients/${ingredientId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("witches_token")).token
      }`,
    },
  });
};
