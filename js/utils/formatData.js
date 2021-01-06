function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

function fahrenheitToCelsius(temperature) {
  return (temperature - 32) / 1.8;
}

function getCurrentDate() {
  const date = new Date();
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export { celsiusToFahrenheit, fahrenheitToCelsius, getCurrentDate };
