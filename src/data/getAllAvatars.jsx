export const getAllAvatars = () => {
  return fetch("http://localhost:8000/avatars").then((res) => res.json());
};
