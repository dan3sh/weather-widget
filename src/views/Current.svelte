<script>
  import { getJSON } from "../lib/async"
  import { onMount } from "svelte"
  import Weather from "../components/Weather.svelte"
import Place from "../components/Place.svelte";

let lat, lon;

let datetime = new Date();
datetime.setSeconds(0,0);

async function getPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    })
  }
}

function getPlace() {
  return getJSON(`/api/resolve-location?lat=${lat}&lon=${lon}`).then(
  result => {
    // console.log("place", result);
    const place = {
      name: result.name,
      country: result.country,
    };
    return place;
  }
  );
}

function getWeather() {
    return getJSON(`/api/weather?lat=${lat}&lon=${lon}`).then(
      results => {
        // console.log("weather", results);
        const weather = {
          temperature: `${results.temp} &degC`,
          icon: results.weather[0].icon,
          description: results.weather[0].description,
          uvi: results.uvi,
          humidity: `${results.humidity} %`,
          pressure: `${results.pressure} hPa`,
          wind_deg: results.wind_deg,
          wind_speed: `${results.wind_speed} km/h`,
        };
        return weather;
      }
    );
  }

onMount(async () => {
      getPosition();
  })

</script>

<header>
</header>

<article class="widget">
  <section class="top">
    <div class="info">{datetime.toLocaleString()
    .replace(/\//g, ".")
    .replace(/, /, " @ ")
    .replace(/\:00/g,"h")}</div>
    {#if (typeof(lat) == 'undefined')}
    <button on:click={getPosition}>Enable location services</button>
    <p>Location services must be enabled for this app to work.<br>
      Edit the permission in your browser and click on the button or reload the page.</p>
    {:else}
    {#await getPlace()}
    <span>Looking up your location...</span>
    {:then place}
    <Place {...place} />
    {/await}
  {/if}
  </section>
  {#if (typeof(lat) != 'undefined')}
    {#await getWeather()}
      <p>Loading weather data...</p>
    {:then weather}
      <Weather {...weather} />
    {/await}
  {/if}
</article>
<footer>
</footer>

<style>
  .city {
    text-align: center;
  }
  .top button {
    margin: 50px auto;
    display: flex;
  }

  .top p, .top span {
    padding: 0 40px;
  }
  .top span {
    display: flex;
    justify-content: center;
  }
</style>