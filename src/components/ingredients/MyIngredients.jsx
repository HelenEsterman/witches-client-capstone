import { useEffect, useState } from "react";
import { getCurrentUserIngredients } from "../../data/ingredientData";

export const MyIngredients = () => {
  const [myIngredients, setMyIngredients] = useState([]);

  useEffect(() => {
    getCurrentUserIngredients().then((ingredientArr) => {
      setMyIngredients(ingredientArr);
    }, []);
  }, []);
  return (
    <div>
      {myIngredients.map((ingredient) => {
        return <div key={ingredient.id}>{ingredient.label}</div>;
      })}
    </div>
  );
};
