import React, { useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

/**
 * Componente de gráfico.
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.data - Datos del gráfico.
 * @param {string} props.selectedChart - Tipo de gráfico seleccionado.
 * @param {Object} props.selectedData - Datos seleccionados.
 * @param {Object} props.dateRange - Rango de fechas seleccionado.
 * @returns {JSX.Element} Elemento JSX que representa el componente.
 */

function Chart({ data, selectedChart, selectedData, dateRange }) {
  const chartRef = useRef(null);

  /**
   * Crea un gráfico de barras.
   * @param {d3.Selection} svg - Elemento SVG del gráfico.
   * @param {Array} filteredData - Datos filtrados.
   */

  const createBarChart = useCallback(
    (svg, filteredData) => {
      /**
       * Agrupa los datos por mes y suma los resultados de la variable seleccionada.
       *
       * @param {array} group - Grupo de datos.
       * @returns {number} - Suma de los valores de la variable seleccionada en el grupo.
       */
      const dataByMonth = d3.rollups(
        filteredData,
        (group) => d3.sum(group, (d) => d[selectedData?.value || 0]),
        (d) => d3.timeMonth.floor(new Date(d.date))
      );

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const chartWidth = +svg.attr("width") - margin.left - margin.right;
      const chartHeight = +svg.attr("height") - margin.top - margin.bottom;

      const xScale = d3
        .scaleBand()
        .domain(dataByMonth.map(([date]) => date))
        .range([0, chartWidth])
        .paddingInner(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataByMonth, ([, value]) => value)])
        .range([chartHeight, 0]);

      const bars = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("rect")
        .data(dataByMonth)
        .enter()
        .append("rect")
        .attr("x", ([date]) => xScale(date))
        .attr("y", ([, value]) => yScale(value))
        .attr("width", xScale.bandwidth())
        .attr("height", ([, value]) => chartHeight - yScale(value))
        .attr("fill", "steelblue")
        .style("opacity", 0);

      bars.transition().duration(1000).ease(d3.easeCubic).style("opacity", 1);

      const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b"));
      const yAxis = d3.axisLeft(yScale);

      svg
        .append("g")
        .attr(
          "transform",
          `translate(${margin.left}, ${margin.top + chartHeight})`
        )
        .call(xAxis);

      svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);

      svg
        .append("text")
        .attr("x", margin.left + chartWidth / 2)
        .attr("y", margin.top + chartHeight + margin.bottom - 0)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .text("meses");

      svg
        .append("text")
        .attr("x", -(margin.top + chartHeight / 2))
        .attr("y", margin.left - 30)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("transform", "rotate(-90)")
        .text(selectedData.value);
    },
    [selectedData?.value]
  );
  /**
   * Crea un gráfico de líneas a partir de los datos proporcionados.
   *
   * @param {object} svg - El elemento SVG en el que se dibujará el gráfico.
   * @param {array} filteredData - Los datos filtrados para crear el gráfico.
   */
  const createLineChart = useCallback(
    (svg, filteredData) => {
      const xScale = d3
        .scaleTime()
        .domain(d3.extent(filteredData, (d) => new Date(d.date)))
        .range([50, svg.attr("width") - 50]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(filteredData, (d) => d[selectedData?.value || 0])])
        .range([svg.attr("height") - 30, 30]);

      const line = d3
        .line()
        .x((d) => xScale(new Date(d.date)))
        .y((d) => yScale(d[selectedData?.value || 0]));

      const path = svg
        .append("path")
        .datum(filteredData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

      const totalLength = path.node().getTotalLength();

      path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

      const dots = svg
        .selectAll("circle")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(new Date(d.date)))
        .attr("cy", (d) => yScale(d[selectedData?.value || 0]))
        .attr("r", 4)
        .attr("fill", "steelblue");

      dots
        .append("title")
        .text((d) => `${d.date}: ${d[selectedData?.value || 0]}`);

      const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b"));
      const yAxis = d3.axisLeft(yScale);

      svg
        .append("g")
        .attr("transform", `translate(0, ${svg.attr("height") - 30})`)
        .call(xAxis)
        .selectAll("text")
        .style("fill", "steelblue")
        .style("font-size", "10px");

      svg
        .append("g")
        .attr("transform", "translate(50, 0)")
        .call(yAxis)
        .selectAll("text")
        .style("fill", "steelblue")
        .style("font-size", "10px");

      svg
        .append("text")
        .attr("x", svg.attr("width") / 2)
        .attr("y", svg.attr("height") - 0)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .style("font-size", "12px")
        .text("Meses");

      svg
        .append("text")
        .attr("x", -150)
        .attr("y", svg.attr("height") / 15)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("transform", "rotate(-90)")
        .style("font-size", "12px")
        .text(selectedData?.value);
    },
    [selectedData?.value]
  );
  /**
   * Crea un gráfico de pastel.
   * @param {Selection} svg - Selección del elemento SVG donde se creará el gráfico.
   * @param {Object[]} filteredData - Datos filtrados para generar el gráfico de pastel.
   * @returns {Selection} - Selección de las etiquetas del gráfico de pastel.
   */
  const createPieChart = useCallback(
    (svg, filteredData) => {
      const width = +svg.attr("width");
      const height = +svg.attr("height");
      const margin = 30;

      const chartWidth = width - 2 * margin;
      const chartHeight = height - 2 * margin;
      const radius = Math.min(chartWidth, chartHeight) / 2;

      // Agrupar datos por mes y sumar los valores correspondientes
      const dataByMonth = d3.rollups(
        filteredData,
        (group) => d3.sum(group, (d) => d[selectedData?.value || 0]),
        (d) => d3.timeMonth.floor(new Date(d.date))
      );

      // Configuración de la función pie
      const pie = d3
        .pie()
        .value((d) => d[1]) // Usar el valor sumado del mes
        .sort(null)
        .padAngle(0.02);

      // Generar los arcos de la gráfica de pastel
      const arcs = pie(dataByMonth);

      // Generador de arcos
      const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

      // Grupo para los arcos
      const arcGroup = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      // Agregar los arcos al gráfico con animación
      arcGroup
        .selectAll("path")
        .data(arcs)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .each(function (d) {
          d.outerRadius = radius;
        })
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
          const interpolate = d3.interpolate(d.startAngle, d.endAngle);
          return function (t) {
            d.endAngle = interpolate(t);
            return arcGenerator(d);
          };
        });

      // Etiquetas
      const labelGroup = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const labels = labelGroup
        .selectAll("text")
        .data(arcs)
        .enter()
        .append("text")
        .attr("transform", (d) => {
          const pos = arcGenerator.centroid(d);
          const midAngle = Math.atan2(pos[1], pos[0]);
          const x = Math.cos(midAngle) * (radius + 20);
          const y = Math.sin(midAngle) * (radius + 20);
          return `translate(${x}, ${y})`;
        })
        .attr("text-anchor", (d) => {
          const pos = arcGenerator.centroid(d);
          return pos[0] < 0 ? "end" : "start";
        })
        .text((d) => {
          const monthES = new Date(d.data[0]).toLocaleDateString("es-ES", {
            month: "long",
          }); // Obtener el nombre del mes en español
          return `${monthES}: ${d.data[1]}`; // Mostrar mes en español y valor
        })
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1);

      // Agregar título al gráfico
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", margin)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .style("font-size", "14px")
        .text("Gráfico de Pastel");

      return labels; // Devolver las etiquetas si se necesita utilizar en otra parte
    },
    [selectedData?.value]
  );

  const clearChart = useCallback(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();
  }, []);

  const createChart = useCallback(() => {
    const svg = d3.select(chartRef.current);

    svg.selectAll("*").remove();

    const filteredData = data.filter((d) => {
      const date = new Date(d.date);
      return (
        date >= new Date(dateRange.startDate) &&
        date <= new Date(dateRange.endDate)
      );
    });

    if (selectedChart === "bar") {
      createBarChart(svg, filteredData);
    } else if (selectedChart === "line") {
      createLineChart(svg, filteredData);
    } else if (selectedChart === "pie") {
      createPieChart(svg, filteredData);
    }
  }, [
    data,
    selectedChart,
    dateRange.startDate,
    dateRange.endDate,
    createBarChart,
    createLineChart,
    createPieChart,
  ]);

  useEffect(() => {
    clearChart();
    createChart();

    return () => {
      clearChart();
    };
  }, [createChart, clearChart]);

  return (
    <div className="chart-container">
      <svg ref={chartRef} width="800" height="400"></svg>
    </div>
  );
}

export default Chart;
