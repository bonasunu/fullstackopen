import express from 'express'
import calculateBMI from './bmiCalculator'
const app: any = express()

app.get('/', (_req: any, res: any) => {
  res.send('Hello World!')
})

app.get('/bmi', (req: any, res: any) => {
  if (!req.query.height || !req.query.weight) {
    res.json({ error: 'malformatted parameters' })
  } else {
    res.json({
      height: req.query.height,
      weight: req.query.weight,
      bmi: calculateBMI(Number(req.query.height), Number(req.query.weight)),
    })
  }
})

app.post('/exercises', (req: any, res: any) => {
  const targetHours = req.body.targets

  res.json({ status: 'ok', target: targetHours })
})

const PORT = 3001

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
