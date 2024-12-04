import { Loader } from '@components/Loader'
import { HandleConfirm } from '@components/Confirmation'
import { ToDoList } from './render'
export class HandleToDoList {
    constructor(todoListElement, apiService) {
        this.todoListElement = todoListElement
        this.apiService = apiService
        this.currentFilter = () => true
        this.loader = new Loader()
        this.modalHandler = new HandleConfirm()
        this.renderer = new ToDoList(
            this.todoListElement,
            this.openConfirmModal.bind(this)
        )
    }

    async refresh() {
        this.loader.show()
        const todos = await this.apiService.read()
        this.renderer.display(
            todos.filter(this.currentFilter),
            this.saveEdit.bind(this),
            this.edit.bind(this)
        )
        this.loader.hide()
    }

    async addTask(newTask) {
        const item = {
            title: newTask,
            completed: false,
            date: new Date().toISOString(),
        }
        await this.apiService.create(item)
        await this.refresh()
    }

    async setFilter(filterCallback) {
        this.currentFilter = filterCallback
        await this.refresh()
    }

    async saveEdit(id, title) {
        const date = new Date().toISOString()
        await this.edit(id, { title, date })
    }

    async edit(id, update) {
        await this.apiService.update(id, update)
        await this.refresh()
    }

    async deleteTask(id) {
        await this.apiService.delete(id)
        await this.refresh()
    }

    openConfirmModal(title, id) {
        this.modalHandler.showDeleteConfirmation(
            title,
            this.deleteTask.bind(this, id)
        )
    }
}
