const button = document.querySelector('button.add');
const finalInput = document.querySelector('form input:last-child')

button.addEventListener('click', function () {
	finalInput.insertAdjacentHTML('afterend', '<input type="text", name="lid", placeholder="Zoeken..." list="leden" >')
});
