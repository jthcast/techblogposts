export function useRandom() {
  const getRandomNumber = ({ min, max }: { min: number; max: number }) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return { getRandomNumber }
}
