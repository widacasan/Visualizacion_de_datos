import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Chart({ data, selectedChart, selectedData, dateRange }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Function to create the chart based on selectedChart and data
    const createChart = () => {
      const svg = d3.select(chartRef.current);

      // Clear any existing chart
      svg.selectAll('*').remove();

      // Filter the data based on the date range
      const filteredData = data.filter((d) => {
        const date = new Date(d.date);
        return date >= new Date(dateRange.startDate) && date <= new Date(dateRange.endDate);
      });

      // Create the chart based on the selectedChart prop
      if (selectedChart === 'bar') {
        // Bar chart
        svg.selectAll('rect')
          .data(filteredData)
          .enter()
          .append('rect')
          .attr('x', (d, i) => i * 40)
          .attr('y', (d) => svg.attr('height') - d[selectedData.value])
          .attr('width', 30)
          .attr('height', (d) => d[selectedData.value])
          .attr('fill', 'steelblue');
      } else if (selectedChart === 'line') {
        // Line chart
        const xScale = d3.scaleTime()
          .domain(d3.extent(filteredData, (d) => new Date(d.date)))
          .range([0, svg.attr('width')]);

        const yScale = d3.scaleLinear()
          .domain([0, d3.max(filteredData, (d) => d[selectedData.value])])
          .range([svg.attr('height'), 0]);

        const line = d3.line()
          .x((d) => xScale(new Date(d.date)))
          .y((d) => yScale(d[selectedData.value]));

        svg.append('path')
          .datum(filteredData)
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 2)
          .attr('d', line);
      } else if (selectedChart === 'pie') {
        // Pie chart
        const radius = Math.min(svg.attr('width'), svg.attr('height')) / 2;
        const pie = d3.pie().value((d) => d[selectedData.value]);
        const arcs = pie(filteredData);

        const arcGenerator = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);

        svg.selectAll('path')
          .data(arcs)
          .enter()
          .append('path')
          .attr('d', arcGenerator)
          .attr('fill', (d, i) => d3.schemeCategory10[i % 10]);
      } else if (selectedChart === 'scatter') {
        // Scatter plot
        svg.selectAll('circle')
          .data(filteredData)
          .enter()
          .append('circle')
          .attr('cx', (d) => d[selectedData.value])
          .attr('cy', (d) => d.users)
          .attr('r', 5)
          .attr('fill', 'steelblue');
      } else if (selectedChart === 'bubble') {
        // Bubble chart
        const bubble = d3.pack()
          .size([svg.attr('width'), svg.attr('height')])
          .padding(1.5);

        const root = d3.hierarchy({ children: filteredData })
          .sum((d) => d[selectedData.value]);

        bubble(root);

        svg.selectAll('circle')
          .data(root.descendants())
          .enter()
          .filter((d) => !d.children)
          .append('circle')
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y)
          .attr('r', (d) => d.r)
          .attr('fill', 'steelblue');
      }
    };

    // Clear any existing chart
    const clearChart = () => {
      const svg = d3.select(chartRef.current);
      svg.selectAll('*').remove();
    };

    // Call the functions to create/clear the chart when data, selectedChart, selectedData, or dateRange changes
    clearChart();
    createChart();

    // Cleanup function
    return () => {
      clearChart();
    };
  }, [data, selectedChart, selectedData, dateRange]);

  return (
    <svg ref={chartRef} width="400" height="300">
      {/* The chart will be rendered here */}
    </svg>
  );
}

export default Chart;