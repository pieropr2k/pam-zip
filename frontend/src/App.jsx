import React, { useState } from 'react';
import SideMenu from './components/SideMenu.jsx';
import Search from './components/Search.jsx';
import RecipeContainer from './components/RecipeContainer.jsx';
import RecipeViewer from './components/RecipeViewer.jsx';
import { useForm } from './hooks/useForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppState } from './components/context/AppState.jsx';
import './css/App.css';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProtectedRoute } from './routes.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import { RecipesProvider } from './context/RecipesContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { useAuth } from './context/AuthContext.jsx';

const ShowNavbar = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? null : <Navbar />;
};

const ShowSideMenu = ({ categorySelected, setCategorySelected }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <SideMenu
      CategorySelected={categorySelected}
      setCategorySelected={setCategorySelected}
    />
  ) : null;
};

const AppContent = () => {
  const [categorySelected, setCategorySelected] = useState('All');
  const { formState, onInputChange } = useForm({ recipe: '' });
  const { isAuthenticated } = useAuth();

  return (
    <div
      className={`app-container ${
        !isAuthenticated ? 'flex-col' : 'flex-row'
      }`}
    >
      <ShowNavbar />
      <ShowSideMenu
        categorySelected={categorySelected}
        setCategorySelected={setCategorySelected}
      />
      
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> 
            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={
                  <>
                    <div className='main-container'>
                      <Search
                        formState={formState}
                        onInputChange={onInputChange}
                      />

                      <RecipeContainer
                        recipeSearch={formState.recipe}
                        categorySelected={categorySelected}
                        setCategorySelected={setCategorySelected}
                      />
                    </div>
                  </>
                }
              />
              <Route path="/:id" element={<RecipeViewer />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Route> 
        </Routes>
      
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RecipesProvider>
        <AppState>
          <FavoritesProvider>
            <Router>
              <AppContent />
            </Router>
          </FavoritesProvider>
        </AppState>
      </RecipesProvider>
    </AuthProvider>
  );
};

export default App;
