const { copyFileSync } = require('fs')

copyFileSync('db.seed.json', 'db.e2e.json')
process.env.DB_PATH = 'db.e2e.json'

require('../app.js')
