// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 50, left: 100},
    width = 800 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#d3-dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/dheerajpatta/carbon-story/main/data/co2_trends.csv", 
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
  }, function(data) {

  // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([0, width ])
    
      svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
      svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#009eeb")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) }))

    // Animation using transitions
    svg.select("line")
    .transition()
    .duration(800)
    .attr("y", d => y(d.value))
    .attr("height", d => y(0) - y(d.value))
    .delay(function(d,i){console.log(i) ; return(i*100)});

    function chartTitle(g) {
          g.append("text")
          .attr("x", width/2)
          .attr("y", 25)
          .attr("text-anchor", "middle")
          .style("font-size", "24px")
          .style("font-weight", "600")
          .text("Co2 Emissions Yearly Trends")
          .attr("class", "u-custom-font u-text u-text-3")
        }
      
    function chartSubTitle(g) {
          g.append("text")
          .attr("x", width/2)
          .attr("y", 50)
          .attr("text-anchor", "middle")
          .style("font-size", "14px")
          .text("Hover on the chart to see tooltip and details")
          .attr("class", "u-custom-font u-text u-text-3")
      
        }
      
    function xAxisLabel(g) {
          g.append("text")
          .attr("transform", "translate(" + (width/2.5) + " ," + (height + 35) + ")")
          .style("text-anchor", "middle")
          .attr("font-weight", '600')
          .text("Year")
          .attr("class", "u-custom-font u-text u-text-3")
          .attr("font-size", '16px');
        }  
        
     function yAxisLabel(g) {
          g.append("text")
          .attr("transform", "rotate(-90)")
          .attr("x", -(height/2))
          .attr("y", -75)
          .style("text-anchor", "middle")
          .attr("font-size", '16px')
          .attr("font-weight", '600')
          .text("Emissions Value (in million metric tons)")
          .attr("class", "u-custom-font u-text u-text-3")
        }  

      function addAnnotationsLine1(g) {
        g.append("line")
        .attr("x1", x(1))
        .attr("x2", x(150))
        .attr("y1", y(0))
        .attr("y2", y(8000000))
        .attr("stroke", "grey")
        .attr("stroke-dasharray", "4")
      }
      
      function addAnnotations1(g) {
          g.append("text")
          .attr("x", width/1.75)
          .attr("y", 125)
          .text("Third Industrial Revolution (1969 onwards)")
          .attr("class", "u-custom-font u-text u-text-default u-text-2")
          .style("background-color", "gray")
          .style("border", "black")
          .style("border-width", "1px")
          .style("border-radius", "5px")
          .style("padding", "10px")
          .style("width", "200px")
          .style("font-size", "10px")
      }
      function addAnnotationsLine2(g) {
        g.append("line")
        .attr("x1", x(150))
        .attr("x2", x(200))
        .attr("y1", y(0))
        .attr("y2", y(5000000))
        .attr("stroke", "grey")
        .attr("stroke-dasharray", "4")
      }
      
      function addAnnotations2(g) {
          g.append("text")
          .attr("x", width/3.5)
          .attr("y", 500)
          .text("Second Industrial Revolution (1870 onwards)")
          .attr("class", "u-custom-font u-text u-text-default u-text-2")
          .style("background-color", "gray")
          .style("border", "black")
          .style("border-width", "1px")
          .style("border-radius", "5px")
          .style("padding", "10px")
          .style("width", "200px")
          .style("font-size", "10px")
      }

      //  svg.append("g").call(xAxis);
      //  svg.append("g").call(yAxis);
        svg.append("g").call(xAxisLabel);
        svg.append("g").call(yAxisLabel);
        svg.append("g").call(chartTitle);
        // svg.append("g").call(chartSubTitle);
        // svg.append("g").call(dataLabels);
        svg.append("g").call(addAnnotationsLine1);
        svg.append("g").call(addAnnotations1);
        svg.append("g").call(addAnnotationsLine2);
        svg.append("g").call(addAnnotations2);
        svg.node();
      })
