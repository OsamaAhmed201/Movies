
import About from './Componant/About/About';
import Home from './Componant/Home/Home';
import Login from './Componant/Login/Login';
import Logout from './Componant/LogOut/Logout';
import Navbar from './Componant/Nav/Navbar';
import People from './Componant/people/People';
import TvShow from './Componant/TvShow/TvShow';
import NodataFound from './Componant/NodataFound/NodataFound';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Movies from './Componant/Movies/Movies';
import Regester from './Componant/Regester/Regester';
import Detiles from './Componant/Detiles/Detiles';
import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react'
import DetilesTv from './Componant/DetilesTvshow/DetilesTv';
import DetilesPeople from './Componant/DetilesPeople/DetilesPeople';




function App() {
  const [userData, setuserData] = useState(null)
  function saveuserData() {
    let encodeTocken = localStorage.getItem('userToken');
    let decodeTocken = jwtDecode(encodeTocken)
    setuserData(decodeTocken);
  }
  useEffect(() => { //handel refresh
    if (localStorage.getItem('userToken') != null) {
      saveuserData()
    }
  }

    , [])
  let navigate = useNavigate()
  function gologout() {
    localStorage.removeItem('userToken');
    setuserData(null)
    navigate('/login')

  }
  function ProdectdRouting(prpos) {
    if (localStorage.getItem('userToken') == null) {
      return <Navigate to='/login' />
    }
    else {
      return prpos.children;
    }
  }
  return (
    <div>

      <Navbar userData={userData} gologout={gologout} />
      <div className='container'>
        
        <Routes>
          <Route path='/home' element={<ProdectdRouting><Home /></ProdectdRouting>}></Route>
          <Route path='/about' element={<ProdectdRouting><About /></ProdectdRouting>}></Route>
          <Route path='/people' element={<ProdectdRouting><People /></ProdectdRouting>}></Route>
          <Route path='/movies' element={<ProdectdRouting><Movies /></ProdectdRouting>}></Route>
          <Route path='/tvshow' element={<ProdectdRouting><TvShow /></ProdectdRouting>}></Route>
          <Route path='/detiles' element={<ProdectdRouting><Detiles /></ProdectdRouting>}></Route>
          <Route path='/detilesTv' element={<ProdectdRouting><DetilesTv/></ProdectdRouting>}></Route>
          <Route path='/detilesPeople' element={<ProdectdRouting><DetilesPeople/></ProdectdRouting>}></Route>
          <Route path='/login' element={<Login saveuserData={saveuserData} />}></Route>
          <Route path='/regester' element={<Regester />}></Route>
          <Route path='/logout' element={<Logout />}></Route>
          <Route path='/' element={<ProdectdRouting><Home /></ProdectdRouting>}></Route>
          <Route path='*' element={<NodataFound />}></Route>

        </Routes>
      </div>
    </div>
    
  );
}

export default App;
