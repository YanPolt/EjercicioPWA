import React, { useState, useEffect } from "react";
import "./Marvel.css";
import MarvelCaracter from "./MarvelCaracter";
import md5 from "md5";

const Marvel = () => {
  const [caracteres, setCaracteres] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("marvel-characters") === null) {
        setCaracteres("Loading ...");
      } else {
        setCaracteres(JSON.parse(localStorage.getItem("marvel-characters")));
      }
    } else {
      const ts = "" + Math.round(new Date().getTime() / 1000);
      const publicKey = "de9de126c625014b9685935b5ffc448f";
      const privateKey = "27dd8dbce827946ab93bb2629d97ad7884f31b8e";
      const hash = md5(ts + privateKey + publicKey);
      const URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&hash=${hash}&apikey=${publicKey}`;
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          setCaracteres(data.data.results);
          localStorage.setItem(
            "marvel-characters",
            JSON.stringify(data.data.results)
          );
        });
    }
  }, []);

  return (
    <div className="Gallery">
      <div className="lista">
        {caracteres &&
          caracteres.map((caracter) => (
            <MarvelCaracter
              key={caracter.id}
              name={caracter.name}
              img={
                caracter.thumbnail.path +
                "/landscape_amazing." +
                caracter.thumbnail.extension
              }
            />
          ))}
      </div>
    </div>
  );
};

export default Marvel;
