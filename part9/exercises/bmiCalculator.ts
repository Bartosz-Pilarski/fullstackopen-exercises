interface BodyStats {
  height: number,
  weight: number
}

type BMIClass = 'underweight' | 'normal' | 'overweight';

const parseArguments = (args: string[]): BodyStats => {
  if(args.length < 4) throw new Error('Too little arguments');
  if(args.length > 4) throw new Error('Too many arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if(isNaN(height) || isNaN(weight)) throw new Error('Provided values are not numbers');

  return {
    height,
    weight
  }
}

const calculateBmi = (height: number, weight: number): BMIClass => {
  const heightToMeters = height/100
  const ratio: number = weight/(heightToMeters*heightToMeters);
  if(ratio < 18.5) return 'underweight';
  if(ratio < 25) return 'normal';
  return 'overweight';
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errMsg = 'Mayday: ';
  if(error instanceof Error) errMsg += error.message;
  console.log(errMsg);
}