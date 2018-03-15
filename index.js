require('dotenv').load()
const request = require('request-promise-native')

const { arenas, cards, players, chests, leagues } = require('./data')
const user = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin',
}
const uri = process.env.URI || 'http://localhost:8085/'

const authOptions = {
  method: 'POST',
  url: uri + 'api/authenticate',
  form: user,
  headers: {
    Accept: 'application/json',
  },
  json: true,
}

const exec = async () => {
  const token = await request.post(authOptions)
  await save(token, 'api/cards', cards)
  await save(token, 'api/chests', chests)
  await save(token, 'api/players', players)
  await save(token, 'api/leagues', leagues)
  await save(token, 'api/arenas', arenas)
}

exec()

const save = async (token, endpoint, objects) => {
  const promises = [];
  objects.forEach(async o => {
    const requestOptions = {
      url: uri + endpoint,
      headers: {
        Authorization: token,
        Accept: 'application/json',
      },
      form: o,
    }
    promises.push(request.post(requestOptions))
  })
  return Promise.all(promises)
}
