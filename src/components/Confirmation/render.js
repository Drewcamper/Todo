import '@styles/cancel.css'

export class Confirmation {
    constructor() {
        this.createModal()
    }

    createModal() {
        this.popupContainer = document.createElement('div')
        this.popupContainer.className = 'overlay popup-container hidden'

        this.popup = document.createElement('div')
        this.popup.className = 'popup'

        this.popupText = document.createElement('p')
        this.popup.appendChild(this.popupText)

        const buttonContainer = document.createElement('div')
        buttonContainer.className = 'button-container'

        this.cancelBtn = document.createElement('button')
        this.cancelBtn.className = 'confirm-btn cancel-btn'
        this.cancelBtn.textContent = 'Cancel'
        buttonContainer.appendChild(this.cancelBtn)

        this.deleteBtn = document.createElement('button')
        this.deleteBtn.className = 'confirm-btn delete-btn'
        this.deleteBtn.textContent = 'Delete'
        buttonContainer.appendChild(this.deleteBtn)

        this.popup.appendChild(buttonContainer)
        this.popupContainer.appendChild(this.popup)
        document.body.appendChild(this.popupContainer)
    }

    setTitle(title) {
        this.popupText.textContent = `Are you sure you want to delete "${title}"?`
    }

    show() {
        this.popupContainer.classList.remove('hidden')
    }

    hide() {
        this.popupContainer.classList.add('hidden')
    }

    getCancelButton() {
        return this.cancelBtn
    }

    getDeleteButton() {
        return this.deleteBtn
    }
}
