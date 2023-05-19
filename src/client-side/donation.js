// document.addEventListener('DOMContentLoaded', () => {
//   const payBtn = document.querySelector('#pay-btn');

//   if (payBtn) {
//     payBtn.addEventListener('click', (event) => {
//       // Here you can add the code to process the payment, for example with a payment gateway API
//       // For now, we'll just redirect to the confirmation page

//       event.preventDefault();

//       const confirmationUrl = 'confirmation.html';
//       if (confirmationUrl) {
//         window.location.href = confirmationUrl;
//       } else {
//         console.error('Confirmation page URL is not defined');
//       }
//     });
//   } else {
//     console.error('Pay button not found');
//   }
// });

// Get the form and the Pay button
const form = document.getElementById('donation-form');
const payButton = document.getElementById('pay-btn');
const confirmationUrl = 'confirmation.html';

// Add an event listener to the Pay button
payButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the form from submitting

  // Get the values from the form
  const name = form.elements['name'].value;
  const email = form.elements['email'].value;
  const amount = form.elements['amount'].value;

  // Make a request to the API endpoint
  fetch('http://127.0.0.1:3000/donate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      amount: +amount,
    }),
  })
    .then((response) => {
      if (response.ok) {
        // Handle a successful response
        // console.log(response.url);
        // console.log('Donation successful!');
        // window.location.href = confirmationUrl;
        return response.json();
      } else {
        // Handle an unsuccessful response
        console.error('Error donating:', response.statusText);
      }
    })
    .then((data) => {
      window.location.href = data.session;
    })
    .catch((error) => {
      console.error('Error donating:', error);
    });
});
