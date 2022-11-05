$(document).ready(function(){
$('button').click(function(){


    var client_id = 'bcb25eec45ae43cd9274eb5e53ce167c';
    var client_secret = 'c13d243bf01b444b89f9e01b2fb42659';
    
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(r => r.json())
    .then(r => {
        console.log(r.access_token)
    })





});
});