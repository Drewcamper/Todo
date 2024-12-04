export class StatusButton {
    constructor(container, config) {
        this.element = this.createButton(config.text)
        container.appendChild(this.element)
    }

    createButton(text) {
        const button = document.createElement('button')
        button.type = 'button'
        button.className = 'button status'
        button.textContent = text
        return button
    }
}
