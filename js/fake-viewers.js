function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}





function getFakeViewers(currentFakeViewers) {
  const nextFakeViewers = randomInteger(0, 150);
  const update = currentFakeViewers !== nextFakeViewers;
  return {update, currentFakeViewers, nextFakeViewers};
}





export { getFakeViewers};