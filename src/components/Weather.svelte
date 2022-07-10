<script>
    export let temperature, icon, description, uvi, humidity, pressure, wind_deg, wind_speed;
</script>


<section class="icon">
  <div class="weather_icon">
    <i class="wi wi-day-cloudy"></i>
  </div>
</section>
<section class="bottom">
  <div class="weather_data">
    <div>
        <div class="weathericons air_temperature"></div>
            <span>Air {@html temperature}</span>
    </div>
    <div>
        <div class="weathericons uv_index"></div>
            <span>UVI {@html uvi}</span>
    </div>
    <div>
        <div class="weathericons pressure"></div>
            <span>Pressure {@html pressure}</span>
    </div>
    <div>
        <div class="weathericons humidity"></div>
            <span>Humidity {@html humidity}</span>
    </div>
    <div>
        <div class="weathericons wind" style="transform: rotate({wind_deg}deg)"></div>
            <span>Wind {@html wind_speed}</span>
    </div>
    <!-- TODO <div>
        <div class="weathericons sea_temperature"></div>
            <span>Sea 22.3 &deg;C</span>
    </div> -->
  </div>
</section>