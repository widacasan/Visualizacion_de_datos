import React from "react";
import Select from "react-select";

/**
 * Componente para seleccionar los datos.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.onDataSelect - Función de callback para manejar la selección de datos.
 * @returns {JSX.Element} Componente de selector de datos.
 */
function DataSelector({ onDataSelect }) {
  /**
   * Opciones de selección de datos.
   * Cada opción tiene un valor y una etiqueta en español.
   */
  const options = [
    { value: "ventas", label: "Datos de ventas por mes" },
    { value: "usuarios", label: "Datos de usuarios registrados por mes" },
    { value: "productos", label: "Datos de productos vendidos por mes" },
    { value: "países", label: "Datos de países nuevos por mes" },
    { value: "ingresos", label: "Datos de ingresos en cada mes" },
    { value: "pedidos", label: "Datos de Pedidos hechos " },
    { value: "devoluciones", label: "Datos de devoluciones recibidas por mes" },
    // ... más opciones ...
  ];

  const placeholder = "Selecciona una opción";

  return (
    <Select
      options={options}
      onChange={onDataSelect}
      placeholder={placeholder}
    />
  );
}

export default DataSelector;
