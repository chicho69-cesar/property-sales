/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable wrap-iife */
(function () {
  const lat = document.querySelector('#lat').textContent
  const lng = document.querySelector('#lng').textContent
  const street = document.querySelector('#street').textContent
  const title = document.querySelector('#title').textContent

  const map = L.map('map').setView([lat, lng], 16)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  // Add the Pin
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`${street}<br/>${title}`)
})()
