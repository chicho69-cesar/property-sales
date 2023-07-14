/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable wrap-iife */

(function () {
  const lat = 21.8973177
  const lng = -102.304627
  const mapa = L.map('home-map').setView([lat, lng], 15)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa)
})()
