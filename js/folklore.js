function chart1(){
 
  $("#chart1").fadeIn('fast');
  $("#chart3").hide();
  $("#chart2").hide();
  $("#chart4").hide();

  var margin = {top: 10, right: 40, bottom: 30, left: 30},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
var svg = d3.select("#chart1")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

      console.log("d3 has begun")

      var data = [
        {
            name: "energy",
            color: "#DAE2E7C7",
            value: 36
        },
        {
            name: "dance",
            color: "#2C3022C7",
            value: 77
        },
        {
            name: "speechiness",
            color: "#919F65C7",
            value: 52
        },
        {
            name: "acousticness",
            color: "#56764DC7",
            value: 76
        },
       /* */
        {
            name: "valence",
            color: "#4F5E46C7",
            value: 18
        },
        {
            name: "liveliness",
            color: "#000000",
            value: 12
        },
      ];

       xAxis = d3.scaleLinear()
      .domain([0,170])
      .range([0, width]);

     var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(data.map(function(d) { return d.name; }));
/*
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
       // .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");*/
      /*svg.append('g')
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xAxis));*/

      var y = d3.scaleLinear()
      .domain([0, 100])
      .range([ height, 0]);

      const rVal = d3.scaleLinear().domain([
        d3.min(data, function(d){
            return + d.value
        }),
        d3.max(data, function(d){
            return + d.value
        })
      ]).range([0, 100]);

     var cx = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right +200])
      .padding(1);
     
      var node = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", 200)
      .attr("cx", (d, i)=> cx(i))
      .attr("r", (d) => rVal(d.value))
      .attr("fill", function(d){
        return d.color;
      });
      
      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 135)
      .attr("x2", 135)
      .attr("y1", 200)
      .attr("y2", 360);

      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 240)
      .attr("x2", 240)
      .attr("y1", 200)
      .attr("y2", 360); 
      
      
      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 350)
      .attr("x2", 350)
      .attr("y1", 200)
      .attr("y2", 360);

      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 460)
      .attr("x2", 460)
      .attr("y1", 200)
      .attr("y2", 360);

      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 572)
      .attr("x2", 572)
      .attr("y1", 200)
      .attr("y2", 360);
 ///////////////////////////////////////////remember to change this     
svg.append("text") //energy
.text("0.36")
.attr("x", 120)
.attr("y", 380)
.attr("id", "songFeatLabel");
     
svg.append("text") //dance
.text("0.77")
.attr("x", 220)
.attr("y", 380)
.attr("id", "songFeatLabel");

svg.append("text") //speechiness
.text("0.52")
.attr("x", 330)
.attr("y", 380)
.attr("id", "songFeatLabel");

svg.append("text") //acous
.text("0.76")
.attr("x", 440)
.attr("y", 380)
.attr("id", "songFeatLabel");

svg.append("text") //valence
.text("0.18")
.attr("x", 550)
.attr("y", 380)
.attr("id", "songFeatLabel");
}

function chart2(){
  
  $("#chart2").fadeIn('fast');
  $("#chart1").hide();
  $("#chart3").hide();
  $("#chart4").hide();


  var margin = {top: 10, right: 40, bottom: 30, left: 30},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
var svg = d3.select("#chart2")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

      console.log("d3 has begun")

      var data = [
        {
            name: "energy",
            color: "#DAE2E7C7",
            value: 59
        },
        {
            name: "dance",
            color: "#2C3022C7",
            value: 61
        },
        {
            name: "speechiness",
            color: "#919F65C7",
            value: 10
        },
        {
            name: "acousticness",
            color: "#56764DC7",
            value: 53
        },
       /* */
        {
            name: "valence",
            color: "#4F5E46C7",
            value: 55
        },
        
      ];

       xAxis = d3.scaleLinear()
      .domain([0,170])
      .range([0, width]);

     var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(data.map(function(d) { return d.name; }));
     var y = d3.scaleLinear()
      .domain([0, 100])
      .range([ height, 0]);

      const rVal = d3.scaleLinear().domain([
        d3.min(data, function(d){
            return + d.value
        }),
        d3.max(data, function(d){
            return + d.value
        })
      ]).range([0, 100]);

     var cx = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right +200])
      .padding(1);
     
      var node = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", 200)
      .attr("cx", (d, i)=> cx(i))
      .attr("r", (d) => rVal(d.value))
      .attr("fill", function(d){
        return d.color;
      });
      
      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 145)
      .attr("x2", 145)
      .attr("y1", 200)
      .attr("y2", 360);

      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 260)
      .attr("x2", 260)
      .attr("y1", 200)
      .attr("y2", 360); 
      
      
      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 350)
      .attr("x2", 350)
      .attr("y1", 200)
      .attr("y2", 360);

      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 490)
      .attr("x2", 490)
      .attr("y1", 200)
      .attr("y2", 360);

      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 650)
      .attr("x2", 650)
      .attr("y1", 200)
      .attr("y2", 360);
 ///////////////////////////////////////////remember to change this     
