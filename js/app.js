import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, CHANNEL_ID, REFRESH_MS, COUNTER_UPDATE } from './vars.js';
import { getFakeViewers } from './fake-viewers.js';

let ACTIVE = false;
let tokenData;
const viewersContainer = document.querySelector('.js__viewers');
const viewersCurrent = document.querySelector('.js__viewers-current');
const viewersNext = document.querySelector('.js__viewers-next');
let currentViewers = 0;
let nextViewers = 0;





async function getTwitchToken() {
  tokenData = await getToken();
  ACTIVE = true;
  setInterval(() => {
    getStreamData(tokenData.access_token);
  }, REFRESH_MS);
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





function getStreamData(token) {
  const URL = 'https://api.twitch.tv/kraken/streams/' + CHANNEL_ID;
  const header = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Client-ID': CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  };

  fetch(URL, header)
  .then(res=>res.json())
  .then(data=>{
    const {stream} = data;
      if (stream) {
        viewersContainer.classList.remove('hidden');
        nextViewers = data.stream.viewers;
        const update = currentViewers !== nextViewers;
        update && updateViewersCounter(nextFakeViewers, nextViewers);
      } else {
        viewersContainer.classList.add('hidden');
      }
    });
}





function updateViewersCounter(currentTotal, nextTotal) {
  currentViewers = currentTotal;
  nextViewers = nextTotal;
  const animationClassModifier = (nextViewers > currentViewers) ? '--animate-up' : '--animate-down';
  const animationClass = 'app__viewers' + animationClassModifier;

  viewersContainer.classList.add(animationClass);
  viewersNext.textContent = nextViewers;
  setTimeout(() => {
    viewersCurrent.textContent = nextViewers;
    viewersContainer.classList.remove(animationClass);
    currentViewers = nextViewers;
  }, COUNTER_UPDATE);
} 





//getTwitchToken();

/* FOR TESTING PURPOSES ONLY */
viewersContainer.classList.remove('hidden');
setInterval(() => {
  const { update, currentFakeViewers, nextFakeViewers } = getFakeViewers(currentViewers);

  update && updateViewersCounter(currentFakeViewers, nextFakeViewers);
}, REFRESH_MS);
