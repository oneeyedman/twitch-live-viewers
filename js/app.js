import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, CHANNEL_ID } from './vars.js';


function getToken() {
  const URL = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials&scope=user:read:email`;

  fetch(URL, {
    method: 'POST'
  })
    .then(res => res.json())
    .then(data => {
      const token = data.access_token;
      console.log(data);
      getData(token);
    });

}

function getData(token) {
  // const URL = 'https://api.twitch.tv/helix/users?login=guanaiman';
  const URL = 'https://api.twitch.tv/kraken/streams/' + CHANNEL_ID;
  const header = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Client-ID': CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  };

  console.log(header);
  fetch(URL, header)
    .then(res=>res.json())
    .then(data=>{
      const {viewers} = data.stream
      console.log('>', data);
      console.log('>', viewers);

      document.querySelector('.viewers').innerHTML = viewers;
    });
}

getToken();