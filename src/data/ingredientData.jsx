export const getCurrentUserIngredients = () => {
  return fetch("http://localhost:8000/witchIngredients?owner=current", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("witches_token")).token
      }`,
    },
  }).then((res) => res.json());
};
