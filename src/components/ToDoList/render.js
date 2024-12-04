import { ToDoItemService } from '@components/ToDoItem'

export class ToDoList {
    constructor(todoListElement, openConfirmModal) {
        this.todoListElement = todoListElement
        this.openConfirmModal = openConfirmModal
    }

    display(todos, saveEditCallback, editCallback) {
        this.todoListElement.innerHTML = ''

        todos.forEach((todo) => {
            const todoItem = new ToDoItemService(
                todo,
                () => this.openConfirmModal(todo.title, todo.id),
                saveEditCallback,
                editCallback
            )
            const todoElement = todoItem.getElement()
            this.todoListElement.appendChild(todoElement)
        })
    }
}
