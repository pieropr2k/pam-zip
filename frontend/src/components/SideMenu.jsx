import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../components/context/AppContext'
import "../css/components-css/SideMenu.css"
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const SideMenu = ({ CategorySelected, setCategorySelected }) => {

  const categories = ['All', 'Dessert', 'Pasta', 'Seafood', 'Starter', 'Vegetarian', 'Breakfast']

  const {isMenu} = useContext(AppContext)
  const {logout} = useAuth();


  const showMenu = ()=> {
    document.querySelector('.categories-container').classList.toggle('active')
  }

  return (
    <aside className={`aside-container ${isMenu? '' : 'hide'}`}>
      <h1>UNI.COOK</h1>
      <button className="hamburger-menu" onClick={showMenu}>☰</button>
      <ul className='categories-container'>

        {categories.map((category, index) => (
          <li
            key={index}
            className={CategorySelected === category ? 'selected' : ''}
            onClick={() => {
              setCategorySelected(category)
            }}
          >
            {category}
          </li>
        ))}
        <Link to={'/favorites'}><li>Favorites</li></Link>
        
      </ul>
      <button onClick={logout}>Logout</button>
    </aside>
  )
}

export default SideMenu