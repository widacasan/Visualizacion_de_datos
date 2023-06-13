import React, { useEffect, useState } from 'react';
import Chart from './components/Chart';
import ChartSelector from './components/ChartSelector';
import DataSelector from './components/DataSelector';
import DateRangeFilter from './components/DateRangeFilter';

function App() {
    const [data, setData] = useState(
    [
      {
          "date": "2023-06-12",
          "sales": 100,
          "users": 20
      },
      {
          "date": "2023-06-13",
          "sales": 120,
          "users": 25
      },
      {
          "date": "2023-06-18",
          "sales": 80,
          "users": 30
      },
      {
          "date": "2023-07-01",
          "sales": 200,
          "users": 40
      },
      {
          "date": "2023-07-01",
          "sales": 150,
          "users": 35
      }
  ]
  );
    const [selectedChart, setSelectedChart] = useState(null);
    const [selectedData, setSelectedData] = useState(null);
    const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

    useEffect(() => {
        fetch('/data/yourData.json')
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    return (
        <div>
            <ChartSelector onChartSelect={setSelectedChart} />
            <DataSelector onDataSelect={setSelectedData} />
            <DateRangeFilter onDateRangeSelect={setDateRange} />
            <Chart data={data} selectedChart={selectedChart} selectedData={selectedData} dateRange={dateRange} />
        </div>
    );
}

export default App;