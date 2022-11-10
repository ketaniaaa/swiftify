
  //this authorization code is based off the example authorization guide for implicit grant - this allows me to read users librarys as well as the rest of the spotify end points
  //the script was originally made for node.js so I have modified it for vanilla js and jquery - jquery allows me to access objects alot easier and control what is in view since 
  //most of the visual elements are on the home page ! 
//var has been used instead of const because this allows easy calling and redeclaration 
 


document.getElementById('login-button').addEventListener('click', function() { //event listener so that the token retrival starts when the login in button is clicked 
  
        var client_id = 'bcb25eec45ae43cd9274eb5e53ce167c'; // client id generated by the spotify developer dashboard 
        var redirect_uri = 'https://swiftify.netlify.app/'; // call back to netlify url that has been encoded 

        var state = generateRandomString(16);  //this will be the authorization token 

        localStorage.setItem(stateKey, state);
        var scope = 'user-read-private user-library-read user-top-read user-library-read'; //these are the scopes that the user agrees to on login because i need top read to get top tracks, private is to get 
        /* users name but i cannot change things to users library with these scopes  */

        var url = 'https://accounts.spotify.com/authorize'; //this is the base authorization url and this will open when login in is clicked
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id); //encode my client id so that it cannot be copied 
        url += '&scope=' + encodeURIComponent(scope); 
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);

        window.location = url; //open authentication tab 
      }, false);


   
      var stateKey = 'spotify_auth_state';
  
      /**
  
       * @return 
       */
      function getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
      }
  
      /**
       * random string for auth token and creates random string 
       * @param  {number} length length 
       * @return {string} 
       */
      function generateRandomString(length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
        for (var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      };
  
      var userProfileSource = document.getElementById('user-profile-template').innerHTML,
          userProfileTemplate = Handlebars.compile(userProfileSource), //i used handle bars so when you login in, the handlebars set up a template to display your username, this information is collected throguh the parameters you gree to 
          userProfilePlaceholder = document.getElementById('user-profile');
  
          oauthSource = document.getElementById('oauth-template').innerHTML,
          oauthTemplate = Handlebars.compile(oauthSource),
          oauthPlaceholder = document.getElementById('oauth');
  
      var params = getHashParams();
  
      var access_token = params.access_token,
          state = params.state,
          storedState = localStorage.getItem(stateKey);
  
      if (access_token && (state == null || state !== storedState)) {
        alert('There was an error during the authentication'); // display error if login does not work 
      } else {
        localStorage.removeItem(stateKey); //use prev access token to allow the app to access user data 
        if (access_token) {
          $.ajax({
              url: 'https://api.spotify.com/v1/me', //simple url in the spotify api endpoint documentation
              headers: {
                'Authorization': 'Bearer ' + access_token
              },
              success: function(response) {
                userProfilePlaceholder.innerHTML = userProfileTemplate(response); //fills in the html handle bar template with the relavent user data 
                startViz();  //start the function that contains the stuff to acquire d3 and the d3 data , showing the user name lets me know that the access token has been required so i 
                //can now make my charts 
  
                $('#login').hide();
                $('#loggedin').show(); //hides the login in page things and replaces that html content with the new data visualization content
 }
          });
        } else {
            $('#login').show(); //if log in doesnt work, the log in page will still remain visable 
            $('#loggedin').hide();
  
        }}
 
      
  





    //////////////////////////////////////////////////the main visualizations////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function startViz(){ //this function starts once the user has logged in 


         ////////////////////////////////////////////ON CLICK EVENT HANDLERS USING AJAX ////////////////////////////////////////


        $('#login').hide();

        $("#enter").on('click', function(){
          $('#enterArt').fadeIn('fast');
          $('#enter').fadeOut('fast');
          $('#introduction').hide();
          $('#shortBut').show(); //next page
          
          $.ajax({
                url: "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50", //check users long term artists 
            method: "GET",
            dataType: "json",
               headers: {
                'Authorization': 'Bearer ' + access_token
              }, success: function (data){
             console.log("artist: " + data.items); 
var preJSON = JSON.stringify(data.items);
var postJSON = JSON.parse(preJSON);  //create an array for d3 that only contains the relevant information that i want aka the items array only 
var chart = bubbleChart(postJSON);  //bubblechart function which will create the chart will use this new array to populate the chart 
d3.select("#bubbleChart").data(postJSON).call(chart);}  //use ajax to call the container that will hold the svg and then the chart function is the actual appending of the svg 
});  //}  //the data used is postJSON
});
/*////////////////////////////////////////////////////////////////////////////  SHORT TERM GRAPH START//////////////////////////////////////////////////////////////////// */
   $('#shortBut').on('click', function(){
    $("#enterArt").hide();
    $("#shortArt").fadeIn('fast');
    $("#shortBut").hide();
    $("#taylorTopBut").show();

    
    $.ajax({
        url: "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=40", //check recent artists, lowered the limit of artists returned here 
    method: "GET",
    dataType: "json",
       headers: {
        'Authorization': 'Bearer ' + access_token
      }, success: function (data2){
     console.log(" shortartist: " + data2.items);  //create an array for d3 that only contains the relevant information that i want aka the items array only 
var preJSON = JSON.stringify(data2.items);
var postJSON = JSON.parse(preJSON);


var chart2 = shortChart(postJSON);
d3.select("#shortChart").data(postJSON).call(chart2);}
}); 
});
/*////////////////////////////////////////////////////////////////////////////  TAYLOR TOP TRACKS   GRAPH START//////////////////////////////////////////////////////////////////// */

$('#taylorTopBut').on('click', function(){
    $('#shortArt').hide();
    $("#taylorTopBut").hide();
    $("#taylorTopTracks").fadeIn('slow');
    $("#folkloreBut").show();
  
    $.ajax({ //getting the json data 
        url: "https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02/top-tracks?market=ZA", //check taylors top tracks in south africa!  NTS: CHECK CORRECT URL!!!!!!!1
    method: "GET",
    dataType: "json",
       headers: {
        'Authorization': 'Bearer ' + access_token
      }, success: function (data3){ 
        /*these are mainly notes for myself to explain my logic but I realized I was just converting an array into a string and then back into an array when the DOM is able to display
        strings easily (the name item is a string in the json file) */
        //once obtained, process data 
            /* var unStrung = JSON.stringify(data3.tracks); //convert json into string that contains only the track data 
       var afterJSON = JSON.parse(unStrung); //convert into array  aka new value to access the information from therefore since these are obj in the */
       /*array, the name thing is a key and the actual name is the value so name(key): anti-hero(value) 
       let x = "";
       for (let i in afterJSON){ //x returns all values as one string so ideal x = anti-her , maroon, lavender haze etc 
        x += afterJSON[i].name;
       }
       console.log("taylors top tracks: " + (x + ","));  */
          /* afterJSON.forEach(function(track, index){
                let trackList = $('<li>' + afterJSON + '</li>');
                $('#trackList').append(trackList);
           });*/
        console.log("track:", data3.tracks);

  data3.tracks.map(function(title){
  let track = $('<li>' + title.name + '<br>'+ 'popularity:'+ title.popularity + '</li>' );
  track.appendTo($('#trackList'));
  track.attr('id', 'toptrackLi');

 })
//map id data to array to get audio feature function
          /*      var ids = data3.tracks.map(function (singleId){
                  return singleId.id;
                });
                var stringId = ids.join();
                audioFeatTop(stringId);

      
      
 /* var preTracks = JSON.stringify(data3.tracks);
  var postTracks = JSON.parse(preTracks);

  var chart3 = toptrackChart(postTracks);
    d3.select("#topTrackChart").data(postTracks).call(chart3);*/
   
      
     
    }
}); 
/*
function audioFeatTop(stringId){
  $.ajax({
    url: "https://api.spotify.com/v1/audio-features?", //endpoint for getting features for multiple tracks 
method: "GET",
data: { ids: stringId},
   headers: {
    'Authorization': 'Bearer ' + access_token
  }, 
  success: function (data){
 var stats = {
  energy: 0,
  danceability:0,
  liveness: 0,
  acousticness: 0,
  valence: 0,
  speechiness: 0
 };
 data.audio_features.forEach(function(audioFeature) {
  for (let prop in stats) {
      stats[prop] += audioFeature[prop];}});

var dataSet = [
  {
    name: "energy",
    color:  "#636851",
    value: stats.energy /data.audio_features.length
}, {
    name: "danceability",
    color: "#a0b179",
    value: totals.danceability / data.audio_features.length
}, {
    name: "liveness",
    color: "#4e4f3d",
    value: totals.liveness / data.audio_features.length
}, {
    name: "acousticness",
    color: "#cacda5",
    value: totals.acousticness / data.audio_features.length
}, {
    name: "valence",
    color: "#a3a277",
    value: totals.valence / data.audio_features.length
}, {
    name: "speechiness",
    color: "#99a285" ,
    value: totals.speechiness / data.audio_features.length
},
];
  
// must make chart 

avgfeatTopTrack(dataSet); //call chart function 








} 
});

*/
});
/*////////////////////////////////////////////////////////////////////////////  FOLKLORE GRAPH START//////////////////////////////////////////////////////////////////// */

        $("#folkloreBut").on('click', function(){
            $("#folkloreArt").fadeIn('fast');
            $("#folkloreBut").hide();
            $("#evermoreBut").show();
            $('#taylorTopTracks').hide();
            folklorePixel();
         
          });
/*////////////////////////////////////////////////////////////////////////////  EVERMORE GRAPH START//////////////////////////////////////////////////////////////////// */

          $('#evermoreBut').on('click', function(){
     
            $('#folkloreArt').hide();
            $("#evermoreArt").show();
            $('#evermoreBut').hide();
            $('#midnightsBut').show();
          });

/*////////////////////////////////////////////////////////////////////////////  MIDNIGHTS GRAPH START//////////////////////////////////////////////////////////////////// */
          $('#midnightsBut').on('click', function(){

            $('#evermoreArt').hide();
            $('#midnightsArt').show();
            $('#midnightsBut').hide();
            $('#restart').show();
          });


          $('#restart').on('click', function(){
            $('#restart').hide();
            $('#midnightsArt').hide();
            $('#folkloreBut').show();
          });



      }
      
      function bubbleChart(){

        //parameters

        var width = 600;
        var height = 500;
        var colRad = "popularity"; //get popularity 
        var colCol = "name"; //artists name 

        function chart(selection){

          var data =
          selection.enter().data();
          //seleting svg that i have added to the container and seeting the parameters 
          var svg = d3.select("#enterSvg");
          svg.attr('width', width).attr('height', height);

          var tooltip = selection.append("div").attr('id','bubbleTool').style("position", "absolute").style("opacity", 0).style("text-decoration", "none").style("padding", "12px").style("background-color", "rgb(230, 230, 230)").style("border-radius", "4px").style("text-align", "left")/*.style("font-family", "helvetica")*/.style("width", "200px").style("line-height", "150%").text("");
            //this code aims to make the bubbles move a little when the chart loads though ideally I would like to improve this so that the bubbles move a little when clicked on
          var simulation = d3.forceSimulation(data).force("charge", d3.forceManyBody().strength([-90])).force("x", d3.forceX()).force("y", d3.forceY()).on("tick", ticked); 
          function ticked(e){
            node.attr("cx", function(d) {
              return d.x * 1;
          }).attr("cy", function(d) {
              return d.y * 1;
          });
          }
          
  var scaleRadius = d3.scaleLinear().domain([
    d3.min(data, function(d) {
        return + d[colRad];
    }),
    d3.max(data, function(d) {
        return + d[colRad];
    })
]).range([10, 30]);

var node = svg.selectAll("circle").data(data).enter().append("circle").attr('r', function(d) {
    return scaleRadius(d[colRad]);
}).style("fill", function() {
    return '#5c6a55c8'; //green nodes that reflect the site color palette
}).attr("id", 'nodeBubble') //id so that I can style the bubbles from my css file because styling in JS is sometimes confusing.

.attr('transform', 'translate(' + [
    width / 2,
    height / 2
] + ')')
.on('mouseover', function(event, d){
// const [offsetY , offsetX] = d3.pointer(event);
var matrix = this.getScreenCTM()
  .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));

tooltip.style("opacity", 1.0);
tooltip.html(d[colCol] + "<br>" + "popularity: " + d[colRad])
.style("left", (window.pageXOffset + matrix.e + 15) + "px")
.style("top", (window.pageYOffset + matrix.f - 30)+ "px");
 /*

  .style("top", (d3.event.pageY -10)+ "px")
  .style("left", (d3.event.pageX +10) + "px");*/
}).on("mouseout", function() {
  return tooltip.style("opacity", 0);
});

