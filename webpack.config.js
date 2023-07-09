/* eslint-disable linebreak-style */
import path from 'node:path'

export default {
  mode: 'development',
  entry: {
    map: './src/js/map.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('public/js'),
  },
}
