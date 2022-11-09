
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
                url: "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50", //check taylors top tracks in south africa!
            method: "GET",
            dataType: "json",
               headers: {
                'Authorization': 'Bearer ' + access_token
              }, success: function (data){
             console.log("artist: " + data.items); 
var preJSON = JSON.stringify(data.items);
var postJSON = JSON.parse(preJSON);
var chart = bubbleChart(postJSON);
d3.select("#bubbleChart").data(postJSON).call(chart);}
});  //}
});
/*////////////////////////////////////////////////////////////////////////////  SHORT TERM GRAPH START//////////////////////////////////////////////////////////////////// */
   $('#shortBut').on('click', function(){
    $("#enterArt").hide();
    $("#shortArt").fadeIn('fast');
    $("#shortBut").hide();
    $("#taylorTopBut").show();

    
    $.ajax({
        url: "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=40", //check taylors top tracks in south africa!
    method: "GET",
    dataType: "json",
       headers: {
        'Authorization': 'Bearer ' + access_token
      }, success: function (data2){
     console.log(" shortartist: " + data2.items); 
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
      }, success: function (data3){ //once obtained, process data 
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
           var track1JSON = JSON.stringify(data3.tracks);
           var track2JSON = JSON.parse(track1JSON);

           var chart3 = toptrackChart(track2JSON);
           d3.select("#topTrackChart").data(track2JSON).call(chart3);
           console.log("track:", data3.tracks);
           var topTracks = data3.tracks;
           
          


           data3.tracks.map(function(title){
            let track = $('<li>' + title.name + '</li>');
            track.appendTo($('#trackList'));
            track.attr('id', 'toptrackLi');
           })

      
      
      
     
    }
}); 


});
/*////////////////////////////////////////////////////////////////////////////  FOLKLORE GRAPH START//////////////////////////////////////////////////////////////////// */

        $("#folkloreBut").on('click', function(){
            $("#folkloreArt").fadeIn('fast');
            $("#folkloreBut").hide();
            $("#evermoreBut").show();
            $('#taylorTopTracks').hide();
         
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

          var svg = d3.select("#enterSvg");
          svg.attr('width', width).attr('height', height);

          var tooltip = selection.append("div").attr('id','bubbleTool').style("position", "absolute").style("opacity", 0).style("text-decoration", "none").style("padding", "12px").style("background-color", "rgb(230, 230, 230)").style("border-radius", "4px").style("text-align", "left")/*.style("font-family", "helvetica")*/.style("width", "200px").style("line-height", "150%").text("");

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
    return '#5c6a55c8';
}).attr("id", 'nodeBubble')

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
     .data(data3.sort((a,b) => d3.descending(a.poptrack, b.poptrack)))
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
  .call(d3.axisLeft(y).ticks(null, data.format))
  };
svg.append('g').call(yAxis);
svg.append('g').call(xAxis);
svg.node();
   }

   

return chart3();


}