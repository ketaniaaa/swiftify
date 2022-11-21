
const data=[
  { title: 'Lavender Haze', popularity: 92, color: "#C3464A"},
  { title: 'Maroon', popularity: 90, color: "#75435A" },
  { title: 'Anti-Hero', popularity: 97, color: "#C3464A" },
  { title: 'Snow On The Beach', popularity: 90, color: "#75435A" },
  { title: "You're on Your Own, Kid", popularity: 89, color: "#75435AA" },
  { title: 'Midnight Rain', popularity: 91, color: "#C3464A" },
  { title: 'Question..?', popularity: 87, color: "#58698D" },
  { title: 'Vigilante Shit', popularity: 88, color: "#58698D" },
  { title: 'Bejeweled', popularity: 88, color: "#58698D" },
  { title: 'Labyrinth', popularity: 86, color: "#58698D" },
  { title: 'Karma', popularity: 89, color: "#75435A" },
  { title: 'Sweet Nothing', popularity: 85, color: "#58698D" },
  { title: 'Mastermind', popularity: 86, color: "#58698D" }
];

const width = 1000;
const height = 800;
const margin = {top: 50, bottom: 50, left:50, right:50};

const svg = d3.select('#mdntContainer')
.append('svg')
.attr('height', height -margin.top - margin.bottom)
.attr('width', width -margin.left - margin.right)
.attr('viewBox', [0,0,width, height + 40]);

svg.append("bg")
.attr("width", "100%")
.attr("height", "100%")
.attr("fill", "white");

var MNtooltip = d3.select('#mdntContainer')
.append("div")
.style("background-color", "#A67A39")
.style("opacity",0)
.attr("id", "midnightsTooltip")
var mouseover = function(d) {
  MNtooltip
    .style("opacity", 1)
  d3.select(this)
    .style("stroke", "black")
    .style("opacity", 1)
}
var mousemove = function(data, d) {
  MNtooltip
    .html("Track Title: " + d.title + " <br> Popularity score: " + d.popularity)
    .style("left", (d3.mouse(this)[0]+70) + "px")
    .style("top", (d3.mouse(this)[1]) + "px")
}
var mouseleave = function(d) {
  MNtooltip
    .style("opacity", 0)
  d3.select(this)
    .style("stroke", "none")
    .style("opacity", 0.8)
}


const x = d3.scaleBand()
.domain(d3.range(data.length))
.range([margin.left, width - margin.right])
.padding(0.5);

const y = d3.scaleLinear()
.domain([0, 100])
.range([height - margin.bottom, margin.top]);

svg
.append('g')
.attr('fill', '#B2402E'
)
.selectAll('rect')
.data(data)
.join('rect')
.attr('x', (d, i)=>x(i))
.attr('y', (d)=>y(d.popularity))
.attr('height', d => y(0)-y(d.popularity))
.attr('width', x.bandwidth() +20)
.attr('class', 'bar')
.on("mouseover", mouseover)
.on("mousemove", mousemove)
.on("mouseleave", mouseleave)




function xAxis(g){

g.call(d3.axisBottom(x).tickFormat(i=>data[i].title))
  g.attr("transform", "translate(0," + height + ")")

  .attr('font-size', '10px')
  .style("text-anchor", "end")
  .attr("transform", "rotate(-30)")
  .tickPadding([20])
  
};

function yAxis(g){
g.attr('transform', 'translate(${margin.left},0)')
.call(d3.axisLeft(y).ticks(null, data.format))
};
svg.append('g').call(yAxis);
//svg.append('g').call(xAxis);
svg.node();


$.ajax({ //getting the json data 
  url: "https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02/top-tracks?market=ZA", //check taylors top tracks in south africa!  NTS: CHECK CORRECT URL!!!!!!!1
method: "GET",
dataType: "json",
 headers: {
  'Authorization': 'Bearer ' + access_token
}, success: function (data3){ 
  console.log("track:", data3.tracks);

data3.tracks.map(function(title){
let track = $('<li>' + title.name + '<br>'+ 'popularity:'+ title.popularity + '</li>' );
track.appendTo($('#trackList'));
track.attr('id', 'toptrackLi');
});}
});