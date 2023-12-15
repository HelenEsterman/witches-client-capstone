export const getAllSpells = () => {
  return fetch("http://localhost:8000/spells", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("witches_token")).token
      }`,
    },
  }).then((res) => res.json());
};

export const getSpellById = (spellId) => {
  return fetch(`http://localhost:8000/spells/${spellId}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("witches_token")).token
      }`,
    },
  }).then((res) => res.json());
};
