(function() {
  

    document.getElementById('login-button').addEventListener('click', function() {
  
        var client_id = 'bcb25eec45ae43cd9274eb5e53ce167c'; // client id
        var redirect_uri = 'https://swiftify.netlify.app/'; // call back uri

        var state = generateRandomString(16);

        localStorage.setItem(stateKey, state);
        var scope = 'user-read-private user-library-read user-top-read user-library-read'; //these are the scopes that the user agrees to on login because i need top read to get top tracks, private is to get 
        /* users name but i cannot change things to users library with these scopes  */

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
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
                startViz();  //start the function that contains the stuff to acquire d3 and the d3 data 
  
                $('#login').hide();
                $('#loggedin').show(); //hides the login in page things and replaces that html content with the new data visualization content
 }
          });
        } else {
            $('#login').show(); //if log in doesnt work, the log in page will still remain visable 
            $('#loggedin').hide();
  
        }
             ///////////////////////////////////////////////////////////////////////////////////////////new function to test that api and if the values are returned 
///////////////////////////////////////////////////////////////user top tracks///////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (access_token){

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
d3.select("#bubbleChart").data(postJSON).call(chart);


            
              }

            });

            

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
 }} } //END BUBBLE CHART
      
  
    })();




    //////////////////////////////////////////////////hide sections of home page////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function startViz(){
        $('#login').hide();

        $("#enter").on('click', function(){
          $('#enterArt').fadeIn('fast');
          $('#enter').hide();
          $('#folkloreBut').show();
        });


        $("#folkloreBut").on('click', function(){
            $("#folkloreArt").fadeIn('fast');
            $("#folkloreBut").hide();
            $("#evermoreBut").show();
            $('#enterArt').hide();
         
          });


          $('#evermoreBut').on('click', function(){
     
            $('#folkloreArt').hide();
            $("#evermoreArt").show();
            $('#evermoreBut').hide();
            $('#midnightsBut').show();
          });


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

      
    