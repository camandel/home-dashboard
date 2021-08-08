// TODO scripts

import LocalStorage from './localstorage.js';

const storage = new LocalStorage();

const tasks = storage.tasks;

const container = document.querySelector('.tasks');
const template = document.querySelector('#task');

const createTaskForm = document.querySelector('.create-task');
const createTaskField = document.querySelector('.create-task__textarea');

tasks.forEach((data) => {
    onCreateTask({ data });
});

createTaskField.addEventListener('keydown', (e) => {
    if (e.keyCode != 13) return;
    e.preventDefault();
    saveTask();
    return false;
});

createTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveTask();
});

function saveTask() {
    var value = createTaskField.value;
    value = value.replace(/\n*$/, '');

    if (value) {
        const data = {
            value,
            checked: false
        };

        storage.create(data);

        onCreateTask({ data });

        createTaskForm.reset();
    }
}

function onCreateTask({ data }) {
    const clone = template.content.cloneNode(true);

    const task = clone.querySelector('.task');
    const checkbox = clone.querySelector('.task__checkbox');
    const title = clone.querySelector('.task__text');
    const del = clone.querySelector('.task__delete');

    title.innerHTML = data.value;
    checkbox.checked = data.checked;

    toggleTaskStatusClass({ checked: data.checked, task });

    checkbox.addEventListener('input', () => {
        data.checked = checkbox.checked;

        toggleTaskStatusClass({ checked: data.checked, task });

        storage.update(data);
    });

    title.addEventListener('input', () => {
        data.value = title.innerHTML;

        storage.update(data);
    });

    del.addEventListener('click', (e) => {
        storage.delete(data);

        task.remove();
    });

    container.appendChild(clone);
}

function toggleTaskStatusClass({ checked, task }) {
    task.classList[checked ? 'add' : 'remove']('task--done');
}