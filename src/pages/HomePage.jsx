import { useRef } from "react"
import { setTrainerName } from "../store/slices/trainerName.slice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import './styles/HomePage.css'

const HomePage = () => {

const inputName = useRef()

const dispatch = useDispatch()

const navigate = useNavigate()

const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainerName(inputName.current.value.trim()))
    navigate('/pokedex')
}

  return (
    <main className="home__main">
      <section className="home__section">
    <div className="home__div">
      <img className="home__image" src="../logo.png" alt="" />
        <h2 className="home__h2">Hi Trainer!</h2>
        <p className="home__p">To start, please give me your trainer name</p>
        <form className="home__form" onSubmit={handleSubmit}>
            <input className="home__input" ref={inputName} type="text" />
            <button className="home__btn">Catch them all!</button>
        </form>
    </div>
      </section>
      <footer className="home__footer">
      <div className="home__footer-red">
      </div>
      </footer>
    </main>
  )
}

export default HomePage