svg.append("text") //energy
.text("0.59")
.attr("x", 120)
.attr("y", 380)
.attr("id", "songFeatLabel");
     
svg.append("text") //dance
.text("0.61")
.attr("x", 220)
.attr("y", 380)
.attr("id", "songFeatLabel");

svg.append("text") //speechiness
.text("0.04")
.attr("x", 330)
.attr("y", 380)
.attr("id", "songFeatLabel");

svg.append("text") //acous
.text("0.53")
.attr("x", 440)
.attr("y", 380)
.attr("id", "songFeatLabel");

svg.append("text") //valence
.text("0.55")
.attr("x", 600)
.attr("y", 380)
.attr("id", "songFeatLabel");
}






function chart3(){
  $("#chart3").fadeIn('fast');
  $("#chart1").hide();
  $("#chart2").hide();
  $("#chart4").hide();

  var margin = {top: 10, right: 40, bottom: 30, left: 30},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
var svg = d3.select("#chart3")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

      console.log("d3 has begun")

      var data = [
        {
            name: "energy",
            color: "#DAE2E7C7",
            value: 59
        },
        {
            name: "dance",
            color: "#2C3022C7",
            value: 69
        },
        {
            name: "speechiness",
            color: "#919F65C7",
            value: 41
        },
        {
            name: "acousticness",
            color: "#56764DC7",
            value: 47
        },
       /* */
        {
            name: "valence",
            color: "#4F5E46C7",
            value: 71
        },
       
      ];

       xAxis = d3.scaleLinear()
      .domain([0,170])
      .range([0, width]);

     var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(data.map(function(d) { return d.name; }));


      var y = d3.scaleLinear()
      .domain([0, 100])
      .range([ height, 0]);

      const rVal = d3.scaleLinear().domain([
        d3.min(data, function(d){
            return + d.value
        }),
        d3.max(data, function(d){
            return + d.value
        })
      ]).range([0, 100]);

     var cx = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right +200])
      .padding(1);
     
      var node = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", 200)
      .attr("cx", (d, i)=> cx(i))
      .attr("r", (d) => rVal(d.value))
      .attr("fill", function(d){
        return d.color;
      });
      
      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 135)
      .attr("x2", 135)
      .attr("y1", 200)
      .attr("y2", 360);

      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 240)
      .attr("x2", 240)
      .attr("y1", 200)
      .attr("y2", 360); 
      
      
      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 350)
      .attr("x2", 350)
      .attr("y1", 200)
      .attr("y2", 360);

      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 460)
      .attr("x2", 460)
      .attr("y1", 200)
      .attr("y2", 360);

      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 572)
      .attr("x2", 572)
      .attr("y1", 200)
      .attr("y2", 360);
 ///////////////////////////////////////////remember to change this     
svg.append("text") //energy
.text("0.59")
.attr("x", 120)
.attr("y", 380)
.attr("id", "songFeatLabel");
     
svg.append("text") //dance
.text("0.69")
.attr("x", 220)
.attr("y", 380)
.attr("id", "songFeatLabel");

svg.append("text") //speechiness
.text("0.41")
.attr("x", 330)
.attr("y", 380)
.attr("id", "songFeatLabel");

svg.append("text") //acous
.text("0.47")
.attr("x", 440)
.attr("y", 380)
.attr("id", "songFeatLabel");

svg.append("text") //valence
.text("0.71")
.attr("x", 550)
.attr("y", 380)
.attr("id", "songFeatLabel");
}

