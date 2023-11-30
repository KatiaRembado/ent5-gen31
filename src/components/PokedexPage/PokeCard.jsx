import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import './styles/PokeCard.css'

export const PokeCard = ({ url }) => {

    const [infoPoke, getInfoPoke] = useFetch(url)

    useEffect(() => {
        getInfoPoke()
    }, [])

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/pokedex/${infoPoke.id}`)
    }

    const firstType = infoPoke?.types[0].type.name

    return (
        <article className={`pokecard ${firstType}-border`} onClick={handleNavigate}>
            <header className={`pokecard__header ${firstType}-gradient`}>
                <img className="pokecard__image" src={infoPoke?.sprites.other['official-artwork'].front_default} alt="" />
            </header>
            <section className="pokecard__body">
                <h3 className={`pokecard__name ${firstType}-color`}>{infoPoke?.name}</h3>
                <ul className="pokecard__types">
                    {
                        infoPoke?.types.map(infoType => (
                            <li className="pokecard__typename" key={infoType.type.url}>{infoType.type.name}</li>
                        ))
                    }
                </ul>
                <hr className="pokecard__hr" />
                <ul className="pokecard__stats">
                    {
                        infoPoke?.stats.map(infoStat => (
                            <li className="pokecard__stat" key={infoStat.stat.url}>
                                <h4 className="pokecard__stat__name">{infoStat.stat.name}</h4>
                                <span className={`pokecard__stat__value ${firstType}-color`}>{infoStat.base_stat}</span>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </article>
    )
}
