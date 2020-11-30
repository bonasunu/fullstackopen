import express from 'express'
const app = express()

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

const PORT = 3001

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
