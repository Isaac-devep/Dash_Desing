import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  date: Date;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, width = 800, height = 400 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d: DataPoint) => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d: DataPoint) => d.value) as number])
      .nice()
      .range([innerHeight, 0]);

    // Line generator
    const line = d3
      .line<DataPoint>()
      .x((d: DataPoint) => xScale(d.date))
      .y((d: DataPoint) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Add the line path
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add gradient area
    const area = d3
      .area<DataPoint>()
      .x((d: DataPoint) => xScale(d.date))
      .y0(innerHeight)
      .y1((d: DataPoint) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'area-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', innerHeight);

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3b82f6')
      .attr('stop-opacity', 0.3);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#3b82f6')
      .attr('stop-opacity', 0);

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'url(#area-gradient)')
      .attr('d', area);

    // Add axes
    svg
      .append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    svg.append('g').call(d3.axisLeft(yScale));

    // Add dots
    svg
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d: DataPoint) => xScale(d.date))
      .attr('cy', (d: DataPoint) => yScale(d.value))
      .attr('r', 4)
      .attr('fill', '#3b82f6');
  }, [data, width, height]);

  return <svg ref={svgRef} className="w-full h-full" />;
};

export default LineChart;