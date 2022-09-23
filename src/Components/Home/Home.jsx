import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon, orderName } from "../../redux/action";
import { Link } from "react-router-dom";
import Page from "../Page/Page";
import loading from "../../assets/poke.gif";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";

function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(10);
  const iLastPokemon = currentPage * pokemonsPerPage;
  const iFirstPokemon = iLastPokemon - pokemonsPerPage;

  const currentPokemons = pokemons.slice(iFirstPokemon, iLastPokemon);

  const paginado = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  useEffect(() => {
    dispatch(getPokemon());
  }, []);

  const [orden, setOrden] = useState("");

  function handlerSort(e) {
    e.preventDefault(e);
    dispatch(orderName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <h1 className="tuclase">Welcome to the PokeApi Iri</h1>
      <Link to={`/create`}>
        <button>Crea tu pokemon</button>
        
        </Link>

      <SearchBar />
      <Page
        currentPage={currentPage}
        pokemonsPerPage={pokemonsPerPage}
        pokemons={pokemons.length}
        paginado={paginado}
      />
      <select onChange={(e) => handlerSort(e)}>
        <option value="asc">Asendente</option>
        <option value="desc">Desendente</option>
      </select>

      {!pokemons.length && (
        <div className="desapare">
          <img src={loading} alt="wait" className="carga" />
          <p>Loading...</p>
        </div>
      )}

      <div className="contentWrapper">
        {currentPokemons?.map((v) => {
          return (
            <Card
              id={v.id}
              key={v.id}
              name={v.name}
              img={v.img}
              types={v.types}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
