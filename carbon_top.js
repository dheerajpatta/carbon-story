// set the dimensions and margins of the graph
var margin = {top: 60, right: 30, bottom: 100, left: 100},
    width = 375 - margin.left - margin.right,
    height = 425 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz_top")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/dheerajpatta/carbon-story/main/data/top_country.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 95000000])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.country; }))
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y))

    // Add a tooltip div.
var tooltip = d3.select("#my_dataviz_top")
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
  .html("Total emissions of " + d.country + " in million metric tons: " + d.value)
  .style("left", (d3.mouse(this)[0]) + "px")
  .style("top", (d3.mouse(this)[0]) + "px")
}

// A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
var mouseleave = function(d, data) {
tooltip
  .transition()
  .duration(200)
  .style("opacity", 0)
}
  
  //Bars
  svg.selectAll("Rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.country); })
    .attr("width", function(d) { return x(d.value); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#009eeb")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

    function handleMouseOver(d, i) {
      d3.select(this)
        .attr("fill", "lightblue");
  }

  function handleMouseOut(d, i) {
      d3.select(this)
        .attr("fill", "#009eeb");
  }

  function chartTitle(g) {
    g.append("text")
    .attr("x", width/2)
    .attr("y", -50)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .style("font-weight", "600")
    .text("Top 5 Countries by Fuel Emissions")
    .attr("class", "u-custom-font u-text u-text-3")
  }

  function chartSubTitle(g) {
    g.append("text")
    .attr("x", width/2)
    .attr("y", -30)
    .attr("text-anchor", "middle")
    .style("font-size", "10px")
    .text("Hover on the chart to see emission details")
    .attr("class", "u-custom-font u-text u-text-3")

  }

  function xAxisLabel(g) {
    g.append("text")
    .attr("transform", "translate(" + (width/2) + " ," + (height+75) + ")")
    .style("text-anchor", "middle")
    .attr("font-weight", '600')
    .text("Total Co2 Emissions Value")
    .attr("class", "u-custom-font u-text u-text-3")
    .attr("font-size", '12px');
  }  
  
  function yAxisLabel(g) {
    g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height/2))
    .attr("y", -50)
    .style("text-anchor", "middle")
    .attr("font-size", '12px')
    .attr("font-weight", '600')
    .text("Country")
    .attr("class", "u-custom-font u-text u-text-3")

  }

  //svg.append("g").call(xAxis);
  //svg.append("g").call(yAxis);
  svg.append("g").call(xAxisLabel);
  svg.append("g").call(yAxisLabel);
  svg.append("g").call(chartTitle);
  svg.append("g").call(chartSubTitle);
  //svg.append("g").call(dataLabels);
  //svg.append("g").call(addAnnotationsLine);
  //svg.append("g").call(addAnnotations);
  //svg.node();
})