const axios = require("axios");

async function geocodeLocation(place) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;

  const response = await axios.get(url, {
    headers: {
      "User-Agent": "wanderlust-app"
    }
  });

  if (!response.data.length) {
    throw new Error("Invalid location");
  }

  return {
    lat: parseFloat(response.data[0].lat),
    lng: parseFloat(response.data[0].lon)
  };
}

module.exports = geocodeLocation;
