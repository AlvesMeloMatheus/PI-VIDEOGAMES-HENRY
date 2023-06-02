import './App.css';
//--------- ^^ css ^^ ----------------

import { Routes, Route, useLocation } from 'react-router-dom';
// ------------ React ----------------

import { Provider } from 'react-redux'
// ------------ Redux ----------------

import Landing from './components/LandingPage/Landing';
import Cards from './components/Cards/Cards';
import DetailById from './components/Cards/Detail/DetailById';
import NavBar from './components/NavBar/NavBar';
// ------------ components -----------

import store from './Redux/store';
import Search from './components/NavBar/Search/Search';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';
// ------------ Redux comps -----------


function App() {

  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar /> }

      <Provider store={store} >
        <Routes>

          <Route path="/" element={<Landing/>} /> 
          <Route path="/search" element={<Search/>} />
          <Route exact path="/home" element={<Cards/>} />
          <Route exact path="/videogames/:idVideogame" element={<DetailById/>} />
          <Route exact path="/videogames/create" element={<CreateVideogame/>} />

        </Routes>
      </Provider>
    </div>
  );
}

export default App;
