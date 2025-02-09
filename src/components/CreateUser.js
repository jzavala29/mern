import React, { useState, useEffect } from 'react';

const CreateUser = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Cargar usuarios guardados
  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(usuariosGuardados);
  }, []);

  // Guardar usuarios en localStorage
  const guardarUsuarios = (usuarios) => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && correo) {
      let nuevosUsuarios;
      if (editIndex !== null) {
        // Editar usuario existente
        nuevosUsuarios = usuarios.map((user, index) =>
          index === editIndex ? { nombre, correo } : user
        );
        setEditIndex(null);
      } else {
        // Agregar nuevo usuario
        nuevosUsuarios = [...usuarios, { nombre, correo }];
      }
      setUsuarios(nuevosUsuarios);
      guardarUsuarios(nuevosUsuarios);
      setNombre('');
      setCorreo('');
      setMensaje('Usuario guardado con éxito');
    } else {
      setMensaje('Por favor complete todos los campos');
    }
  };

  // Eliminar usuario
  const eliminarUsuario = (index) => {
    const nuevosUsuarios = usuarios.filter((_, i) => i !== index);
    setUsuarios(nuevosUsuarios);
    guardarUsuarios(nuevosUsuarios);
  };

  // Cargar usuario para edición
  const editarUsuario = (index) => {
    setNombre(usuarios[index].nombre);
    setCorreo(usuarios[index].correo);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Gestión de Usuarios</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editIndex !== null ? 'Actualizar Usuario' : 'Crear Usuario'}
        </button>
      </form>
      {/* Mensaje de éxito o error */}
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      {/* Lista de usuarios guardados */}
      <div className="mt-4">
        <h3>Usuarios Guardados</h3>
        {usuarios.length > 0 ? (
          <ul className="list-group">
            {usuarios.map((user, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <strong>{user.nombre}</strong> - {user.correo}
                </span>
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => editarUsuario(index)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarUsuario(index)}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay usuarios guardados.</p>
        )}
      </div>
    </div>
  );
};

export default CreateUser;
