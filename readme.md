# Twitch live viewers

Esto es un rollo para generar una página donde se vayan pintando los espectadores durante una transmisión.

Para que funcione necesitarás crear un archivo **js/vars.js** con la siguiente información

```javascript
const CLIENT_ID = 'XXX';
const CLIENT_SECRET = 'XXX';
const USER_LOGIN = 'XXX';
const REFRESH_MS = 5000;
const COUNTER_UPDATE = 700;

export { 
  CLIENT_ID,
  CLIENT_SECRET,
  USER_LOGIN,
  REFRESH_MS,
  COUNTER_UPDATE
};
```

No me aclaro muy bien cómo gestionar estas claves así que monto un servidor local durante el directo y todos contentos.

Para un proceso más detallado <a href="https://oneeyedman.medium.com/creando-un-contador-de-espectadores-de-twitch-para-obs-studio-53f0a1dfaded">he escrito un post ;)</a>
