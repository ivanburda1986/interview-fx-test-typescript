export async function loadServerFXPairs() {
  const response = await fetch("https://run.mocky.io/v3/c88db14a-3128-4fbd-af74-1371c5bb0343");
  const fxPairs = await response.json();
  if (response.ok === true) {
    return fxPairs;
  } else {
    console.log(response.status, response.statusText);
  }
}
