import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from '../../redux/action'
import detal from '../../assets/detal.gif'
import './Detail.css'



function Detail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    
    const detail = useSelector((state) => state.detail);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        dispatch(getDetail(id));
        setLoader(true);
        setTimeout(() => {
          setLoader(false);
        }, 1500);
      }, []);
    
  return (
    <div>
      <div className="detail">
        {loader ? (
          <img
            className="carga"
            src={detal}
          />
        ) : (
          <div className="bloques">
            <div className="containerText">
              <p>
                <b className="bb">Name: </b>
                <span className="pp">{detail.name}</span>
              </p>
              <p>
                <b className="bb">⭐ Life: </b>
                <span className="pp">{detail.life}</span>
              </p>
              <p>
                <b className="bb"> Attack: </b>
                <span className="pp">{detail.attack}</span>
              </p>
              <p>
                <strong className="bb">🏹 Defense: </strong>
                <span className="pp">{detail.defense}</span>
              </p>
              <p>
                <strong className="bb">👾 Speed: </strong>
                <span className="pp">{detail.speed}</span>
              </p>
            </div>
            
            <div className="contDescription">
              <img
                src={detail.img}
                alt=""
                className="pero"
                width="200px"
                height="150px"
              />
              <h2>{detail.name}</h2><br />
              <h3 className="titleDescription">📖Types:</h3>
              <p dangerouslySetInnerHTML={{ __html: detail.types }} />
             
            </div>
            <Link to={`/`}><button>Volver</button></Link>
          </div>
           
        )}
        
      </div>
     
    </div>
  )
}

export default Detail
