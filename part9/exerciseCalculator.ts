interface inputExercise {
  inputDays: Array<number>
  inputTargetHours: number
}

const parseArgsExercise = (args: Array<string>): inputExercise => {
  if (args.length < 4) throw new Error('Not enough arguments')

  const arr: Array<number> = []

  for (let i = 2; i < args.length - 1; i++) {
    if (!isNaN(Number(args[i]))) arr.push(Number(args[i]))
    else throw new Error('Please use number for input!')
  }

  if (!isNaN(Number(args[args.length - 1]))) {
    return {
      inputDays: arr,
      inputTargetHours: Number(args[args.length - 1]),
    }
  } else throw new Error('Please provide number for target hours!')
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

  const averageHours: number = average / targetHours

  if (averageHours >= 1) {
    result.rating = 3
    result.ratingDescription = 'You did a great job!'
  } else if (averageHours < 0.5) {
    result.rating = 1
    result.ratingDescription = 'Too bad> Do better!'
  } else if (averageHours >= 0.5) {
    result.rating = 2
    result.ratingDescription = 'You are doing good! Keep going!'
  }

  // switch (averageHours) {
  //   case average / targetHours >= 1:
  //     result.rating = 3
  //     result.ratingDescription = 'You did a great job!'
  //   case average / targetHours < 0.5:
  //     result.rating = 1
  //     result.ratingDescription = 'Too bad> Do better!'
  //   case average / targetHours >= 0.5:
  //     result.rating = 2
  //     result.ratingDescription = 'You are doing good! Keep going!'
  // }

  console.log(typeof (average / targetHours))
  console.log(average / targetHours)
  return result
}

try {
  const { inputDays, inputTargetHours } = parseArgsExercise(process.argv)
  console.log(calculateExercise(inputDays, inputTargetHours))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message)
}
