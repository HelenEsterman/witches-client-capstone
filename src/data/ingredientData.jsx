export const getCurrentUserIngredients = () => {
  return fetch("http://localhost:8000/myIngredients", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("witches_token")).token
      }`,
    },
  }).then((res) => res.json());
};
