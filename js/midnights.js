
  var danceA = "#67230e";
  var danceB = "#956556";
  var danceC = "#4a7b6e";
  var danceD = "#c2a79f";

var energyA = '#070b0c';
var energyB = '#6a6d6d';
var energyC = '#838568';
var energyD = '#9c9d9e';


var speechA = "#c27251";
var speechB = "#c88062";
var speechC = "#d49c85";
var speechD = "#e1b948";

var acousA = "#7e5c43";
var acousB = "#8b6c56";
var acousC = "#a58d7b";
var acousD = "#bfaea1";

var liveA = "#606256";
var liveB = "#787a6c";
var liveC = "#939589";
var liveD = "#bcbdb6";

var valA = "#362f38";
var valB = "#443b46";
var valC = "#69626b";
var valD = "#7c767e";

const chartMap ={

  //the 1
 "1,1": danceA,
 "2,1": energyB,
 "3,1": speechC,
 "4,1": acousA,
 "5,1": liveD,
 "6,1": valD,

//cardigan
 "1,2": danceC,
 "2,2": energyB,
 "3,2": speechD,
 "4,2": acousB,
 "5,2": liveC,
 "6,2": valB,

//the las great american dynasty
 "1,3": danceB,
 "2,3": energyB,
 "3,3": speechC,
 "4,3": acousC,
 "5,3": liveD,
 "6,3": valA,

//exhile
 "1,4": danceC,
 "2,4": energyC,
 "3,4": speechD,
 "4,4": acousA,
 "5,4": liveD,
 "6,4": valD,
//my tears richochet
 "1,5": danceC,
 "2,5": energyD,
 "3,5": speechD,
 "4,5": acousA,
 "5,5": liveD,
 "6,5": valD,

//mirrorball
 "1,6": danceB,
 "2,6":energyC,
 "3,6": speechD,
 "4,6": acousB,
 "5,6":  liveD,
 "6,6": valC,
//seven
 "1,7": danceB,
 "2,7": energyC,
 "3,7": speechD,
 "4,7": acousA,
 "5,7":  liveD,
 "6,7": valC,
//august
 "1,8": danceB,
 "2,8": energyB,
 "3,8": speechD,
 "4,8": acousB,
 "5,8":  liveD,
 "6,8": valC,
//illicit affairs
 "1,9": danceB,
 "2,9": energyC,
 "3,9": speechD,
 "4,9": acousC,
 "5,9":  liveD,
 "6,9": valC,
//this is me trying 
 "1,10": danceB,
 "2,10": energyC,
 "3,10": speechD,
 "4,10": acousA,
 "5,10": liveD,
 "6,10": valC
 
}
let pixelsWide = 0;
let pixelsHigh = 0;

Object.keys(chartMap).forEach(k => {
  const coordinates = k.split(",");
  const x = Number(coordinates[0]);
  const y = Number(coordinates[1]);
  if (x > pixelsWide) {
    pixelsWide = x;
  }
  if (y > pixelsHigh) {
    pixelsHigh = y;
  }
});

const pixelSize = 60;
const width = pixelSize * pixelsWide;
const height = pixelSize * pixelsHigh;

const svgPf = d3
  .select("#midnightsContainer")
  .style("text-align", "center")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

  const translate = f => {
    const x = (f % pixelsWide) * pixelSize;
    const y = Math.floor(f / pixelsWide) * pixelSize;
    return `translate(${x},${y})`;
  };
  
  const fill = f => {
    const x = (f % 6) + 1;
    const y = Math.floor(f / 6) + 1;
    return  chartMap[`${x},${y}`] || "white";
  };
  
  const data4 = d3.range(pixelsWide * pixelsHigh);
  svgPf
    .selectAll("rect")
    .data(data4)
    .enter()
    .append("rect")
    .attr("transform", translate)
    .attr("width", pixelSize)
    .attr("height", pixelSize)
    .style("fill", fill)
    .attr("stroke", "white")
    .attr("stroke-width", pixelSize / 70);