const addInput = document.getElementById('add-input');
const addBtn = document.getElementById('add-btn');
const itemsList = document.getElementById('items-list');
const leftToBuyList = document.getElementById('left-to-buy-list');
const boughtList = document.getElementById('bought-list');

let items = [
    { name: 'Помідори', amount: 2, isBought: false },
    { name: 'Печиво', amount: 2, isBought: false },
    { name: 'Сир', amount: 1, isBought: false }
];

function render() {
    itemsList.innerHTML = '';
    leftToBuyList.innerHTML = '';
    boughtList.innerHTML = '';

    for (let i = 0; i < items.length; i++) {
        const item = items[i];  
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        const nameDiv = document.createElement('div');
        nameDiv.appendChild(document.createTextNode(item.name));
        
        if (item.isBought === true) {
            nameDiv.className = 'item-name bought-text';
        } else {
            nameDiv.className = 'item-name';
            nameDiv.onclick = function() {
                const input = document.createElement('input');
                input.className = 'edit-input';
                input.value = item.name;

                input.onblur = function() {
                    if (input.value !== '') {
                        item.name = input.value; 
                    }
                    render(); 
                };

                nameDiv.innerHTML = '';
                nameDiv.appendChild(input);
                input.focus();
            };
        }

        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'item-controls';

        if (!item.isBought) {
            const btnMinus = document.createElement('button');
            btnMinus.className = 'btn-circle btn-minus';
            btnMinus.appendChild(document.createTextNode('-'));
            if (item.amount === 1) {
                btnMinus.disabled = true;
            }
            btnMinus.onclick = () => {
                if (item.amount > 1) {
                    item.amount = item.amount - 1;
                    render();
                }
            };

            const numberSpan = document.createElement('span');
            numberSpan.className = 'number';
            numberSpan.appendChild(document.createTextNode(item.amount));

            const btnPlus = document.createElement('button');
            btnPlus.className = 'btn-circle btn-plus';
            btnPlus.appendChild(document.createTextNode('+'));
            
            btnPlus.onclick = () => {
                item.amount = item.amount + 1;
                render();
            };
            controlsDiv.appendChild(btnMinus);
            controlsDiv.appendChild(numberSpan);
            controlsDiv.appendChild(btnPlus);
        } else {
            const numberSpan = document.createElement('span');
            numberSpan.className = 'number';
            numberSpan.appendChild(document.createTextNode(item.amount));
            controlsDiv.appendChild(numberSpan);
        }

        const statusBtn = document.createElement('button');
        statusBtn.className = 'btn-status';
        
        if (item.isBought === true) {
            statusBtn.appendChild(document.createTextNode('Не куплено'));
        } else {
            statusBtn.appendChild(document.createTextNode('Куплено'));
        }
        statusBtn.onclick = function() {
            if (item.isBought === true) {
                item.isBought = false;
            } else {
                item.isBought = true;
            }
            render(); 
        };
        itemDiv.appendChild(nameDiv);
        itemDiv.appendChild(controlsDiv);
        itemDiv.appendChild(statusBtn);

        if (!item.isBought) {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete';
            deleteBtn.appendChild(document.createTextNode('x'));
            
            deleteBtn.onclick = function() {
                items.splice(i, 1); 
                render();
            };
            itemDiv.appendChild(deleteBtn);
        }
        itemsList.appendChild(itemDiv);
        const tagDiv = document.createElement('div');
        if (item.isBought === true) {
            tagDiv.className = 'tag bought-text';
        } else {
            tagDiv.className = 'tag';
        }
        tagDiv.innerHTML = `${item.name} <span class="tag-number">${item.amount}</span>`;

        if (item.isBought === true) {
            boughtList.appendChild(tagDiv);
        } else {
            leftToBuyList.appendChild(tagDiv);
        }
    }
}
function addNewItem() {
    const newName = addInput.value;

    if (newName !== '') {
        items.push({
            name: newName,
            amount: 1, 
            isBought: false
        });
        
        addInput.value = ''; 
        addInput.focus(); 
        render(); 
    }
}
addBtn.onclick = addNewItem;

addInput.onkeydown = function(event) {
    if (event.key === 'Enter') {
        addNewItem();
    }
};

render();