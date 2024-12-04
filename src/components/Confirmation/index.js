import { Confirmation } from './render'

export class HandleConfirm {
    constructor() {
        this.modal = new Confirmation()
        this.addEventListeners()
    }

    addEventListeners() {
        this.modal
            .getCancelButton()
            .addEventListener('click', () => this.modal.hide())
        this.modal
            .getDeleteButton()
            .addEventListener('click', () => this.handleModalDelete())
    }

    showDeleteConfirmation(title, deleteCallback) {
        this.modal.setTitle(title)
        this.modal.show()
        this.deleteCallback = deleteCallback
    }

    async handleModalDelete() {
        if (this.deleteCallback) {
            await this.deleteCallback()
            this.modal.hide()
        }
    }
}
