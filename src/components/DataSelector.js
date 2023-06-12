import React from 'react';
import Select from 'react-select';

function DataSelector({ onDataSelect }) {
    const options = [
        { value: 'sales', label: 'Ventas' },
        { value: 'users', label: 'Usuarios' },
        // ... más opciones ...
    ];

    return <Select options={options} onChange={onDataSelect} />;
}

export default DataSelector;
