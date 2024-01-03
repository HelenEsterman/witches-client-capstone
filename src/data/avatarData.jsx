export const getAllAvatars = () => {
  return fetch("http://localhost:8000/avatars").then((res) => res.json());
};

export const getAllAvatarsAuthenticated = () => {
  return fetch("http://localhost:8000/avatars", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("witches_token")).token
      }`,
    },
  }).then((res) => res.json());
};
