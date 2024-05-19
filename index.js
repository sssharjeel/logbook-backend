const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.static('dist'))

const log = [
    {
      name: "bench press",
      entries: []
    }, 
    {
      name: "chest supported t-bar row",  
      entries: []
    },
    {
      name: "overhead press",
      entries: []
    }
  ]

app.use(express.json())

app.get('/log', (request, response) => {
  response.json(log)
})


app.get('/log/:name', (request, response) => {
    const name = request.params.name
    const exercise = log.find(exercise => exercise.name === name)

    if (exercise) {
        response.json(exercise.entries)
      } else {
        response.status(404).end()
      }

  })

app.delete('/log/:name', (request, response) => {
    const name = request.params.name
    log = log.filter(exercise => exercise.name !== name)
  
    response.status(204).end()
  })

  
app.post('/log/:name', (request, response) => {
    const name = request.params.name
    const exercise = log.find(exercise => exercise.name === name)
    const body = request.body
  
    exercise.entries.concat(body)
    response.json(log)

  })


  const PORT = 3002
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })