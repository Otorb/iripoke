import React, { useState, useEffect } from "react";
import { useNavigate, Link  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPokemon } from '../../redux/action'
import './Create.css'

function Create() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allTypes = useSelector((state) => state.types);

    useEffect(() => {
        dispatch(getTypes());
      }, [dispatch]);

      const [input, setInput] = useState({
        name: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        img: "",
        types: [],
      });

      function handleChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      }
      function handleSelect(e) {
        setInput({
          ...input,
          types: [...input.types, e.target.value],
        });
      }
      function handleSubmit(e) {
        e.preventDefault();
        if (
          !input.name ||
          !input.life ||
          !input.attack ||
          !input.defense ||
          !input.speed ||
          !input.height ||
          !input.weight ||
          !input.img
        ) {
          return alert(
            "Faltan datos si no tienes un link para tu imagen usa este https://cdn.streamloots.com/uploads/5eb3db772a3fcd0035f7ff40/10172dc2-f05e-4804-948f-94ec8a1747ce.gif"
          );
        } else if(
          input.life > 100 ||
          input.attack > 100 ||
          input.defense > 100  ||
          input.speed > 100 ||
          input.height > 100 ||
          input.weight > 100 )
          {
           return alert ('el maximo es de 100 mas de eso imposible')
        }else {
          dispatch(postPokemon(input));
          alert("creaste un pokemon");
          setInput({
            name: "",
            life: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            img: "",
            types: [],
          });
          navigate("/");
        }
      }
  return (
    <div>
      <div className="formulario">
        <div className="title-form">
          <h1>Create your own Pokemon!</h1>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <input
            name="name"
            placeholder="Name *"
            value={input.name}
            onChange={(e) => handleChange(e)}
          />

          <input
            type="number" min="0" max="100" 
            name="life"
            placeholder="Life *"
            value={input.life}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="number" min="0" max="100" 
            name="attack"
            placeholder="Attack *"
            value={input.attack}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="number"
            name="defense" min="0" max="100" 
            placeholder="Defense *"
            value={input.defense}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="number" min="0" max="100" 
            name="speed"
            placeholder="Speed *"
            value={input.speed}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="number" min="0" max="100" 
            name="height"
            placeholder="Height *"
            value={input.height}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="number" min="0" max="100" 
            name="weight"
            placeholder="Weight *"
            value={input.weight}
            onChange={(e) => handleChange(e)}
          />
          <input
            name="img"
            placeholder="Img"
            value={input.img}
            onChange={(e) => handleChange(e)}
          />
          
          {input.speed === "" ? (
            <p style={{ color: "red" }}>los campos con asteriscos con Obligatorios</p>
          ) : null}
          <h4>Types</h4>

          <select className="form" onChange={(e) => handleSelect(e)}>
            {allTypes.map((e) => {
              return <option value={e.name}>{e}</option>;
            })}
          </select>
          <select className="form" onChange={(e) => handleSelect(e)}>
            {allTypes.map((e) => {
              return <option value={e.name}>{e}</option>;
            })}
          </select>
          <div className="created">
            <button type="submit">Ready</button>
          </div>
        </form>
        <Link to={`/`}>
        <button>Volver</button>
        </Link>
      </div>
    </div>
  )
}

export default Create
