import React, { useState, useEffect } from 'react';

const CreateEvent = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [eventoGuardado, setEventoGuardado] = useState([]);
  
  // Cargar eventos guardados desde localStorage al iniciar
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events'));
    if (savedEvents) setEventoGuardado(savedEvents);
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (titulo && descripcion && fecha && hora) {
      const evento = { id: Date.now(), titulo, descripcion, fecha, hora };
      const updatedEventos = [...eventoGuardado, evento];

      // Guardar en localStorage
      localStorage.setItem('events', JSON.stringify(updatedEventos));
      setEventoGuardado(updatedEventos);
      setMensaje('Evento creado con éxito');
      
      // Limpiar los campos
      setTitulo('');
      setDescripcion('');
      setFecha('');
      setHora('');
    } else {
      setMensaje('Por favor complete todos los campos');
    }
  };

  // Función para eliminar un evento
  const handleDelete = (id) => {
    const updatedEventos = eventoGuardado.filter(evento => evento.id !== id);
    localStorage.setItem('events', JSON.stringify(updatedEventos));
    setEventoGuardado(updatedEventos);
  };

  // Función para editar un evento
  const handleEdit = (id) => {
    const evento = eventoGuardado.find(evento => evento.id === id);
    if (evento) {
      setTitulo(evento.titulo);
      setDescripcion(evento.descripcion);
      setFecha(evento.fecha);
      setHora(evento.hora);
      handleDelete(id);  // Eliminar el evento actual para poder editarlo
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Crear Evento</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título del Evento</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="4"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="hora" className="form-label">Hora</label>
          <input
            type="time"
            className="form-control"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Evento</button>
      </form>

      {/* Mensaje de éxito o error */}
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}

      {/* Mostrar lista de eventos */}
      <div className="mt-4">
        <h3>Eventos Guardados:</h3>
        {eventoGuardado.length > 0 ? (
          <ul className="list-group">
            {eventoGuardado.map((evento) => (
              <li key={evento.id} className="list-group-item">
                <p><strong>Título:</strong> {evento.titulo}</p>
                <p><strong>Descripción:</strong> {evento.descripcion}</p>
                <p><strong>Fecha:</strong> {evento.fecha}</p>
                <p><strong>Hora:</strong> {evento.hora}</p>
                <button onClick={() => handleEdit(evento.id)} className="btn btn-warning me-2">Editar</button>
                <button onClick={() => handleDelete(evento.id)} className="btn btn-danger">Eliminar</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay eventos guardados.</p>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
