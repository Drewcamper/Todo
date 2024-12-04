export const buttonConfigs = [
    { text: 'All', isActive: true, filter: () => true },
    { text: 'Completed', isActive: false, filter: (todo) => todo.completed },
    { text: 'Active', isActive: false, filter: (todo) => !todo.completed },
]
