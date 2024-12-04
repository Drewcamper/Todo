import './style.css'

import { ApiService } from '@api'
import {
    ToDoFormService,
    StatusButtonService,
    HandleToDoList,
    buttonConfigs,
} from '@components'

class App {
    constructor(apiUrl, todoListElementId) {
        this.apiUrl = apiUrl
        this.todoListElementId = todoListElementId
        this.apiService = new ApiService(this.apiUrl)
        this.init()
    }

    async init() {
        const todoListElement = document.getElementById(this.todoListElementId)
        this.list = new HandleToDoList(todoListElement, this.apiService)

        const welcomeContent = document.querySelector('.welcome-content')
        new ToDoFormService(welcomeContent, this.list.addTask.bind(this.list))

        const statusContainer = document.querySelector(
            '.status-buttons-container'
        )
        new StatusButtonService(statusContainer, this.list, buttonConfigs)

        await this.list.refresh()
    }
}

const apiUrl = import.meta.env.VITE_API_URL
const todoListElementId = import.meta.env.VITE_TODO_LIST_ELEMENT_ID
new App(apiUrl, todoListElementId)


