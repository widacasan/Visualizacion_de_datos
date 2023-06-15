import React from "react";
import Select from "react-select";

/**
 * Componente ChartSelector que muestra un selector de tipos de gráfico.
 * @component
 * @param {object} props - Propiedades del componente.
 * @param {Function} props.onChartSelect - Función para manejar la selección del tipo de gráfico.
 * @returns {JSX.Element} Componente ChartSelector.
 */
function ChartSelector({ onChartSelect }) {
  const options = [
    { value: "bar", label: "Gráfico de Barras" },
    { value: "line", label: "Gráfico de Líneas" },
    { value: "pie", label: "Gráfico de Tarta" },
  ];

  /**
   * Maneja el evento de selección de opción del selector.
   * @param {object} selectedOption - Opción seleccionada.
   */
  const handleChartSelect = (selectedOption) => {
    onChartSelect(selectedOption.value);
  };

  // Configuración de idioma para las indicaciones
  const selectLanguageConfig = {
    noOptionsMessage: () => "No hay opciones disponibles",
    placeholder: "Selecciona un tipo de gráfico",
  };

  return (
    <Select
      options={options}
      onChange={handleChartSelect}
      className="chart-selector"
      {...selectLanguageConfig}
    />
  );
}

export default ChartSelector;
