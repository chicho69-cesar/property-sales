/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable wrap-iife */

(function () {
  const lat = 21.8973177
  const lng = -102.304627
  const mapa = L.map('home-map').setView([lat, lng], 15)

  const markers = new L.FeatureGroup().addTo(mapa)
  let properties = []

  const filters = {
    category: '',
    price: '',
  }

  const categoriesSelect = document.querySelector('#categories')
  const pricesSelect = document.querySelector('#prices')

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa)

  const showProperties = (propertiesArg) => {
    // Clean prev markers
    markers.clearLayers()

    propertiesArg.forEach((property) => {
      // Add the pins
      const marker = new L.marker([property?.lat, property?.lng], {
        autoPan: true,
      })
        .addTo(mapa)
        .bindPopup(`
          <p class="text-indigo-600 font-bold">${property?.category?.name}</p>
          <h1 class="text-xl font-extrabold uppercase my-2">${property?.title}</h1>
          <img src="/uploads/${property?.image}" alt="Propiedad: ${property?.title}" />
          <p class="text-gray-600 font-bold">${property?.price?.name}</p>
          <a href="/property/${property?.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase text-white">Ver propiedad</a>
        `)

      markers.addLayer(marker)
    })
  }

  const filterProperties = () => {
    const resultFilters = properties
      .filter((property) => (
        filters.category
          ? property.categoryId === filters.category
          : property
      ))
      .filter((property) => (
        filters.price
          ? property.priceId === filters.price
          : property
      ))

    showProperties(resultFilters)
  }

  const getProperties = async () => {
    try {
      const url = '/api/properties'
      const response = await fetch(url)
      properties = await response.json()

      showProperties(properties)
    } catch (error) {
      console.log({ error })
    }
  }

  categoriesSelect.addEventListener('change', (e) => {
    filters.category = +e.target.value
    filterProperties()
  })

  pricesSelect.addEventListener('change', (e) => {
    filters.price = +e.target.value
    filterProperties()
  })

  getProperties()
})()