//was struggling a bit at first to get the tooltip in view but fixed it with the window.page[axis]Offset and translating the tooltip by so its attached to the users 
//mouse instead of it floating away: the tooltip being attached to the mouse is less confusing to the user 

/*  .on("mouseover", function(d) {
    tooltip.html(d[colCol] + "<br>" + "Followers: " + d.followers.total + "<br>" + "Popularity: " + d[colCol]);
    return tooltip.style("visibility", "visible");
}).on("mousemove", function() {
    return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
}).on("mouseout", function() {
    return tooltip.style("visibility", "hidden");
    return tooltip.style("opacity", 0.9)
  .html ( d.name + "<br>" + "popularity:" + d.popularity);
});*/
}

chart.width = function(value) {
if (!arguments.length) {
  return width;
}
width = value;
return chart;
};

chart.height = function(value) {
if (!arguments.length) {
  return height;
}
height = value;
return chart;
};
return chart;
}

///////////////////////////////////////////////////////////////////////////////SHORT TERM DATA/////////////////////////////////////////////////////////////////////////////////////////////////

function shortChart(){

    //parameters

    var width = 600;
    var height = 500;
    var colRad = "popularity"; //get popularity 
    var colCol = "name"; //artists name 

    function chart2(selection){

      var data2 =
      selection.enter().data();

      var svg = d3.select("#shortSvg");
      svg.attr('width', width).attr('height', height);
      
      var tooltipShort = selection.append("div").attr('id','bubbletwoTool').style("position", "absolute").style("opacity", 0).style("text-decoration", "none").style("padding", "12px").style("background-color", "rgb(230, 230, 230)").style("border-radius", "4px").style("text-align", "left")/*.style("font-family", "helvetica")*/.style("width", "200px").style("line-height", "150%").text("");

      var simulation = d3.forceSimulation(data2).force("charge", d3.forceManyBody().strength([-90])).force("x", d3.forceX()).force("y", d3.forceY()).on("tick", ticked); 
      function ticked(e){
        node.attr("cx", function(d) {
          return d.x * 1;
      }).attr("cy", function(d) {
          return d.y * 1;
      });
      }
      
var scaleRadius = d3.scaleLinear().domain([
d3.min(data2, function(d) {
    return + d[colRad];
}),
d3.max(data2, function(d) {
    return + d[colRad];
})
]).range([10, 30]);

var node = svg.selectAll("circle").data(data2).enter().append("circle").attr('r', function(d) {
return scaleRadius(d[colRad]);
}).style("fill", function() {
return '#62445fc8';
}).attr("id", 'nodeshortBubble')

.attr('transform', 'translate(' + [
width / 2,
height / 2
] + ')')
.on('mouseover', function(event, d){
// const [offsetY , offsetX] = d3.pointer(event);
var matrix = this.getScreenCTM()
.translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));

tooltipShort.style("opacity", 1.0);
tooltipShort.html(d[colCol] + "<br>" + "popularity: " + d[colRad])
.style("left", (window.pageXOffset + matrix.e + 15) + "px")
.style("top", (window.pageYOffset + matrix.f - 30)+ "px");
/*

.style("top", (d3.event.pageY -10)+ "px")
.style("left", (d3.event.pageX +10) + "px");*/
}).on("mouseout", function() {
return tooltipShort.style("opacity", 0);
});

}

