console.log('Hello world');
const database = [
    // {value: 'example first task in todo'}
];

const input = document.querySelector('.header-input');
const button = document.querySelector('.header-btn');

button.addEventListener('click', () => {
    if (input.value.length > 1) {

        let obj = {};
        obj.value = input.value
        database.push(obj);

        displayCurrentTask(database)
        input.value = '';
    }
    console.log(database);
});

function displayCurrentTask(data) {
    const content = document.querySelector('.content__value');
    const element = document.createElement('div');
    
    element.classList.add('current__task');
    element.innerHTML += `
        <h4 class='title'>${data[data.length - 1].value}</h4>
        <button class='task__edit'>Edit</button>
        <button class='task__delete'>Delete</button>
    `;
    content.append(element);

    const removeButtons = document.querySelectorAll('.current__task');
    removeButtons.forEach(elem => {
        elem.querySelector('.task__delete').addEventListener('click', (e) => {
            e.target.parentNode.remove();

            const currentText = e.target.parentNode.querySelector('.title').textContent;
            
            for (let i = 0; i < data.length; i++) {
                if (currentText === data[i].value) {
                    data.splice(i, 1)
                    console.log(data);
                }
            }
        });
    });

    const editButtons = document.querySelectorAll('.task__edit');
    editButtons.forEach(elem => {
        elem.addEventListener('click', (e) => {
            const edit = document.createElement('div');
            const input = document.createElement('input');
            const button = document.createElement('button');
            edit.classList.add('edit__container');
            input.classList.add('edit__current-input');
            button.classList.add('edit__current-button');
            button.textContent = '+';
            edit.append(input, button)

            e.target.parentNode.append(edit);

            button.addEventListener('click', () => {
                const currentText = e.target.parentNode.querySelector('.title');
                
                for (let i = 0; i < data.length; i++) {
                    // console.log(`${currentText.textContent} === ${data[i].value}`);
                    if (currentText.textContent === data[i].value) {
                        data[i].value = input.value
                    }
                }

                currentText.innerHTML = input.value;
                edit.remove();
            })
        })
    })
};


