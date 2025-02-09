import React, { useEffect, useState } from 'react';

export default function AccessibilitySettings() {
  const [preferencias, setPreferencias] = useState({
    modoOscuro: JSON.parse(localStorage.getItem('modoOscuro')) || false,
    altoContraste: JSON.parse(localStorage.getItem('altoContraste')) || false,
    textoGrande: JSON.parse(localStorage.getItem('textoGrande')) || false,
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', preferencias.modoOscuro);
    document.body.classList.toggle('high-contrast', preferencias.altoContraste);
    document.body.classList.toggle('large-text', preferencias.textoGrande);
  }, [preferencias]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setPreferencias((prev) => {
      const newPrefs = { ...prev, [name]: checked };
      localStorage.setItem(name, JSON.stringify(checked));
      return newPrefs;
    });
  };

  return (
    <div className="container mt-4">
      <h2>Configuración de Accesibilidad</h2>
      <div className="form-check">
        <input 
          type="checkbox" 
          className="form-check-input" 
          id="modoOscuro" 
          name="modoOscuro" 
          checked={preferencias.modoOscuro} 
          onChange={handleChange} 
        />
        <label className="form-check-label" htmlFor="modoOscuro">Modo Oscuro</label>
      </div>
      <div className="form-check">
        <input 
          type="checkbox" 
          className="form-check-input" 
          id="altoContraste" 
          name="altoContraste" 
          checked={preferencias.altoContraste} 
          onChange={handleChange} 
        />
        <label className="form-check-label" htmlFor="altoContraste">Alto Contraste</label>
      </div>
      <div className="form-check">
        <input 
          type="checkbox" 
          className="form-check-input" 
          id="textoGrande" 
          name="textoGrande" 
          checked={preferencias.textoGrande} 
          onChange={handleChange} 
        />
        <label className="form-check-label" htmlFor="textoGrande">Texto Grande</label>
      </div>
    </div>
  );
}
