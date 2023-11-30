import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import { PokeCard } from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import './styles/PokedexPage.css'
import { paginateData } from "../utils/pagination"

const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('allPokemons')
  const [currentPage, setCurrentPage] = useState(1)
 


const trainerName = useSelector(store => store.trainerName)

const url = 'https://pokeapi.co/api/v2/pokemon?limit=200'
const [ pokemons, getPokemons, getByTypePokemons] = useFetch(url)

useEffect(() => {
  if(selectValue === 'allPokemons') {
    getPokemons()
  } else {
    getByTypePokemons(selectValue)
  }
}, [selectValue])

const inputSearch = useRef()

const handleSubmit = e => {
  e.preventDefault()
  setInputValue(inputSearch.current.value.toLowerCase().trim())
  inputSearch.current.value = ''
}

const cbFilter = (poke) => {
  const nameFiltered = poke.name.includes(inputValue)
  return nameFiltered
}

const { itemsInCurrentPage, lastPage, pagesInCurrentBlock } = paginateData(
  inputValue, 
  currentPage
  )


  return (
    <div className="pokedex">
      <header className="pokedex__header">
        <img className="pokedex__image" src="../logo.png" alt="" />
      </header>
        <p className="pokedex__welcome">Welcome <span>{ trainerName }</span>, here you can find your favorite pokemon. Let's go!</p>
        <form className="pokedex__form" onSubmit={handleSubmit}>
          <div>
          <input className="pokedex__input" ref={inputSearch} type="text" />
          <button className="pokedex__btn">Search</button>
          </div>
        <div className="pokedex__types">
        <SelectType 
        setSelectValue={setSelectValue}
        />
        </div>
        </form>
        {/* pagination */}
        <ul>
          {pagesInCurrentBlock.map((page) => (
            <li key={page}>{page}</li>
          ))}
        </ul>
        <div className="pokedex__cards">
          {
            pokemons?.results.filter(cbFilter).map(poke => (
              <PokeCard
              key={poke.url}
              url={poke.url}
              />
            ))

          }
        </div>
    </div>
  )
}

export default PokedexPage