import React, { useState } from "react";
import Chart from "./components/Chart";
import ChartSelector from "./components/ChartSelector";
import DataSelector from "./components/DataSelector";
import DateRangeFilter from "./components/DataRangeFilter";
import proyectData from "./data/data.json";
import "./styles.css"; 

/**
 * Componente principal de la aplicación.
 * @returns {JSX.Element} Elemento JSX que representa la aplicación.
 */
function App() {
  const data = proyectData;
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedData, setSelectedData] = useState({
    value: "sales",
    label: "datos de ventas por mes",
  });
  const [dateRange, setDateRange] = useState({
    startDate: new Date("2023-06-14"),
    endDate: new Date("2023-10-05"),
  });

  return (
    <div className="app">
      <h1>Visualización de datos</h1>
      <div className="container">
        <div className="sidebar">
          <h2>Seleccione un gráfico:</h2>
          <ChartSelector onChartSelect={setSelectedChart} />

          <h2>Seleccione los datos:</h2>
          <DataSelector onDataSelect={setSelectedData} />

          <h2>Seleccione el rango de fechas:</h2>
          <DateRangeFilter onDateRangeSelect={setDateRange} />
        </div>
        <div className="chart-container">
          {data && (
            <Chart
              data={data}
              selectedChart={selectedChart}
              selectedData={selectedData}
              dateRange={dateRange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
