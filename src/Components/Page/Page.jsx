import React from "react";
import "./Page.css";

function Page({ pokemonsPerPage, pokemons, paginado, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(pokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="forma">
      <ul className="lista">
        <li className="number">
          {pageNumbers.length >= 2 && currentPage !== 1 ? (
            <p onClick={() => paginado(currentPage - 1)}>prev</p>
          ) : null}
        </li>
        <li className="number">
          <a>{currentPage}</a>
        </li>
        <li className="number">
          {pageNumbers.length > 1 && currentPage !== pageNumbers.length ? (
            <p onClick={() => paginado(currentPage + 1)}>next</p>
          ) : null}
        </li>
      </ul>
    </div>
  );
}

export default Page;
