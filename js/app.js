import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, CHANNEL_ID } from './vars.js';

let ACTIVE = false;
let tokenData;

async function getTwitchToken() {
  tokenData = await getToken();
  ACTIVE = true;
  getData(tokenData.access_token);
  const extendedRequest = setTimeout(async () => {
    if (ACTIVE) { 
      tokenData = await getToken();
      ACTIVE = false;
      clearTimeout(extendedRequest);
    }
  }, tokenData.expires_in);
}

async function getToken() {
  const URL = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials&scope=user:read:email`;

  return fetch(URL, { method: 'POST' })
    .then(res => res.json())
    .then(data => {
      const { access_token, expires_in } = data;
      return { access_token, expires_in };
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
      const {stream} = data;
      let totalViewers = 0;
      if (stream) {
        totalViewers = data.stream.viewers;
        console.log('>', data || 'No hay datos');
        console.log('>', totalViewers);
      }
      document.querySelector('.viewers').innerHTML = totalViewers;
    });
}

getTwitchToken();
