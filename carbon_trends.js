// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 900 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/dheerajpatta/carbon-story/main/data/co2_yearly_trends.csv", 
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
  }, function(data) {

  // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      //.domain([1751-01-01, 2014-01-01])
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
        .y(function(d) { return y(d.value) })
        )

    /* function yAxis(g) {
          g.attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(null, data.format))
            .attr("font-size", '10px')
        }
        
      function xAxis(g) {
          g.attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickFormat(i => data[i].date))
            .attr("font-size", '15px')
        }*/

    function chartTitle(g) {
          g.append("text")
          .attr("x", width/2)
          .attr("y", 25)
          .attr("text-anchor", "left")
          .style("font-size", "24px")
          .style("font-weight", "600")
          .text("Co2 Emissions Yearly Trends")
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

      //  svg.append("g").call(xAxis);
      //  svg.append("g").call(yAxis);
        svg.append("g").call(xAxisLabel);
        svg.append("g").call(yAxisLabel);
        svg.append("g").call(chartTitle);
        svg.append("g").call(chartSubTitle);
        // svg.append("g").call(dataLabels);
        // svg.append("g").call(addAnnotationsLine);
        // svg.append("g").call(addAnnotations);
        svg.node();
      })
