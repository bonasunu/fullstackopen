interface inputExercise {
  inputDays: Array<number>
  inputTargetHours: number
}

const parseArgsExercise = (args: Array<string>): inputExercise => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 5) throw new Error('Too many arguments')

  if (!isNaN(Number(args[3])) && Array.isArray(args[2])) {
    return {
      inputDays: args[2],
      inputTargetHours: Number(args[3]),
    }
  } else throw new Error('Please provide array and number!')
}

interface exerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercise = (
  days: Array<number>,
  targetHours: number
): exerciseResult => {
  const average: number = days.reduce((a, b) => a + b) / days.length

  const result = {
    periodLength: days.length,
    trainingDays: days.filter((i) => i !== 0).length,
    success: average >= targetHours ? true : false,
    rating: 1,
    ratingDescription: '',
    target: targetHours,
    average: average,
  }

  switch (true) {
    case average / targetHours >= 1:
      result.rating = 3
      result.ratingDescription = 'You did a great job!'
    case average / targetHours < 0.5:
      result.rating = 1
      result.ratingDescription = 'Too bad> Do better!'
    case average / targetHours >= 0.5:
      result.rating = 2
      result.ratingDescription = 'You are doing good! Keep going!'
  }

  console.log(typeof (average / targetHours))
  console.log(average / targetHours)
  return result
}

// console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2))
try {
  const { inputDays, inputTargetHours } = parseArgsExercise(process.argv)
  console.log(calculateExercise(inputDays, inputTargetHours))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message)
}
