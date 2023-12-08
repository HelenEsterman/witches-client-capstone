import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Authorized } from "./components/auth/Authorized";
import { Home } from "./components/Home";
import { Spells } from "./components/spells/Spells";
import { MyIngredients } from "./components/ingredients/MyIngredients";
import { SpellDetails } from "./components/spells/SpellDetails";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Authorized />}>
        <Route path="/" element={<Home />} />
        <Route path="/spells">
          <Route index element={<Spells />} />
          <Route path=":spellId" element={<SpellDetails />} />
        </Route>
        <Route path="/my-ingredients" element={<MyIngredients />} />
      </Route>
    </Routes>
  );
}

export default App;
