export const GetRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const RandomInt = Math.floor(Math.random() * (max - min + 1)) + min
    return RandomInt
}

//Shorthand for document.querySelectorAll<HTMLElement>("selector")
export const $$ = (selector: string) => document.querySelectorAll<HTMLElement>(selector)

export const playSound = (path: string) => {
    new AudioContext()
    const audio = new Audio(path)
    audio.play()
}
