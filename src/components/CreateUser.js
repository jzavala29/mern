import React, { useState, useEffect } from 'react';

const InspectionsManager = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [inspecciones, setInspecciones] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const inspeccionesGuardadas = JSON.parse(localStorage.getItem('inspecciones')) || [];
    setInspecciones(inspeccionesGuardadas);
  }, []);

  const guardarInspecciones = (inspecciones) => {
    localStorage.setItem('inspecciones', JSON.stringify(inspecciones));
  };

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(''), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !fecha.trim() || !descripcion.trim()) {
      mostrarMensaje('❌ Por favor complete todos los campos correctamente.');
      return;
    }
    
    let nuevasInspecciones;
    if (editIndex !== null) {
      if (!window.confirm('¿Estás seguro de que quieres modificar esta inspección?')) return;
      nuevasInspecciones = inspecciones.map((insp, index) =>
        index === editIndex ? { nombre, fecha, descripcion } : insp
      );
      setEditIndex(null);
    } else {
      nuevasInspecciones = [...inspecciones, { nombre, fecha, descripcion }];
    }
    setInspecciones(nuevasInspecciones);
    guardarInspecciones(nuevasInspecciones);
    setNombre('');
    setFecha('');
    setDescripcion('');
    mostrarMensaje('✅ Inspección guardada con éxito.');
  };

  const eliminarInspeccion = (index) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta inspección?')) return;
    const nuevasInspecciones = inspecciones.filter((_, i) => i !== index);
    setInspecciones(nuevasInspecciones);
    guardarInspecciones(nuevasInspecciones);
    mostrarMensaje('✅ Inspección eliminada con éxito.');
  };

  const editarInspeccion = (index) => {
    setNombre(inspecciones[index].nombre);
    setFecha(inspecciones[index].fecha);
    setDescripcion(inspecciones[index].descripcion);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Gestión de Inspecciones</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre de la Inspección</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editIndex !== null ? 'Actualizar Inspección' : 'Crear Inspección'}
        </button>
      </form>
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      <div className="mt-4">
        <h3>Inspecciones Guardadas</h3>
        {inspecciones.length > 0 ? (
          <ul className="list-group">
            {inspecciones.map((insp, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <strong>{insp.nombre}</strong> - {insp.fecha} <br /> {insp.descripcion}
                </span>
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => editarInspeccion(index)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarInspeccion(index)}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay inspecciones guardadas.</p>
        )}
      </div>
    </div>
  );
};

export default InspectionsManager;
