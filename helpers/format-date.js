const formatDate = (date) => {
  const shortDate = new Date(date).toISOString().slice(0, 10)

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return new Date(shortDate).toLocaleDateString('es-MX', options)
}

export default formatDate
