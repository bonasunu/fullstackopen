interface bodyData {
  heightInput: number
  weightInput: number
}

const parseArgs = (args: Array<string>): bodyData => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightInput: Number(args[2]),
      weightInput: Number(args[3]),
    }
  } else throw new Error('Provided value were not numbers!')
}

type Result = string

const calculateBMI = (height: number, weight: number): Result => {
  const BMI: number = weight / (height * height)

  switch (true) {
    case BMI < 15:
      return 'Very severly underweight'
    case BMI >= 15 && BMI < 16:
      return 'Severly underweight'
    case BMI >= 15 && BMI < 18.5:
      return 'Underweight'
    case BMI >= 18.5 && BMI < 25:
      return 'Normal (healthy weight)'
    case BMI >= 25 && BMI < 30:
      return 'Overweight'
    case BMI >= 30 && BMI < 35:
      return 'Obese Class I (Moderately Obese)'
    case BMI >= 35 && BMI < 40:
      return 'Obese Class II (Severly Obese)'
    case BMI >= 40:
      return 'Obese Class II (Very Severly Obese)'
    default:
      return 'Default'
  }
}

try {
  const { heightInput, weightInput } = parseArgs(process.argv)
  console.log(calculateBMI(heightInput, weightInput))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message)
}
