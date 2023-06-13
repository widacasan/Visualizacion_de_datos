import React from 'react';
import Select from 'react-select';

function DataSelector({ onDataSelect }) {
    const options = [
        { value: 'sales', label: 'datos de ventas por región' },
        { value: 'users', label: 'datos de usuarios registrados por mes' },
        // ... más opciones ...
    ];

    return <Select options={options} onChange={onDataSelect} />;
}

export default DataSelector;