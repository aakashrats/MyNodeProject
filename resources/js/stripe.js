
import { loadStripe } from "@stripe/stripe-js";

import { placeOrder } from "./apiService";

import { CardWidget } from "./CardWidget";

export async function initStripe() {

    const stripe = await loadStripe('pk_test_51NSm3OSEYCSzMIGiYAA55hFjY7GUUL44nLWIaip7Du6MJ0ydYRogy6Eb4qBbE6HH8wWF5s4mHTuETsBZuarkaTvt00DPw8CZ2p');

    let card = null;



    const paymentType = document.querySelector('#paymentType');

    if (!paymentType) {

    return;
    }

    paymentType.addEventListener('change', (e) => {

        //console.log(e.target.value);

        if (e.target.value === 'card') {

            // display widget

            card = new CardWidget(stripe);
            
            card.mount();

        } else {

            card.destroy();
   
        }

    });

//Ajax call

const paymentForm = document.querySelector('#payment-form');

if(paymentForm) {

  paymentForm.addEventListener('submit', async (e) =>{

    e.preventDefault();
 
    let formData = new FormData(paymentForm);

 
    let formObject = {}
 
    for(let [key, value] of formData.entries()) {
      
     formObject[key] = value;

 
    }

  
    if(!card) {
        //ajax call 
        placeOrder(formObject);

        return;
    }

    const token = await card.createToken()

    formObject.stripeToken = token.id;

    placeOrder(formObject);


 
     })
}
}