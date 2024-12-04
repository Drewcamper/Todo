import { StatusButton } from './render'

export class StatusButtonService {
    constructor(container, list, config) {
        this.list = list
        this.buttons = []
        this.init(container, config)
    }

    init(container, buttonConfigs) {
        buttonConfigs.forEach((config) => {
            const button = new StatusButton(container, config)
            this.setupButton(button.element, config.isActive, config.filter)
            this.buttons.push(button.element)
        })
    }

    setupButton(button, isActive, filterCallback) {
        this.setAriaPressed(button, isActive)
        button.addEventListener('click', () => {
            this.handleButtonClick(this.buttons, button, filterCallback)
        })
    }

    setAriaPressed(button, isPressed) {
        button.setAttribute('aria-pressed', isPressed.toString())
    }

    handleButtonClick(buttons, clickedButton, filterCallback) {
        buttons.forEach((button) => {
            this.setAriaPressed(button, false)
        })
        this.setAriaPressed(clickedButton, true)

        this.list.setFilter(filterCallback)
    }
}