chart2.width = function(value) {
if (!arguments.length) {
return width;
}
width = value;
return chart2;
};

chart2.height = function(value) {
if (!arguments.length) {
return height;
}
height = value;
return chart2;
};
return chart2;
}

/*///////////////////////////////////////////////////AVERAGE AUDIO FEATURES FOR TOP TRACKS///////////////////////////////////////////////////////////////////////////////////// */
function avgfeatTopTrack(d){


}
function toptrackChart(){

   var width = 800;
   var height = 600;
   var margin = {top: 50, bottom: 50, left: 50, right: 50}; 
   var title = "name";
   var poptrack = "popularity";

   function chart3(selection){

    var data3 =
    selection.enter().data();

    var svg = d3.select("#topTrackSvg");
    svg.attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0,0,width, height] );

    var tooltipTopChart = selection.append("div")
    .attr('id','topTrackTool')
    .style("position", "absolute")
    .style("opacity", 0)
    .style("text-decoration", "none")
    .style("width", "200px")
    .style("background-color", "#4f62447f")
    .style("line-height", "150%").text("");

     var x = d3.scaleBand()
     .domain(d3.range(data3.length))
     .range([margin.left, width - margin.right])
     .padding(0.5);

     var y = d3.scaleLinear()
     .domain([88, 100])
     .range([height-margin.bottom, margin.top]);
  
     svg.append('g')
     .attr('fill', 'red')
     .selectAll('rect')
     .data(data3).enter()
     .join('rect')
     .attr('x', (d, i)=>x(i))
     .attr('y', (d) => y(0)-y(d.poptrack))
     .attr('height', d => y(0)-y(d.popularity))
  .attr('width', x.bandwidth())
  .attr('id', 'topTrackBar');



  function xAxis(g){
  
    g.call(d3.axisBottom(x).tickFormat(i=>data3[i].title))
      g.attr('transform', 'translate(0, ${height - margin.bottom})')
  
      .attr('font-size', '10px')
    
      .tickPadding([25])
      
  };
  
  function yAxis(g){
  g.attr('transform', 'translate(${margin.left},0)')
  .call(d3.axisLeft(y).ticks(null, data3.poptrack))
  };
