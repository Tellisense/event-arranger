//React Imports
import React, { useState, useEffect } from "react"
import "./css/card-component.css"
import "./css/index.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

//Page Imports
import HomePage from "./views/HomePage"
import PhotographerPage from "./views/PhotographerPage"
import MusicianPage from "./views/MusicianPage"
import HallPage from "./views/HallPage"
import DecorePage from "./views/DecorePage"
import CatererPage from "./views/CatererPage"
import LoginPage from "./views/LoginPage"

//Page Imports Later Use
import LogoutPage from "./views/LogoutPage"
import SignupPage from "./views/SignupPage"
import AccountPage from "./views/AccountPage"

function App() {

  const navSlide = () => {
    const burger = document.querySelector(".main-div-burger")
  	const nav = document.querySelector(".main-div-links")
  	const navLinks = document.querySelectorAll(".main-div-links li")

    nav.classList.toggle("nav-active")
  
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ""
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .5 }s`
      }
    })
  
    burger.classList.toggle("toggle")
  }

  const checkScreenSize = () => {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      navSlide()
    } else {
    }
  }

  return (
    <Router>
      <div>
        <div className="main">
          <div className="main-div-logo">
            <Link to="/">Event Arranger</Link>
          </div>

          <ul className="main-div-links">
            <li><Link onClick={checkScreenSize} to="/HomePage">Home</Link></li>
            <li><Link onClick={checkScreenSize} to="/PhotographerPage">Photographer</Link></li>
            <li><Link onClick={checkScreenSize} to="/MusicianPage">Musician</Link></li>
            <li><Link onClick={checkScreenSize} to="/HallPage">Hall</Link></li>
            <li><Link onClick={checkScreenSize} to="/DecorePage">Decore</Link></li>
            <li><Link onClick={checkScreenSize} to="/CatererPage">Caterer</Link></li>
            <li><Link onClick={checkScreenSize} to="/LoginPage">Login</Link></li>
          </ul>

          <div className="main-div-burger" onClick={navSlide}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div> 
        </div>

        <Switch>
        <Route path="/LoginPage">
            <LoginPage />
          </Route>
          <Route path="/CatererPage">
            <CatererPage />
          </Route>
          <Route path="/DecorePage">
            <DecorePage />
          </Route>
          <Route path="/HallPage">
            <HallPage />
          </Route>
          <Route path="/MusicianPage">
            <MusicianPage />
          </Route>
          <Route path="/PhotographerPage">
            <PhotographerPage />
          </Route>
          <Route path="/HomePage">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
