/* eslint-disable no-undef */
// eslint-disable-next-line func-names
(function () {
  const lat = document.querySelector('#lat').value || 21.8973177
  const lng = document.querySelector('#lng').value || -102.304627
  const mapa = L.map('mapa').setView([lat, lng], 15)

  let marker

  // Use the Provider and Geocoder
  const geocodeService = L.esri.Geocoding.geocodeService()

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa)

  // The Pin
  marker = L.marker([lat, lng], {
    draggable: true,
    autoPan: true,
  }).addTo(mapa)

  // Detect the move of the Pin
  marker.on('dragend', (e) => {
    marker = e.target

    const position = marker.getLatLng()
    mapa.panTo(new L.LatLng(position.lat, position.lng))

    // Get the address of the Pin
    geocodeService.reverse().latlng(position, 15).run((error, result) => {
      if (error) {
        return
      }

      marker.bindPopup(result.address.Match_addr).openPopup()

      // Fill the fields
      document.querySelector('.address').textContent = result?.address?.Address ?? ''
      document.querySelector('.complete-address').textContent = result?.address?.Match_addr ?? ''

      document.querySelector('#street').value = result?.address?.Address ?? ''
      document.querySelector('#lat').value = result?.latlng?.lat ?? ''
      document.querySelector('#lng').value = result?.latlng?.lng ?? ''
    })
  })
}())
