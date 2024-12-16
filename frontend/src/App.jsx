import React, { useState, useContext } from 'react'
import SideMenu from "./components/SideMenu.jsx"
import Search from "./components/Search.jsx"
import RecipeContainer from "./components/RecipeContainer.jsx"
import RecipeViewer from './components/RecipeViewer.jsx'
import { useForm } from "./hooks/useForm"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppState } from './components/context/AppState.jsx'
import "./css/App.css"
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { ProtectedRoute } from "./routes.jsx"
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import { RecipesProvider } from './context/RecipesContext.jsx'
import { Navbar } from './components/Navbar.jsx'

const App = () => {
  const [CategorySelected, setCategorySelected] = useState("All")
  const { formState, onInputChange } = useForm({ recipe: '' })
  //const { isAuthenticated } = useAuth(); // Obtén el estado de autenticación

  const ShowNavbar = () => {
    //const location = useLocation();
    //const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
    
    const { isAuthenticated } = useAuth(); // Obtén el estado de autenticación
    return isAuthenticated ? null : (<Navbar/>);
    
  }

  const ShowSideMenu = () => {
    const { isAuthenticated } = useAuth(); // Obtén el estado de autenticación

    return isAuthenticated ? (<SideMenu
      CategorySelected={CategorySelected}
      setCategorySelected={setCategorySelected}
    />) : null;
  }

  /*
  const AuthClass = () => {
    const { isAuthenticated } = useAuth(); // Obtén el estado de autenticación
    return isAuthenticated;
  }
  */

  return (
    <AuthProvider>
      <RecipesProvider>
        <AppState>
          <FavoritesProvider> 
            <Router>
              <div className={'app-container'}> 
                <ShowNavbar />
                <ShowSideMenu/>
                <div className="main-container">
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route element={<ProtectedRoute />}> 
                      <Route
                        path='/'
                        element={
                          <>
                            <div className="">
                              <Search
                                formState={formState}
                                onInputChange={onInputChange}
                              />

                              <RecipeContainer
                                recipeSearch={formState.recipe}
                                CategorySelected={CategorySelected}
                                setCategorySelected={setCategorySelected}
                              />
                            </div>
                          </>
                        }
                      />
                      <Route path='/:id' element={<RecipeViewer />} />
                      <Route path="/favorites" element={<FavoritesPage />} />
                    </Route>

                  </Routes>
                </div>
              </div>
            </Router>
          </FavoritesProvider>
        </AppState>
      </RecipesProvider>
    </AuthProvider>
  )
}

export default App