svg.append('g').call(yAxis);
svg.append('g').call(xAxis);
svg.node();
   }

   chart3.width = function(value) {
    if (!arguments.length) {
    return width;
    }
    width = value;
    return chart3;
    };
    
    chart3.height = function(value) {
    if (!arguments.length) {
    return height;
    }
    height = value;
    return chart3;
    };
    return chart3();



}

 function folklorePixel(){
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
 "4,2": acoub,
 "5,2": liveC,
 "6,2": danceA,

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

const pixelSize = 25;
const width = pixelSize * pixelsWide;
const height = pixelSize * pixelsHigh;

const svgPf = d3
  .select("folklorePixel")
  .style("text-align", "center")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const translate = d => {
  const x = (d % pixelsWide) * pixelSize;
  const y = Math.floor(d / pixelsWide) * pixelSize;
  return `translate(${x},${y})`;
};

const fill = d => {
  const x = (d % 12) + 1;
  const y = Math.floor(d / 12) + 1;
  return pixelMap[`${x},${y}`] || "white";
};

const data = d3.range(pixelsWide * pixelsHigh);
svgPf
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("transform", translate)
  .attr("width", pixelSize)
  .attr("height", pixelSize)
  .style("fill", fill)
  .attr("stroke", "black")
  .attr("stroke-width", pixelSize / 100);

}