

// Aquí irá la lógica JS de la calculadora
// Puedes agregar los eventos y funciones para operar los botones
// Selección de elementos principales de la calculadora
const display = document.getElementById('display'); // Pantalla principal
const historyDiv = document.getElementById('history'); // Histórico de operaciones
const currentOpDiv = document.getElementById('current-operation'); // Operación en curso
const buttons = document.querySelectorAll('button'); // Todos los botones

// Estado de la calculadora
let current = '0';      // Número actual mostrado en pantalla
let operator = null;    // Operador actual (+, -, ×, ÷, √)
let operand = null;     // Primer operando (número anterior)
let resetNext = false;  // Indica si el siguiente número debe reiniciar el display
let history = '';       // Histórico de la última operación realizada

// Actualiza el display principal con el valor actual
function updateDisplay() {
	display.textContent = current;
}

// Actualiza el histórico y la operación en curso
function updateOperationDisplay() {
	historyDiv.textContent = history; // Muestra la última operación realizada
	let opSymbol = '';
	// Determina el símbolo del operador
	switch (operator) {
		case 'add': opSymbol = '+'; break;
		case 'subtract': opSymbol = '-'; break;
		case 'multiply': opSymbol = '×'; break;
		case 'divide': opSymbol = '÷'; break;
		case 'sqrt': opSymbol = '√'; break;
		default: opSymbol = '';
	}
	// Muestra la operación en curso
	if (operator && operand !== null) {
		if (operator === 'sqrt') {
			currentOpDiv.textContent = `√(${current})`;
		} else {
			currentOpDiv.textContent = `${operand} ${opSymbol} ${current}`;
		}
	} else {
		currentOpDiv.textContent = '';
	}
}

// Asigna el evento click a cada botón de la calculadora
buttons.forEach(btn => {
	btn.addEventListener('click', () => {
		const num = btn.getAttribute('data-number');   // Si es un número o punto
		const action = btn.getAttribute('data-action'); // Si es una acción

		// Si se presiona un número o punto
		if (num !== null) {
			if (resetNext) {
				// Si se acaba de realizar una operación, reinicia el display
				current = num === '.' ? '0.' : num;
				resetNext = false;
			} else {
				// Evita dos puntos decimales
				if (num === '.' && current.includes('.')) return;
				// Si el display es 0, reemplaza; si no, concatena
				current = current === '0' && num !== '.' ? num : current + num;
			}
			updateDisplay();
			updateOperationDisplay();
		}
		// Si se presiona una acción
		else if (action) {
			switch (action) {
				case 'clear':
					// Reinicia la calculadora
					current = '0';
					operator = null;
					operand = null;
					resetNext = false;
					history = '';
					updateDisplay();
					updateOperationDisplay();
					break;
				case 'sign':
					// Cambia el signo del número actual
					current = String(-parseFloat(current));
					updateDisplay();
					updateOperationDisplay();
					break;
				case 'percent':
					// Convierte el número actual en porcentaje
					current = String(parseFloat(current) / 100);
					updateDisplay();
					updateOperationDisplay();
					break;
				case 'add':
				case 'subtract':
				case 'multiply':
				case 'divide':
					// Guarda el operador y el primer operando
					operator = action;
					operand = parseFloat(current);
					resetNext = true;
					updateOperationDisplay();
					break;
				case 'sqrt':
					// Operación de raíz cuadrada
					operator = action;
					operand = null;
					updateOperationDisplay();
					break;
				case 'equals':
					// Realiza la operación seleccionada
					let result = parseFloat(current);
					let opString = '';
					if (operator) {
						switch (operator) {
							case 'add':
								opString = `${operand} + ${current}`;
								result = operand + parseFloat(current);
								break;
							case 'subtract':
								opString = `${operand} - ${current}`;
								result = operand - parseFloat(current);
								break;
							case 'multiply':
								opString = `${operand} × ${current}`;
								result = operand * parseFloat(current);
								break;
							case 'divide':
								opString = `${operand} ÷ ${current}`;
								result = operand / parseFloat(current);
								break;
							case 'sqrt':
								opString = `√(${current})`;
								result = Math.sqrt(parseFloat(current));
								break;
						}
						// Guarda el histórico y muestra el resultado
						history = opString + ' = ' + result;
						current = String(result);
						operator = null;
						operand = null;
						resetNext = true;
						updateDisplay();
						updateOperationDisplay();
					}
					break;
			}
		}
	});
});


