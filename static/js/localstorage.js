export default class LocalStorage {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    create(data) {
        data.token = this.token;

        this.tasks.push(data);

        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    update(data) {
        let index = this.getIndexByToken(data.token);

        if (index !== -1) {
            this.tasks[index] = data;

            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }

    delete(data) {
        let index = this.getIndexByToken(data.token);

        console.log(data.token);
        console.log(this.tasks);

        if (index !== -1) {
            this.tasks.splice(index, 1);

            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }

    getIndexByToken(token) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].token === token) {
                return i;
            }
        }

        return -1;
    }

    get token() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
};
