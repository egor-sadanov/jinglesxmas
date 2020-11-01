(async () => {
	'use strict';

	let shippingCost;
	let deliveryDates;
  // const day = new Day(deliveryDate);
  // const isWeekend = !(day.getDay() % 6) ? true:false;
  const form = document.getElementById('cart');

	// Listen to changes to the user-selected postcode.
	form
	.querySelector('input[name=postal_code]')
	.addEventListener('change', (event) => {
		event.preventDefault();
		getDeliveryOptions(parseInt(event.target.value));
	});
		
	const getDeliveryOptions = async (postcode) => {
    const response = await fetch(`/delivery-dates/${postcode}`);
		const deliveryDates  = await response.json();

		const selectDate = document.getElementsByName('date');
		selectDate.textContent = '';
    // Build and append the delivery dates
    for (let [id, date] of Object.entries(deliveryDates)) {
			let option = document.createElement('option');
			option.innerHTML = `
				<option value="${date}">${date}</option>`;
				selectDate.appendChild(option);
    }
	}

	// Listen to changes to the user-selected postcode.
	document
	.getElementById('date')
	.addEventListener('change', (event) => {
		event.preventDefault();
		// getDeliveryOptions(parseInt(event.target.value));
	});
	
})();