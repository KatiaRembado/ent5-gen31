import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect, useState } from "react"
import axios from "axios"
import './styles/PokeInfoPage.css'

const PokeInfoPage = () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=200'
  const [pokemon, setPokemon] = useState(null)
  const [infoPoke, getInfoPoke] = useFetch(url)

  const firstType = infoPoke?.types[0].type.name

  const { id } = useParams()

  const getPercentStat = (statValue) => {
    const maxStatValue = 255
    const percentStat = ((statValue * 100) / maxStatValue).toFixed(1)
    return `${percentStat}%`
  }


  useEffect(() => {
    axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(({ data }) => setPokemon(data))
    .catch((err) => console.log(err))
  }, [])

  console.log(pokemon)

  return (
    <div className="pokeinfo">
      <header className="pokeinfo__header">
        <img className="pokeinfo__image" src="../logo.png" alt="" />
      </header>
      <div className="pokeinfo__main">
      <article className="pokeinfo__article">
        <div className="pokeinfo__image-div ">
      <img  src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
        </div>
        <h3>#{pokemon?.id}</h3>
      <h2>{pokemon?.name}</h2>
      <div>
        <h3>Type</h3>
        <div>
          <h4>
            <span>{`${firstType}`}</span>
          </h4>
        </div>
      </div>
      <div>
        <h3>Abilities</h3>
      </div>
      <h4>{infoPoke?.abilities.map((ability) => (
      <ul>{`${firstType}`} key={ability.ability.name}
      <div>
          <h5>{ability.ability.name}</h5>
        </div>
      </ul>
      ))}
      </h4>
      <section className="pokeinfo__section">
        <h3 className="pokeinfo__stats">Stats</h3>
        <ul className="pokeinfo__ul">
          {
            pokemon?.stats.map((stat) => 
            <li className="pokeinfo__li"  key={stat.stat.name}>
              <div className="pokeinfo__divstats">
                <h5>{stat.stat.name}</h5>
                <span>{stat.base_stat}/255</span>
              </div>
              <div style={{ width: getPercentStat(stat.base_stat) }} className="pokeinfo__barprogress">
                <div></div>
              </div>
            </li>  )
          }
        </ul>
      </section>
      </article>
      </div>
    </div>
  )
}

export default PokeInfoPage