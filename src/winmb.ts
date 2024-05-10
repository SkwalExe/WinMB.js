// Shorthand for document.querySelectorAll<HTMLElement>("selector")
const $$ = (selector: string) => document.querySelectorAll<HTMLElement>(selector)
// The name of the css file to import from the assets path
const cssFileName = 'winmb.css'
// The name of the class that will be used to identify our message boxes within the DOM
// Must be the same as in winmb.css
const cssClass = 'winmb'

interface Button {
    text: string
    value: string | number | boolean
}

export class WinMB {
    // An url for the assets MUST be specified.
    // We also load the required css into the page
    constructor(assetsUrl: string) {
        this.assetsUrl = assetsUrl
        // Must end with / since assets name are just added at the end of the base url
        if (!this.assetsUrl.endsWith('/')) this.assetsUrl += '/'

        // Load the css into the page if not already done
        const cssId = 'winmb-css'
        if (!document.getElementById(cssId)) {
            const head = document.getElementsByTagName('head')[0]!
            const link = document.createElement('link')
            link.id = cssId
            link.rel = 'stylesheet'
            link.type = 'text/css'
            link.href = this.getAssetUrl(cssFileName)
            link.media = 'all'
            head.appendChild(link)
        }
    }

    // Base url for assets
    private assetsUrl: string

    // Return the complete url of an asset given its filename.
    private getAssetUrl = (filename: string): string => this.assetsUrl + filename

    // Returns an array of every dialogue box
    private get boxList(): HTMLElement[] {
        return Array.from($$(`.${cssClass}`))
    }

    // Remove all the dialogue boxes
    public removeAll = (): void => {
        this.boxList.forEach((messageBox) => {
            messageBox.parentElement!.removeChild(messageBox)
        })
    }

    public show = async (
        title: string,
        message: string,
        type: string = 'error',
        buttons: Button[] = [{text: 'ok', value: true}],
        position: string | Array<number> = 'default'
    ): Promise<boolean | string | number> => {
        if (typeof position === 'string' && !['random', 'default'].includes(position))
            throw new Error('Position must be either "random", "default", or an array of two numbers [x, y].')
        if (!['info', 'error', 'warning'].includes(type))
            throw new Error('Invalid message type : please use "info", "error" or "warning"')
        if (!Array.isArray(buttons)) throw new Error('Invalid buttons : please use an array of [label, returnValue]')
        if (!(buttons.length > 0)) throw new Error('Invalid button list : please specify at least one button')

        return new Promise((resolve) => {
            let startMouseX = 0
            let startMouseY = 0
            let startMessagePosY = 0
            let startMessagePosX = 0

            const GetRandomInt = (min: number, max: number) => {
                min = Math.ceil(min)
                max = Math.floor(max)
                const RandomInt = Math.floor(Math.random() * (max - min + 1)) + min
                return RandomInt
            }

            const playSound = (path: string) => {
                new AudioContext()

                const audio = new Audio(path)
                audio.play()

                return audio
            }

            // Put messageBox on top of other boxes using zIndex
            const setZIndex = () => {
                this.boxList.forEach((element) => {
                    if (parseInt(element.style.zIndex) > parseInt(messageBox.style.zIndex) - 1)
                        messageBox.style.zIndex = (parseInt(element.style.zIndex) + 1).toString()
                })
            }

            playSound(this.getAssetUrl(type + '-sound.wav'))

            const messageBox = document.createElement('div')
            messageBox.classList.add(cssClass)

            messageBox.style.zIndex = (this.boxList.length + 1).toString()

            if (position === 'random')
                position = [GetRandomInt(0, window.innerWidth), GetRandomInt(0, window.innerHeight)]
            else if (position === 'default')
                messageBox.style.left = messageBox.style.top = 100 + (this.boxList.length + 1) * 15 + 'px'

            messageBox.style.left = position[0] + 'px'
            messageBox.style.top = position[1] + 'px'

            messageBox.innerHTML =
                '<div class="titleBar">' +
                `<span class="title">${title}</span>` +
                `<img class="closeButton" src="${this.getAssetUrl('close-button.png')}" alt="close button">` +
                '</div>' +
                '<div class="content">' +
                `<img src="${this.getAssetUrl(type + '.png')}" alt="icon">` +
                `<span class="message">${message}</span>` +
                '</div>' +
                '<div class="buttons">' +
                '</div>'

            setZIndex()

            const closeButton = messageBox.querySelector('.closeButton')
            closeButton!.addEventListener('mousedown', () => {
                messageBox.parentNode!.removeChild(messageBox)
                resolve(false)
            })

            messageBox.onmousedown = setZIndex

            const buttonsContainer = messageBox.querySelector('.buttons')

            buttons.forEach((button) => {
                const buttonElement = document.createElement('button')
                buttonElement.classList.add('button')

                buttonElement.innerText = <string>button.text
                buttonsContainer!.appendChild(buttonElement)

                buttonElement.onclick = function () {
                    messageBox.parentNode!.removeChild(messageBox)

                    if (typeof button.value !== 'undefined') resolve(button.value)
                    resolve(button.text)
                }
            })

            const titleBar = messageBox.querySelector<HTMLElement>('.titleBar')!

            titleBar.onmousedown = (event) => {
                titleBar.classList.add('clicked')

                startMouseX = event.clientX
                startMouseY = event.clientY
                setZIndex()

                startMessagePosX = parseInt(messageBox.style.left.substring(0, messageBox.style.left.length - 2))
                startMessagePosY = parseInt(messageBox.style.top.substring(0, messageBox.style.top.length - 2))
            }

            titleBar.onmouseup = function () {
                titleBar.classList.remove('clicked')
            }

            document.addEventListener('mousemove', (event) => {
                if (titleBar.classList.contains('clicked')) {
                    const left: number = startMessagePosX - (startMouseX - event.clientX)
                    messageBox.style.left = left.toString() + 'px'
                    messageBox.style.top = startMessagePosY - (startMouseY - event.clientY) + 'px'
                }
            })

            messageBox.setAttribute('tabindex', '0')
            messageBox.style.outline = 'none'
            messageBox.onkeydown = (event) => {
                if (event.key === 'Enter') {
                    messageBox.parentNode!.removeChild(messageBox)
                    resolve(false)
                    // Focus previous messagebox if any
                    if (this.boxList.length > 0) {
                        const el = this.boxList.at(-1)!
                        el.focus()
                    }
                }
            }
            document.body.appendChild(messageBox)
            messageBox.focus()
        })
    }
}
