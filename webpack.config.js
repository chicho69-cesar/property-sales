/* eslint-disable linebreak-style */
import path from 'node:path'

export default {
  mode: 'development',
  entry: {
    map: './src/js/map.js',
    addImage: './src/js/add-image.js',
    showMap: './src/js/show-map.js',
    homeMap: './src/js/home-map.js',
    changeState: './src/js/change-state.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('public/js'),
  },
}
