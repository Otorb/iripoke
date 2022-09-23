import React from "react";
import { Link } from "react-router-dom";
import './Card.css'


function Card({ id, img, name,  }) {
  return (
    <div className="card">
      <div className="card2">
     
      <img className="img" src={img} alt={name} />
        
        <h2 className="cardName">{name}</h2>
        <Link to={`/${id}`}>
        <button>ver detalle</button>
        
        </Link>
      </div>
    </div>
  );
}

export default Card;
