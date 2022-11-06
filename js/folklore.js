const data=[
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

const width = 1000;
const height = 800;
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
svg.node();
