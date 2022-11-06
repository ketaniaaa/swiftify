(function() {
  

    /*spotify log in code that was a tutorial i followed for implicit grant and OAuth*/
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
  
  function startViz(){
    $('#login').hide();
  
  
    $('#back').addEventListener('click', function(){
      $('#topArtists').hide();
      $('#new').show(); /* i wanted to make this a single page for all the data visualizations but it doesnt work.....idk man */ 
  
    });
  
    //get the information for creating the d3 charts
    var d3 = require("d3");
  
    $.ajax({
  
      url: "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50",
      type: "GET",
      beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', 'Bearer' + access_token);
      }, 
      success: function(data){
        var beforeJSON = JSON.stringify(data.items); //convert items from top artists into a json string 
        var myJSON = JSON.parse(beforeJSON); // transforming the results 
        console.log('begin d3');//just so that i know that this is starting and data has been transformed into json
  
      }
    });
  }
  
  
  
  
        document.getElementById('login-button').addEventListener('click', function() {
  
          var client_id = 'bcb25eec45ae43cd9274eb5e53ce167c'; // client id
          var redirect_uri = 'https://ketaniaaa.github.io/swiftify'; // call back uri
  
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
      }
    })();
  