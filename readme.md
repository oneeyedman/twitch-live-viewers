# Twitch live viewers

Esto es un rollo para generar una página donde se vayan pintando los espectadores durante una transmisión.

Para que funcione necesitarás crear un archivo **js/vars.js** con la siguiente información

```javascript
const CLIENT_ID = 'XXX';
const CLIENT_SECRET = 'XXX';
const REDIRECT_URL = 'http://localhost:PORT/';
const CHANNEL_ID = 'XXX';

export {CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, CHANNEL_ID};
```

No me aclaro muy bien cómo gestionar estas claves así que monto un servidor local durante el directo y todos contentos.
