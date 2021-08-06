const data = [
    { country: 'United States', value: 102510260 },
    { country: 'China (Mainland)', value: 47649834 },
    { country: 'USSR', value: 30790355 },
    { country: 'United Kingdom', value: 20500813 },
    { country: 'Japan', value: 14485037 },
  ];
  
const width = 650;
const height = 450;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

const svg = d3.select('#d3-top-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height])
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
  
  var x = d3.scaleLinear()
    .domain([0, 110000000])
    .range([ 0, width]);

  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.Country; }))
    .padding(.1);
  
    /* const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)
  
const y = d3.scaleLinear()
    .domain([0, 110000000])
    .range([height - margin.bottom, margin.top])*/
    
svg
    .append("g")
    .attr("fill", '#009eeb')
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(a.value, b.value)))
    .join("rect")
    .attr("x", x(0))// .attr("x", (d, i) => x(i))
    .attr("y", function(d) { return y(d.country);}) //.attr("y", d => y(d.value))
    //.attr('title', (d) => d.value)
    .attr("class", "rect")
    .attr("height", y.bandwidth())
    .attr("width", function(d) { return x(d.Value); }) //.attr("width", x.bandwidth())
    
    function yAxis(g) {
      g.call(d3.axisLeft(y))
  }
  
    function xAxis(g) {
    g.attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
  }

  function chartTitle(g) {
    g.append("text")
    .attr("x", width/3)
    .attr("y", 25)
    .attr("text-anchor", "left")
    .style("font-size", "24px")
    .style("font-weight", "600")
    .text("Top 5 Countries by Fuel Emissions")
    .attr("class", "u-custom-font u-text u-text-3")
  }

  function chartSubTitle(g) {
    g.append("text")
    .attr("x", width/2)
    .attr("y", 50)
    .attr("text-anchor", "left")
    .style("font-size", "14px")
    .text("(in million metric tons)")
    .attr("class", "u-custom-font u-text u-text-3")

  }

  function xAxisLabel(g) {
    g.append("text")
    .attr("transform", "translate(" + (width/2) + " ," + (height-5) + ")")
    .style("text-anchor", "middle")
    .attr("font-weight", '600')
    .text("Emissions Value (in million metric tons)")
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
    .text("Country")
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
  // svg.append("g").call(addAnnotationsLine);
  // svg.append("g").call(addAnnotations);
  svg.node();