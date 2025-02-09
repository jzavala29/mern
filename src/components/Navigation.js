import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Sistema de Accesibilidad
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Ajuste de Preferencia</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">Crear Evento</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user">Crear Usuario</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/auspiciantes">Auspiciantes</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
