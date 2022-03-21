const initialSelection = 'emboss';

// for kernel matrix 3x3
const numberOfRows = 3;
const numberOfColumns = 3;

function setUpMatrixForm(numberOfRows, numberOfColumns) {
    const matrixFormContainer = document.getElementById('user-matrix-form-container');

    let matrixInputForm = document.createElement('form');
    matrixInputForm.id = 'user-input-matrix';

    let nameInput = document.createElement('input');
    nameInput.id = 'new-kernel-name-input';
    nameInput.type = 'text';
    nameInput.value = 'custom';

    for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
        let row = document.createElement('div');
        row.id = `user-matrix-row-${rowNumber}`;
        row.classList.add('matrix-row');

        for (let i = 0; i < numberOfColumns; i++) {
            let input = document.createElement('input');
            input.type = 'number';
            input.id = `user-matrix-input-${i+numberOfColumns*rowNumber}`;
            input.classList.add('matrix-input');
            if (i+numberOfColumns*rowNumber === 4) {
                input.value = '1';
            } else {
                input.value = '0';
            }

            row.appendChild(input);
        }
        matrixInputForm.appendChild(row);
    }

    let submitButton = document.createElement('button');
    submitButton.id = 'submitButton';
    submitButton.name = 'submitButton';
    submitButton.type = 'submit';
    submitButton.textContent = 'Zkompilovat kernel';
    submitButton.addEventListener('click', handleSubmit);

    let resetButton = document.createElement('button');
    resetButton.id = 'resetButton';
    resetButton.name = 'resetButton';
    resetButton.type = 'submit';
    resetButton.textContent = 'Reset';

    matrixInputForm.appendChild(nameInput);
    matrixInputForm.appendChild(submitButton);
    matrixInputForm.appendChild(resetButton);
    // matrixInputForm.addEventListener('submit', handleSubmit);

    matrixFormContainer.appendChild(matrixInputForm);
}

function setUpEffectsMenu() { // radio buttons
    // Setup UI to pick kernels.
    const ui = document.getElementById("effects-menu");

    let options = document.getElementById("kernel-options");
    // overwrite previously drawn menu
    options.textContent = '';

    for (let name in kernels) {
        let option = document.createElement("input");
        option.id = `radio-input-${name}`;
        option.type = 'radio';
        option.value = name;
        option.name = 'kernel';

        option.onchange = function() {
            selectedEffect = name;
            displayKernelMatrix(kernels[selectedEffect]);
        };

        let label = document.createElement('label');
        label.for = `radio-input-${name}`;
        label.textContent = name;

        if (name === initialSelection) {
            selectedEffect = initialSelection;
            option.checked = true;
        }

        options.appendChild(label);
        options.appendChild(option);
    }
    ui.appendChild(options);
}

function handleSubmit(event) {
    event.preventDefault();

    let kernelMatrix = [];

    for (let i = 0; i < numberOfRows*numberOfColumns; i++) {
        kernelMatrix.push(parseFloat(document.getElementById('user-input-matrix').elements[`user-matrix-input-${i}`].value));
    }

    const kernelName = document.getElementById('user-input-matrix').elements['new-kernel-name-input'].value;

    saveNewKernel(kernelName, kernelMatrix);
}

function saveNewKernel(name, matrix) {
    kernels[name] = [
        matrix[0], matrix[1], matrix[2],
        matrix[3], matrix[4], matrix[5],
        matrix[6], matrix[7], matrix[8]
    ];
    setUpEffectsMenu();
    displayKernelMatrix(kernels[selectedEffect]);
}

function displayKernelMatrix(matrix) {
    let currentMatrixUI = document.getElementById('current-matrix-ui');

    // clear
    currentMatrixUI.textContent = `Current matrix`;

    let table = document.createElement('table');

    for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
        let row = document.createElement('tr');

        for (let i = 0; i < numberOfColumns; i++) {
            let cell = document.createElement('td');

            cell.textContent = matrix[i+numberOfColumns*rowNumber];

            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    currentMatrixUI.appendChild(table);
}

function main() {
    setUpEffectsMenu();
    setUpMatrixForm(numberOfRows, numberOfColumns);
    displayKernelMatrix(kernels[initialSelection]);
}

main();