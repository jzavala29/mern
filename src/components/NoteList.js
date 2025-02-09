import React, { useState, useEffect } from 'react';

function Accesibilidad() {
  const [usuario, setUsuario] = useState('');
  const [modoOscuro, setModoOscuro] = useState(false);
  const [altoContraste, setAltoContraste] = useState(false);
  const [textoGrande, setTextoGrande] = useState(false);
  const [preferenciasGuardadas, setPreferenciasGuardadas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false); // Estado para controlar si estamos en modo edición

  useEffect(() => {
    // Cargar todas las preferencias guardadas al iniciar el componente
    const todasPreferencias = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('preferencias_')) {
        const usuario = key.replace('preferencias_', '');
        const preferencias = JSON.parse(localStorage.getItem(key));
        todasPreferencias.push({ usuario, ...preferencias });
      }
    });
    setPreferenciasGuardadas(todasPreferencias);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', modoOscuro);
    document.body.classList.toggle('high-contrast', altoContraste);
    document.body.classList.toggle('large-text', textoGrande);
  }, [modoOscuro, altoContraste, textoGrande]);

  const guardarPreferencias = () => {
    if (!usuario) {
      alert('Por favor, introduce un nombre de usuario.');
      return;
    }
    localStorage.setItem(
      `preferencias_${usuario}`,
      JSON.stringify({ modoOscuro, altoContraste, textoGrande })
    );
    alert('Preferencias guardadas');

    // Si estamos editando, actualizamos la lista de preferencias
    if (modoEdicion) {
      setPreferenciasGuardadas((prevState) =>
        prevState.map((pref) =>
          pref.usuario === usuario
            ? { usuario, modoOscuro, altoContraste, textoGrande }
            : pref
        )
      );
    } else {
      // Si no estamos editando, agregamos la nueva preferencia
      setPreferenciasGuardadas((prevState) => [
        ...prevState,
        { usuario, modoOscuro, altoContraste, textoGrande },
      ]);
    }
    setModoEdicion(false); // Restablecer el modo de edición
  };

  const borrarPreferencias = (usuarioParaBorrar) => {
    localStorage.removeItem(`preferencias_${usuarioParaBorrar}`);
    setPreferenciasGuardadas(
      preferenciasGuardadas.filter((item) => item.usuario !== usuarioParaBorrar)
    );
    alert('Preferencias eliminadas');
  };

  const editarPreferencias = (usuarioParaEditar) => {
    const preferencias = JSON.parse(localStorage.getItem(`preferencias_${usuarioParaEditar}`));
    setUsuario(usuarioParaEditar);
    setModoOscuro(preferencias.modoOscuro);
    setAltoContraste(preferencias.altoContraste);
    setTextoGrande(preferencias.textoGrande);
    setModoEdicion(true); // Activamos el modo de edición
  };

  const cancelarEdicion = () => {
    setUsuario('');
    setModoOscuro(false);
    setAltoContraste(false);
    setTextoGrande(false);
    setModoEdicion(false); // Desactivamos el modo de edición
  };

  return (
    <div className="container">
      <h2>Preferencias de Accesibilidad</h2>
      
      <div className="mb-3">
        <label className="form-label">Usuario</label>
        <input
          type="text"
          className="form-control"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Ingresa tu usuario"
        />
      </div>

      <div className="mb-4 p-3 border rounded bg-light">
        <h4>Opciones</h4>
        
        <label className="d-block">
          <input type="checkbox" checked={modoOscuro} onChange={() => setModoOscuro(!modoOscuro)} />
          Modo Oscuro
        </label>
        <label className="d-block">
          <input type="checkbox" checked={altoContraste} onChange={() => setAltoContraste(!altoContraste)} />
          Alto Contraste
        </label>
        <label className="d-block">
          <input type="checkbox" checked={textoGrande} onChange={() => setTextoGrande(!textoGrande)} />
          Texto Grande
        </label>

        <button type="button" className="btn btn-primary me-2 mt-2" onClick={guardarPreferencias}>
          {modoEdicion ? 'Actualizar Preferencias' : 'Guardar Preferencias'}
        </button>
        {modoEdicion && (
          <button type="button" className="btn btn-secondary mt-2" onClick={cancelarEdicion}>
            Cancelar
          </button>
        )}
      </div>

      <div className="mb-4">
        <h4>Preferencias Guardadas</h4>
        <ul className="list-group">
          {preferenciasGuardadas.map((pref, index) => (
            <li key={index} className="list-group-item">
              <strong>{pref.usuario}</strong>
              <br />
              Modo Oscuro: {pref.modoOscuro ? 'Activado' : 'Desactivado'}
              <br />
              Alto Contraste: {pref.altoContraste ? 'Activado' : 'Desactivado'}
              <br />
              Texto Grande: {pref.textoGrande ? 'Activado' : 'Desactivado'}
              <br />
              <button
                type="button"
                className="btn btn-info me-2 mt-2"
                onClick={() => editarPreferencias(pref.usuario)}
              >
                Editar
              </button>
              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={() => borrarPreferencias(pref.usuario)}
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Accesibilidad;
