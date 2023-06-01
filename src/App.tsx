import { useEffect, useState } from "react"
import api, { POKEMON } from "./api"
import { Pokemon } from "./types";

import './index.css'

function App() {

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [name, setName] = useState('')
  const [flag, setFlag] = useState<boolean>(true)

  const getPokemon = async () => {
    const randomPokemon = await api.random();
    setPokemon(randomPokemon);
    console.log(randomPokemon)
  }

  useEffect(() => {
    getPokemon()
  }, [])

  const validatorText = () => {
    if (pokemon?.name === name) {
      const img = document.getElementById('img')
      const text = document.getElementById('text')
      if (img && text) {
        img.style.filter = "none"
        text.style.display = ""
      }
    }
    else{
      setFlag(false)
    }
  }


  return (
    <main>
      <span className="nes-text text">Quien es este Pokemon?</span>
      {pokemon ?
        <div className="containerImg">
          <img id="img" src={pokemon.image} />
          <span id="text" className="nes-text is-primary" style={{ paddingBottom: "20px" , display:"none" }}>{pokemon?.name}</span>
        </div>
        :
        <></>
      }
      {
        flag ?
          <></>
          :
          <span className="nes-text is-error" style={{ paddingBottom: "20px" }}>Intenta de nuevo</span>
      }
      <div className="nes-field containerInput">
        <input type="text" id="name_field" className="nes-input"
          value={name}
          onChange={(event) => setName(event.target.value)} />
        <button type="button" className="nes-btn is-primary" onClick={validatorText}>Adivinar</button>
      </div>
    </main>
  )

}

export default App
