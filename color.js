/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button
 * - Also display the hex code to a disabled input field
 * - Add a button to copy the color code
 * -add a toast message when the color code is copied
 * - Bonus: Add slide-in and slide-out animation to the toast message
 * -User can type their own color hexadecimal code to the input field and change the background color
 * -# is including in the input field
 * -Lower case to upper case conversion of hex code in the input field
 */

// Steps
// global variable declaration
let div = null;

// Step 1 - create onload handler
window.onload = () => {
	main();
};

function main() {
	// step 3 - collect all necessary references
	const root = document.getElementById('root');
	const output = document.getElementById('output');
	const changeBtn = document.getElementById('change-btn');
	const copyBtn = document.getElementById('copy-btn');

	// step 4 - handle the change button click event
	changeBtn.addEventListener('click', function () {
		const bgColor = generateHexColor();
		root.style.backgroundColor = bgColor;
		output.value = bgColor.substring(1);

	});
	// step 5 - handle the copy button click event
	copyBtn.addEventListener('click', function () {
		navigator.clipboard.writeText(`#${output.value}`);
		if (div !== null) {
			div.remove();
			div = null;
		}
		// copyBtn.innerHTML = "Code Copied";
		// step 11 - prevent copying hex code if it is not valid
		else if (isValidHex(output.value)) {
			generateToastMessage(`#${output.value} copied to clipboard`);
		} else {
			alert("Invalid Color Code");
		}
	});
	// step 10-implement change handler on input field
	output.addEventListener('keyup', function (e) {
		const color = e.target.value;
		if (color) {
			output.value = color.toUpperCase();
			if (isValidHex(color)) {
				root.style.backgroundColor = `#${color}`;
			}
		}
	});


}

// step 2 - random color generator function
function generateHexColor() {
	// #000000 #ffffff
	// 255, 255, 255 -> #FFFFFF
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}
// step 7-create a dynamic toast message
function generateToastMessage(msg) {
	div = document.createElement("div");
	div.innerText = msg;
	div.className = 'toast-message toast-message-slide-in';
	div.addEventListener('click', function () {
		div.classList.remove('toast-message-slide-in');
		div.classList.add('toast-message-slide-out');
		// step 8-clear the toast message after animation end
		div.addEventListener('animationend', function () {
			div.remove()
			div = null;
		})

	})



	document.body.appendChild(div);


}
/**
 * 
 * @param {string} color 
 */
// step 9- create isHexValid function 
function isValidHex(color) {
	if (color.length !== 6) return false;
	return /^[0-9A-Fa-f]{6}$/i.test(color);
}












