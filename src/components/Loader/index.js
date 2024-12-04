import '@styles/loader.css';

export class Loader {
    constructor() {
        this.loaderElement = document.createElement('div');
        this.loaderElement.className = 'overlay loader';
        this.loaderElement.innerText = 'Loading...';

        document.body.appendChild(this.loaderElement);
    }

    show() {
        this.loaderElement.style.display = 'flex';
    }

    hide() {
        this.loaderElement.style.display = 'none';
    }
}
