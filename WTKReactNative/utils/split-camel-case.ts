import { capitalizeFirstLetter } from './text-formatting'

export const splitAndJoinCamelCase = (name: string): string => {
  const splitName = name.split(/(?=[A-Z])/)
  return splitName.join(' ')
}

export const splitAndJoinAndCapitalizeFirstLetter = (name: string): string => {
  return splitAndJoinCamelCase(capitalizeFirstLetter(name))
}
