<script>
  import { getJSON } from "../lib/async"
  import { onMount } from "svelte"

let lat, lon;

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
    console.log("place", result);
    const place = {
      name: result.name,
      country: result.country,
    };
    return place;
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
      <div class="info">20.06.2022. @ 14:43h</div>
      {#if (typeof(lat) == 'undefined')}
      <button on:click={getPosition}>Enable location services</button>
      <p>Location services must be enabled for this app to work.<br>
        Edit the permission in your browser and click on the button or reload the page.</p>
      {:else}
        <div class="weather_icon">
            <i class="wi wi-day-cloudy"></i>
        </div>
        {#await getPlace()}
        <span>Looking up your location...</span>
        {:then place}
        <div class=info>
          <div class="city">
            {place.name},<br>
            {place.country}
          </div>
        </div>
        {/await}
      {/if}
  </section>
  <section class="bottom">
      <div class="weather_data">
          <div>
              <div class="weathericons air_temperature"></div>
                  <span>Air 28.7 &deg;C</span>
          </div>
          <div>
              <div class="weathericons uv_index"></div>
                  <span>UVI 3</span>
          </div>
          <div>
              <div class="weathericons pressure"></div>
                  <span>Pressure 1018 hPa</span>
          </div>
          <div>
              <div class="weathericons humidity"></div>
                  <span>Humidity 30 %</span>
          </div>
          <div>
              <div class="weathericons wind"></div>
                  <span>Wind NW 12 km/h</span>
          </div>
          <div>
              <div class="weathericons sea_temperature"></div>
                  <span>Sea 22.3 &deg;C</span>
          </div>
      </div>
  </section>
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