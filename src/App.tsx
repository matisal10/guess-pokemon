import { useEffect, useState } from "react"
import api, { POKEMON } from "./api"
import { Pokemon } from "./types";

import './index.css'

function App() {

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [name, setName] = useState('')
  const [flag, setFlag] = useState<boolean>(true)
  const [flagReset, setFlagReset] = useState(false)

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
      // const text = document.getElementById('text')
      if (img) {
        img.style.filter = "none"
        // text.style.display = ""
      }
      setFlagReset(true)
      setFlag(true)
    }
    else {
      setFlag(false)
    }
  }

  const handleChange = (e: any) => {
    const modifiedString = e.currentTarget.value.replace(".", "");
    // console.log(modifiedString.toLowerCase().replace(/\s/g, ''))
    setName(modifiedString.toLowerCase().replace(/\s/g, ''))
  }

  const reset = () => {
    const img = document.getElementById('img')
    // const text = document.getElementById('text')
    if (img) {
      img.style.filter = "brightness(0.0)"
      // text.style.display = "none"
      setFlag(true)
      setName('')
      getPokemon()
      setFlagReset(false)
    }
  }


  return (
    <main >

      {pokemon ?
        <div className="containerImg">
          {/* <span id="text" className="nes-text " style={{ display: "none" }}>{pokemon?.name}</span> */}
          <img id="img" src={pokemon.image} />

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
      {
        flagReset ?
          <div className="nes-container is-rounded is-dark containerReset">
            <span className="nes-text ">Muy bien, Adivinaste!</span>
            <button type="button" className="nes-btn " onClick={reset}>Volver A Jugar</button>

          </div>
          :
          <div>
            <span className="nes-text text">Quien es este Pokemon?</span>
            <div className="nes-field containerInput">
              <input type="text" id="name_field" className="nes-input"
                value={name}
                onChange={(e) => handleChange(e)} />
              <button type="button" className="nes-btn is-primary" onClick={validatorText}>Adivinar</button>
            </div>
          </div>
      }
    </main>
  )

}

export default App
