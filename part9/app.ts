import express from 'express'
import calculateBMI from './bmiCalculator'
const app = express()

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.get('/bmi', (req, res) => {
  res.json({
    height: req.query.height,
    weight: req.query.weight,
    bmi: calculateBMI(Number(req.query.height), Number(req.query.weight)),
  })
})

const PORT = 3001

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
