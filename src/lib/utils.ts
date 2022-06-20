import { randAccessory } from "@ngneat/falso"

export function getRandomInt(min: number, max: number) {
   min = Math.ceil(min)
   max = Math.floor(max)
   return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

export function getRandomColor(lMin = 40, lMax = 50) {
   const h = getRandomInt(0, 255)
   const s = 20
   const l = getRandomInt(lMin, lMax)
   const a = 1
   return `hsla(${h}, ${s}%, ${l}%, ${a})`
}

export function getRandomAccessory(array: string[]) {
   let accessory: string
   do accessory = randAccessory()
   while (array.includes(accessory))
   return accessory
}

export function getPrecision(n: number) {
   return (Math.log(n) / Math.LN10) > 1 ? n.toFixed(0) : n.toFixed(1)
}