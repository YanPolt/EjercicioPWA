import React from "react";

const MarvelCaracter = ({ name, img }) => {
  return (
    <div className="card">
      <img className="card-img-top" src={img} alt="card" />
      <div className="card-body">
        <h5>{name}</h5>
      </div>
    </div>
  );
};

export default MarvelCaracter;
