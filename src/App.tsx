import { useEffect, useState } from "react"
import api from "./api"
import { Pokemon } from "./types";
import { POKEMON } from "./api";

import './index.css'

function App() {

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [name, setName] = useState('')
  const [flag, setFlag] = useState<boolean>(true)
  const [flagReset, setFlagReset] = useState(false)
  const initialHists = () => Number(localStorage.getItem('hits'));
  const initialErrors = () => Number(localStorage.getItem('errors'));
  const [hits, setHits] = useState(initialHists)
  const [errors, setErrors] = useState(initialErrors)
  const [dif, setdif] = useState<string>('')
  const [options, setOptions] = useState<any[]>([])

  const getPokemon = async () => {
    const randomPokemon = await api.random();
    setPokemon(randomPokemon);
    randomElement();
  }

  useEffect(() => {
    localStorage.setItem('hits', hits.toString())
    localStorage.setItem('errors', errors.toString())
  }, [hits, errors])

  useEffect(() => {
    getPokemon()
  }, [])

  useEffect(() => {
    randomElement();
  }, [pokemon])

  const setDifficult = (dificult: string) => {
    setdif(dificult)
    randomElement();
  }

  async function randomElement() {
    let randomElements: any = [];
    while (randomElements.length < 2) {
      const randomIndex = Math.floor(Math.random() * POKEMON.length);
      const randomElement = POKEMON[randomIndex];
      if (!randomElements.includes(randomElement)) {
        randomElements.push(randomElement);
      }
    }
    randomElements.push(await pokemon?.name);
    randomElements = (shuffleArray(randomElements))
    setOptions(randomElements);
  }

  function shuffleArray(array: any[]) {
    const newArray = [...array]; // Copia el arreglo original

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Genera un índice aleatorio entre 0 e i

      // Intercambia los elementos en las posiciones i y j
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  }

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
      setHits(hits + 1)
    }
    else {
      setFlag(false)
      setErrors(errors + 1)
    }
  }

  const validatorOptions = (name: string) => {
    if (pokemon?.name === name) {
      const img = document.getElementById('img')
      // const text = document.getElementById('text')
      if (img) {
        img.style.filter = "none"
        // text.style.display = ""
      }
      setFlagReset(true)
      setFlag(true)
      setHits(hits + 1)
    }
    else {
      setFlag(false)
      setErrors(errors + 1)
    }
  }

  const handleChange = (e: any) => {
    const modifiedString = e.currentTarget.value.replace(".", "");
    setName(modifiedString.toLowerCase().replace(/\s/g, ''))
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      validatorText();
    }
  };


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
      {
        dif === '' ?
          <div>
            <span className="nes-text text">Selecciona la dificultad</span>
            <div className="nes-container is-rounded is-dark containerInput">
              <button type="button" className="nes-btn is-primary" onClick={() => setDifficult('easy')}>Facil</button>
              <button type="button" className="nes-btn is-warning" onClick={() => setDifficult('medium')}>Medio</button>
              <button type="button" className="nes-btn is-error" onClick={() => setDifficult('hard')}>Dificil</button>
            </div>
          </div>
          :
          <div>
            <div className="nes-table-responsive container-table">
              <table className="nes-table is-bordered ">
                <thead>
                  <tr>
                    <th>Aciertos</th>
                    <th>Errores</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{hits}</td>
                    <td>{errors}</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
                  {
                    dif === 'easy' ?
                      <div className="nes-field containerInput">
                        {
                          options.map((item, index) => (
                            <button style={{ marginRight: '10px' }} type="button"
                              className="nes-btn is-primary" onClick={() => validatorOptions(item)} key={index}>{item}</button>
                          ))
                        }
                      </div>
                      :
                      <div>
                        {
                          dif === 'medium' ?
                            <div className="nes-field containerInput">
                              <input type="text" id="name_field" className="nes-input"
                                value={name}
                                onChange={(e) => handleChange(e)}
                                onKeyDown={handleKeyPress} />
                              <button type="button" className="nes-btn is-primary" onClick={validatorText}>Adivinar</button>
                              <button type="button" className="nes-btn is-warning" onClick={getPokemon}>Saltar</button>
                            </div>
                            :
                            <div className="nes-field containerInput">
                              <input type="text" id="name_field" className="nes-input"
                                value={name}
                                onChange={(e) => handleChange(e)}
                                onKeyDown={handleKeyPress} />
                              <button type="button" className="nes-btn is-primary" onClick={validatorText}>Adivinar</button>
                            </div>
                        }
                      </div>


                  }

                </div>
            }
          </div>
      }
    </main>
  )

}

export default App
