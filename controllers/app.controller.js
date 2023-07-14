import { request, response } from 'express'

export const home = async (req = request, res = response) => {
  res.render('home', {
    page: 'Home',
  })
}

export const categories = async (req = request, res = response) => {
  res.json({
    msg: 'Categories',
  })
}

export const notFound = (req = request, res = response) => {
  res.render('404')
}

export const searcher = async (req = request, res = response) => {
  res.json({
    msg: 'Searcher',
  })
}