function chart4(){
  $("#chart4").fadeIn('fast');
  $("#chart1").hide();
  $("#chart2").hide();
  $("#chart3").hide();

  var margin = {top: 10, right: 40, bottom: 30, left: 30},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
var svg = d3.select("#chart4")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

      console.log("d3 has begun")

      var data = [
        {
            name: "energy",
            color: "#DAE2E7C7",
            value: 38
        },
        {
            name: "dance",
            color: "#2C3022C7",
            value: 30
        },
        {
            name: "speechiness",
            color: "#919F65C7",
            value: 3
        },
        {
            name: "acousticness",
            color: "#56764DC7",
            value: 78
        },
       /* */
        {
            name: "valence",
            color: "#4F5E46C7",
            value: 15
        },
       
      ];

       xAxis = d3.scaleLinear()
      .domain([0,170])
      .range([0, width]);

     var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(data.map(function(d) { return d.name; }));


      var y = d3.scaleLinear()
      .domain([0, 100])
      .range([ height, 0]);

      const rVal = d3.scaleLinear().domain([
        d3.min(data, function(d){
            return + d.value
        }),
        d3.max(data, function(d){
            return + d.value
        })
      ]).range([0, 100]);

     var cx = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right +200])
      .padding(1);
     
      var node = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", 200)
      .attr("cx", (d, i)=> cx(i))
      .attr("r", (d) => rVal(d.value))
      .attr("fill", function(d){
        return d.color;
      });
      
      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 155)
      .attr("x2", 155)
      .attr("y1", 200)
      .attr("y2", 360);

      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 260)
      .attr("x2", 260)
      .attr("y1", 200)
      .attr("y2", 360); 
      
      
      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 370)
      .attr("x2", 370)
      .attr("y1", 200)
      .attr("y2", 360);

      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 480)
      .attr("x2", 480)
      .attr("y1", 200)
      .attr("y2", 360);

      svg.append("g")
      .attr("stroke", "#000000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 3,3)
    .selectAll("line")
    .data(data)
    .join("line")
      .attr("x1", 660)
      .attr("x2", 660)
      .attr("y1", 200)
      .attr("y2", 360);
 ///////////////////////////////////////////remember to change this     
svg.append("text") //energy
.text("0.38")
.attr("x", 120)
.attr("y", 380)
.attr("id", "songFeatLabel");
     
svg.append("text") //dance
.text("0.30")
.attr("x", 220)
.attr("y", 380)
.attr("id", "songFeatLabel");

svg.append("text") //speechiness
.text("0.03")
.attr("x", 330)
.attr("y", 380)
.attr("id", "songFeatLabel");

svg.append("text") //acous
.text("0.78")
.attr("x", 440)
.attr("y", 380)
.attr("id", "songFeatLabel");

svg.append("text") //valence
.text(".15")
.attr("x", 630)
.attr("y", 380)
.attr("id", "songFeatLabel");
}

function hideCharts(){
  
  $("#folkloresub").hide();
  $("#chart1").hide();
  $("#chart2").hide();
  $("#chart3").hide();
  $("#chart4").hide();

}
/*const data=[
    { title: 'the 1', popularity: 64},
    { title: 'cardigan', popularity: 65},
    { title: 'the last great american dynasty', popularity: 63},
    { title: 'exile (feat. Bon Iver)', popularity: 64},
    { title: 'my tears richochet', popularity: 64},
    { title: 'mirrorball', popularity: 63},
    { title: 'seven', popularity: 62},
    { title: 'august', popularity: 65},
    { title: 'this is me trying', popularity: 63},
    { title: 'illicit affairs', popularity: 62},
    { title: 'invisible string', popularity: 62},
    { title: 'mad woman', popularity: 61},
    { title: 'ephiphany', popularity: 60},
    { title: 'betty', popularity: 62},
    { title: 'peace', popularity: 60},
    { title: 'haox', popularity: 60},
    { title: 'the lakes - bonus track', popularity: 65}
];

const width = 600;
const height = 400;
const margin = {top: 50, bottom: 50, left:50, right:50};

const svg = d3.select('#folkloreContainer')
.append('svg')
.attr('height', height -margin.top - margin.bottom)
.attr('width', width -margin.left - margin.right)
.attr('viewBox', [0,0,width, height]);

svg.append("bg")
.attr("width", "100%")
.attr("height", "100%")
.attr("fill", "white");


const x = d3.scaleBand()
.domain(d3.range(data.length))
.range([margin.left, width - margin.right])
.padding(0.5);

const y = d3.scaleLinear()
.domain([58, 66])
.range([height - margin.bottom, margin.top]);

svg
.append('g')
.attr('fill', '#596428')
.selectAll('rect')
.data(data.sort((a,b) => d3.descending(a.popularity, b.popularity)))
.join('rect')
.attr('x', (d, i)=>x(i))
.attr('y', (d)=>y(d.popularity))
.attr('height', d => y(0)-y(d.popularity))
.attr('width', x.bandwidth())
.attr('class', 'bar')

function xAxis(g){
  
  g.call(d3.axisBottom(x).tickFormat(i=>data[i].title))
    g.attr('transform', 'translate(0, ${height - margin.bottom})')

    .attr('font-size', '5px')
  
    .tickPadding([25])
    
};

function yAxis(g){
g.attr('transform', 'translate(${margin.left},0)')
.call(d3.axisLeft(y).ticks(null, data.format))
};
svg.append('g').call(yAxis);
svg.append('g').call(xAxis);
svg.node();*/