const data = [
    { type: 'Liquid Fuel', value: 130.8 },
    { type: 'Solid Fuel', value: 190.8 },
    { type: 'Gas Fuel', value: 55 },
    { type: 'Gas Flaring', value: 3.4 },
    { type: 'Cement', value: 11 },
    { type: 'Bunker', value: 9.7 },
  ];
  
const width = 650;
const height = 450;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

const svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);
  
const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)
  
const y = d3.scaleLinear()
    .domain([0, 200])
    .range([height - margin.bottom, margin.top])
    
// Add a tooltip div.
var tooltip = d3.select("#d3-container")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "lightblue")
  .style("border", "none")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("width", "200px")
  .style("font-size", "12px")
  .attr("class", "u-custom-font u-text u-text-default u-text-2")

// A function that change this tooltip when the user hover a point.
var mouseover = function(d, data) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 1)
      d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
}

var mousemove = function(d, data) {
  tooltip
    .html("Total emissions of " + data.type + " in million metric tons: " + data.value)
    .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
    .style("top", (d3.mouse(this)[1]) + "px")
}

// A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
var mouseleave = function(d, data) {
  tooltip
    .transition()
    .duration(200)
    .style("opacity", 0)
}
    
svg
    .append("g")
    .attr("fill", '#009eeb')
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(a.value, b.value)))
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.value)) //.attr("y", function(d) { return y(0);})
    .attr('title', (d) => d.value)
    .attr("class", "rect")
    //.attr("height", function(d) { return height - y(0); }) // always equal to 0
    .attr("height", d => y(0) - y(d.value))
    .attr("width", x.bandwidth())
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

/* Animation using transitions
    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value))
        .delay(function(d,i){console.log(i) ; return(i*100)});*/
    
    function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '10px')
  }
  
    function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].type))
      .attr("font-size", '15px')
  }

  function chartTitle(g) {
    g.append("text")
    .attr("x", width/2)
    .attr("y", 25)
    .attr("text-anchor", "left")
    .style("font-size", "24px")
    .style("font-weight", "600")
    .text("Fossil Fuels Category")
    .attr("class", "u-custom-font u-text u-text-3")
  }

  function chartSubTitle(g) {
    g.append("text")
    .attr("x", width/2)
    .attr("y", 50)
    .attr("text-anchor", "left")
    .style("font-size", "14px")
    .text("Hover on the chart to see tooltip and details")
    .attr("class", "u-custom-font u-text u-text-3")

  }

  function xAxisLabel(g) {
    g.append("text")
    .attr("transform", "translate(" + (width/2) + " ," + (height-5) + ")")
    .style("text-anchor", "middle")
    .attr("font-weight", '600')
    .text("Emission Type")
    .attr("class", "u-custom-font u-text u-text-3")
    .attr("font-size", '16px');
  }  
  
  function yAxisLabel(g) {
    g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height/2))
    .attr("y", 10)
    .style("text-anchor", "middle")
    .attr("font-size", '16px')
    .attr("font-weight", '600')
    .text("Emissions Value (in million metric tons)")
    .attr("class", "u-custom-font u-text u-text-3")

  }  

  function dataLabels(g) {
    g.selectAll("text")
    .data(data)
    .enter().append("text")
    .text(function(d) {return d.value})
    // .attr("x", function(d, i) {return (i * 125) + 25})
    // .attr("y", function(d, i) {return 100 - (d * 6)});
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.value))
    .attr("font-size", '15px')
  }

  // Add Annotations
// Append a horizontal line to highlight the annotation

function addAnnotationsLine(g) {
    g.append("line")
  .attr("x1", x(1) )
  .attr("x2", x(3) )
  .attr("y1", y(160))
  .attr("y2", y(160))
  .attr("stroke", "grey")
  .attr("stroke-dasharray", "4")
}

function addAnnotations(g) {
    g.append("text")
    .attr("x", width/2 + 10)
    .attr("y", 125)
    .text("Solid Fuel account for 48% of total emissions")
    .attr("class", "u-custom-font u-text u-text-default u-text-2")
    .style("background-color", "gray")
    .style("border", "black")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("width", "200px")
    .style("font-size", "14px")
}

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.append("g").call(xAxisLabel);
  svg.append("g").call(yAxisLabel);
  svg.append("g").call(chartTitle);
  svg.append("g").call(chartSubTitle);
  svg.append("g").call(dataLabels);
  svg.append("g").call(addAnnotationsLine);
  svg.append("g").call(addAnnotations);
  svg.node();