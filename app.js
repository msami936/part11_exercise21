const express = require('express')
const fs = require('fs').promises
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5001
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'db.json')

app.use(express.json())

app.get('/health', (req, res) => {
  res.send('ok')
})

const readDb = async () => {
  const data = await fs.readFile(DB_PATH, 'utf-8')
  return JSON.parse(data)
}

const writeDb = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
}

app.get('/api/anecdotes', async (req, res) => {
  const db = await readDb()
  res.json(db.anecdotes)
})

app.post('/api/anecdotes', async (req, res) => {
  const db = await readDb()
  const newAnecdote = {
    ...req.body,
    id: String(Math.floor(Math.random() * 100000)),
  }
  db.anecdotes.push(newAnecdote)
  await writeDb(db)
  res.status(201).json(newAnecdote)
})

app.put('/api/anecdotes/:id', async (req, res) => {
  const db = await readDb()
  const index = db.anecdotes.findIndex((anecdote) => anecdote.id === req.params.id)
  if (index === -1) {
    return res.status(404).end()
  }
  db.anecdotes[index] = req.body
  await writeDb(db)
  res.json(db.anecdotes[index])
})

app.delete('/api/anecdotes/:id', async (req, res) => {
  const db = await readDb()
  const index = db.anecdotes.findIndex((anecdote) => anecdote.id === req.params.id)
  if (index === -1) {
    return res.status(404).end()
  }
  db.anecdotes.splice(index, 1)
  await writeDb(db)
  res.status(204).end()
})

app.use(express.static('dist'))

app.listen(PORT, '0.0.0.0', () => {
  console.log(`server started on port ${PORT}`)
})
