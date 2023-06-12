import React from 'react';
import Select from 'react-select';

function ChartSelector({ onChartSelect }) {
    const options = [
        { value: 'bar', label: 'Gráfico de Barras' },
        { value: 'line', label: 'Gráfico de Líneas' },
        { value: 'pie', label: 'Gráfico de Tarta' },
        { value: 'scatter', label: 'Gráfico de Dispersión'},
        { value: 'bubble', label: 'Gráfico de Burbujas'}
    ];

    return <Select 
            options={options} 
            onChange={selectedOption => 
                onChartSelect(selectedOption.value)} 
          />;
}

export default ChartSelector;
