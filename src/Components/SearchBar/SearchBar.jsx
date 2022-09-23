import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../../redux/action";
import { useParams } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  let [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      return alert("El campo no puede estar vacio");
    } else {
      return dispatch(getNamePokemon(name));
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Pokemon Name"
        value={name}
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
