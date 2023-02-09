import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {props.userData ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link nav_contan active" aria-current="page" to="home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav_contan" to="movies">Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav_contan" to="people">People</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav_contan" to="tvshow">Tvshow</Link>
              </li>

            </ul> : ''}


            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {props.userData ? <li className="nav-item">
                <a onClick={props.gologout} className="nav-link nav_contan log_out" >logout</a>
              </li> : <>
                <li className="nav-item">
                  <Link className="nav-link nav_contan" aria-current="page" to="login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav_contan" to="regester">Regester</Link>
                </li>
              </>}




            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
}
