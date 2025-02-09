import React, { useState } from 'react';

const EmpresasList = () => {
  const [empresas, setEmpresas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
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
    if (!nombre.trim() || !direccion.trim() || !telefono.trim()) {
      mostrarMensaje('Todos los campos son obligatorios.', 'error');
      return;
    }

    if (editIndex !== null) {
      const nuevasEmpresas = [...empresas];
      nuevasEmpresas[editIndex] = { nombre, direccion, telefono };
      setEmpresas(nuevasEmpresas);
      setEditIndex(null);
      mostrarMensaje('Empresa actualizada con éxito.', 'exito');
    } else {
      setEmpresas([...empresas, { nombre, direccion, telefono }]);
      mostrarMensaje('Empresa registrada con éxito.', 'exito');
    }

    setNombre('');
    setDireccion('');
    setTelefono('');
  };

  const handleEditar = (index) => {
    if (window.confirm('¿Estás seguro de que deseas editar esta empresa?')) {
      setNombre(empresas[index].nombre);
      setDireccion(empresas[index].direccion);
      setTelefono(empresas[index].telefono);
      setEditIndex(index);
    }
  };

  const handleEliminar = (index) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta empresa?')) {
      setEmpresas(empresas.filter((_, i) => i !== index));
      mostrarMensaje('Empresa eliminada.', 'exito');
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Gestión de Empresas</h2>
      {mensaje && <div className={`alert alert-${tipoMensaje}`}>{mensaje}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">{editIndex !== null ? 'Actualizar' : 'Registrar'} Empresa</button>
      </form>
      <div className="mt-4">
        <h3>Lista de Empresas</h3>
        {empresas.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empresas.map((empresa, index) => (
                  <tr key={index}>
                    <td>{empresa.nombre}</td>
                    <td>{empresa.direccion}</td>
                    <td>{empresa.telefono}</td>
                    <td>
                      <button className="btn btn-warning btn-sm mx-2" onClick={() => handleEditar(index)}>Editar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(index)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No hay empresas registradas.</p>
        )}
      </div>
    </div>
  );
};

export default EmpresasList;
