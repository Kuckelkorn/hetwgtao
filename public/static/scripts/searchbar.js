const praetor = document.querySelector('#Praetor');
const pInput = document.querySelector('#pInput');

function show(event){
	const item = event.target.parentNode.querySelector('.list');
	// console.log(item)
	item.classList.add("show");
}

function hide(event){
	setTimeout(() => {
		const item = event.target.parentNode.querySelector('.list');
		item.classList.remove("show");
	}, 100)    
}

function filter(event){
	const filter = event.target.value.toUpperCase();
	const li = event.target.parentNode.getElementsByTagName('li');

	// Loop through all list items, and hide those who don't match the search query
	for (let i = 0; i < li.length; i++) {
		const a = li[i].getElementsByTagName("p")[0];
		const txtValue = a.textContent || a.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].classList.add("show");
			li[i].classList.remove("hide");
		} else {
			li[i].classList.add("hide");
			li[i].classList.remove("remove");
		}
	}
}

function add(event){
	const value = event.target.innerHTML;
	event.target.parentNode.parentNode.parentNode.querySelector('.input').value = value;
}


