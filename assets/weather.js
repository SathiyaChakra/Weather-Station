 var backgrounds = {
  "cloudy" : "http://amitkulkarni.info/pics/khandala-tunnels-pawna-dam/photos/cloudy-weather-at-pavna-dam-lonavala.jpg","showers" : "http://www.seattleweatherblog.com/wp-content/uploads/2012/02/snow.jpg",
  "snow" : "http://www.wallpaperscharlie.com/wp-content/uploads/2016/07/Snowy-Weather-HD-Images-6.jpg",
  "windy" : "http://wallup.net/wp-content/uploads/2016/01/196605-dog-animals-nature-landscape-windy-Border_Collie.jpg",
  "clear":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSmYS3ccRxDW4zUY1-0IJLnXMxK6mcyF1FMfLw4bSGMwekaOEiZ",
  "sunny" : "http://www.tigneswebcam.com/wp-content/uploads/2015/01/sunny-in-tignes-.jpg",
  "fog" : "http://awesomewallpapers.in/assets/img/wallpapers/Fog/Best-Fog-Wallpaper-High-Resolution-Image.jpg",
  "rainy" : "http://www.siwallpaperhd.com/wp-content/uploads/2016/03/rain_rainy_in_the_city_wallpaper.jpg",
  "sleet" : "http://www.siwallpaperhd.com/wp-content/uploads/2016/03/rain_rainy_in_the_city_wallpaper.jpg","snow wind" : "http://thiswallpaper.com/cdn/hdwallpapers/999/snow%20winter%20forest%20nature.jpg","thunderstorm" : "http://wallpapercave.com/wp/rpx0N4N.jpg","cloudy high" : "http://www.wallpaperscharlie.com/wp-content/uploads/2016/07/Cloudy-Weather-HD-Pics-5.jpg",
  "hail" : "https://i.ytimg.com/vi/8CesDSzWHwQ/maxresdefault.jpg",
  "rain mix" : "https://s-media-cache-ak0.pinimg.com/originals/b9/38/a8/b938a864bf819759f73ba34db28f5ca5.jpg",
  "sleet storm" : "https://i.ytimg.com/vi/KsI1OBDURlo/maxresdefault.jpg","mist" : "http://cdn.wallpapersafari.com/15/45/UbrRaM.jpg","sprinkle" : "https://wallpaperscraft.com/image/rain_tree_streams_bad_weather_precipitation_green_despondency_inclination_62354_1920x1080.jpg",
  "light wind" : "http://wallup.net/wp-content/uploads/2016/01/196605-dog-animals-nature-landscape-windy-Border_Collie.jpg",
  "cloudy gusts" : "https://localtvwtkr.files.wordpress.com/2015/08/cape-charles-cloudy-twilight-pete-federico.jpg?quality=85&strip=all&w=2000",
  "haze" : "https://lh3.googleusercontent.com/kbuJaNM27ig-w9C0fNyW_0f1okn0gKOWRmGfDN3b-KLMb7_sVEK5fs4GgmthLPYmFdY=h900",
  "rain wind" : "http://wallup.net/wp-content/uploads/2016/01/119748-rooftops-ladders-artwork-wind-rain-storm-humor.jpg",
  "strom showers" : "http://cdn.wallpapersafari.com/59/73/KvjGfz.jpg",
  "cloudy Windy" : "http://www.walldevil.com/wallpapers/a80/cloud-sky-wind-grass-field-tree.jpg",
  "lightning" : "http://cdn.wallpapersafari.com/73/10/liHgW0.jpg",
  "snow thunderstorm" : "http://wallpapercave.com/wp/ClcBAyz.jpg","sunny overcast" : "http://wallpaper-gallery.net/images/sunny-pictures/sunny-pictures-18.jpg",
  "hot" : "http://marketingland.com/wp-content/ml-loads/2014/12/weather-temperature-thermometer-hot-heat-ss-1920.jpg","partly cloudy" : "http://ilovelyhdwallpaper.com/wp-content/uploads/2016/02/Cloudy-Weather-Beach-3D-Beach-View-4K-Wallpaper.jpg",
  "default" : "http://www.planwallpaper.com/static/images/nature-wallpapers-hd.jpg"
};

var address = [];
var place = "";
var country = "";
var temperatureFar = 0.0;
var temperatureCel = 0.0;
var weather ="";
var icon = "";
var url = "";
var background = "";
var current = "Celsius";

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + encodeURIComponent(position.coords.latitude) + "," + encodeURIComponent(position.coords.longitude);
      $.getJSON(url, function(json) {
        address = json.results[0].address_components;
        for(var i = 0; i < address.length; i ++) {
          if(address[i].types.indexOf("locality") != -1) {
            place = address[i].long_name;
            break;
          }
        }
        url = "https://api.apixu.com/v1/current.json?key=d8a0321b997148b2884165917171601&q=" + encodeURIComponent(place);
        $.getJSON(url, function(json) {
          place = json.location.name;
          country = json.location.country;
          temperatureFar = json.current.temp_f;
          temperatureCel = json.current.temp_c;
          weather = json.current.condition.text;
          icon = "http:" + json.current.condition.icon;
          if(backgrounds.hasOwnProperty(weather.toLowerCase())) {
            background = backgrounds[weather.toLowerCase()];
          }
          else {
            background = "default";
          }
          $("body").css("background-image", "url('" + background + "')");
          $("#place").html(place + ", " + country);
          $("#weather-icon").attr("src", icon);
          $("#weather-text").html(weather);
          $("#temperature").html(temperatureCel.toString() + " &#8451;");
          $("#degree").html(current);
          $("#degree").addClass("animated bounce");
        });
      });
    });
  }
  
  $("#degree").on("click", function() {
    if(current == "Celsius") {
      current = "Fahrenheit";
      $("#temperature").html(temperatureFar.toString() + " &#8457;");
      $("#degree").html(current);
    }
    else {
      current = "Celsius";
      $("#temperature").html(temperatureCel.toString() + " &#8451;");
      $("#degree").html(current);
    }
  });
});