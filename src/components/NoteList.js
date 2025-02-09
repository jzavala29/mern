import React, { useState } from 'react';

const AccidentesList = () => {
  const [accidentes, setAccidentes] = useState([]);
  const [ubicacion, setUbicacion] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState('');

  const mostrarMensaje = (texto, tipo) => {
    setMensaje(texto);
    setTipoMensaje(tipo);
    setTimeout(() => setMensaje(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ubicacion.trim() || !fecha.trim() || !descripcion.trim() || !foto) {
      mostrarMensaje('Todos los campos son obligatorios.', 'error');
      return;
    }

    if (editIndex !== null) {
      const nuevosAccidentes = [...accidentes];
      nuevosAccidentes[editIndex] = { ubicacion, fecha, descripcion, foto };
      setAccidentes(nuevosAccidentes);
      setEditIndex(null);
      mostrarMensaje('Accidente actualizado con éxito.', 'exito');
    } else {
      setAccidentes([...accidentes, { ubicacion, fecha, descripcion, foto }]);
      mostrarMensaje('Accidente registrado con éxito.', 'exito');
    }

    setUbicacion('');
    setFecha('');
    setDescripcion('');
    setFoto(null);
  };

  const handleEditar = (index) => {
    if (window.confirm('¿Estás seguro de que deseas editar este accidente?')) {
      setUbicacion(accidentes[index].ubicacion);
      setFecha(accidentes[index].fecha);
      setDescripcion(accidentes[index].descripcion);
      setFoto(accidentes[index].foto);
      setEditIndex(index);
    }
  };

  const handleEliminar = (index) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este accidente?')) {
      setAccidentes(accidentes.filter((_, i) => i !== index));
      mostrarMensaje('Accidente eliminado.', 'exito');
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Gestión de Accidentes</h2>
      {mensaje && <div className={`alert alert-${tipoMensaje}`}>{mensaje}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Ubicación</label>
          <input
            type="text"
            className="form-control"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
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
        <div className="mb-3">
          <label className="form-label">Foto</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFotoChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{editIndex !== null ? 'Actualizar' : 'Registrar'} Accidente</button>
      </form>
      <div className="mt-4">
        <h3>Lista de Accidentes</h3>
        {accidentes.length > 0 ? (
          <ul className="list-group">
            {accidentes.map((accidente, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between">
                <div>
                  <strong>{accidente.ubicacion}</strong> - {accidente.fecha}
                  <p>{accidente.descripcion}</p>
                  {accidente.foto && <img src={accidente.foto} alt="Foto" style={{ width: '50px', marginLeft: '10px' }} />}
                </div>
                <div>
                  <button className="btn btn-warning btn-sm mx-2" onClick={() => handleEditar(index)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(index)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay accidentes registrados.</p>
        )}
      </div>
    </div>
  );
};

export default AccidentesList;