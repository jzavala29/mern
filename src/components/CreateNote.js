import React, { useState, useEffect } from 'react';

const ObrasManager = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [obrasGuardadas, setObrasGuardadas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const savedObras = JSON.parse(localStorage.getItem('obras')) || [];
    setObrasGuardadas(savedObras);
  }, []);

  useEffect(() => {
    console.log("Actualizando localStorage:", obrasGuardadas);
    localStorage.setItem('obras', JSON.stringify(obrasGuardadas));
  }, [obrasGuardadas]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo || !descripcion || !fechaInicio || !fechaFin) {
      setMensaje('❌ Seguridad: Complete todos los campos antes de continuar.');
      return;
    }

    if (new Date(fechaInicio) > new Date(fechaFin)) {
      setMensaje('❌ Seguridad: La fecha de finalización no puede ser anterior a la fecha de inicio.');
      return;
    }

    const nuevaObra = { id: editandoId || Date.now(), titulo, descripcion, fechaInicio, fechaFin };

    console.log("Nueva obra:", nuevaObra);

    setObrasGuardadas(prevObras => {
      if (editandoId) {
        return prevObras.map(obra => (obra.id === editandoId ? nuevaObra : obra));
      }
      return [...prevObras, nuevaObra];
    });

    setMensaje(editandoId ? '✅ Seguridad: Obra actualizada con éxito.' : '✅ Seguridad: Obra registrada con éxito.');

    setEditandoId(null); // Asegurar que se limpia
    setTitulo('');
    setDescripcion('');
    setFechaInicio('');
    setFechaFin('');

    setTimeout(() => setMensaje(''), 3000);
  };

  const handleDelete = (id) => {
    if (!window.confirm('¿Está seguro de que desea eliminar esta obra?')) {
      return;
    }
    setObrasGuardadas(prevObras => prevObras.filter(obra => obra.id !== id));
    setMensaje('✅ Seguridad: Obra eliminada con éxito.');
    setTimeout(() => setMensaje(''), 3000);
  };

  const handleEdit = (obra) => {
    setTitulo(obra.titulo);
    setDescripcion(obra.descripcion);
    setFechaInicio(obra.fechaInicio);
    setFechaFin(obra.fechaFin);
    setEditandoId(obra.id);

    console.log("Editando obra:", obra);
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Gestión de Obras</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título de la Obra</label>
          <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows="4" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Inicio</label>
          <input type="date" className="form-control" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Finalización</label>
          <input type="date" className="form-control" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">{editandoId ? 'Actualizar Obra' : 'Registrar Obra'}</button>
      </form>

      {mensaje && <div className="alert alert-info mt-3" aria-live="polite">{mensaje}</div>}

      <div className="mt-4">
        <h3>Obras Registradas:</h3>
        {obrasGuardadas.length > 0 ? (
          <ul className="list-group">
            {obrasGuardadas.map((obra) => (
              <li key={obra.id} className="list-group-item">
                <p><strong>Título:</strong> {obra.titulo}</p>
                <p><strong>Descripción:</strong> {obra.descripcion}</p>
                <p><strong>Fecha de Inicio:</strong> {obra.fechaInicio}</p>
                <p><strong>Fecha de Finalización:</strong> {obra.fechaFin}</p>
                <button onClick={() => handleEdit(obra)} className="btn btn-warning me-2">Editar</button>
                <button onClick={() => handleDelete(obra.id)} className="btn btn-danger">Eliminar</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay obras registradas.</p>
        )}
      </div>
    </div>
  );
};

export default ObrasManager;
