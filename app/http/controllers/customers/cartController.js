const { json } = require("express")

function cartController(){
    return{

        index(req, res) {
           res.render('customers/cart', { session: req.session });
         // res.render('customers/cart', { users: users });
          },
          
         
    //    index (req, res){
              
    //          res.render('customers/cart',{cart:req.session.cart})

    //    },

       update(req, res){

        // let cart = {

        //     items: {

        //         pizzaId: { item: pizzaObject, qty:0 },

        //     },   
   
        // }
   
    // for the first time creating cart and adding basic object structure

        if (!req.session.cart) {

                req.session.cart = {

                     items: { },

                     totalQty: 0,

                     totalPrice: 0

            };
   
        }

        let cart= req.session.cart;

        // check if item does not exist in cart
        
        if (!cart.items[req.body._id]) {
            
            cart.items[req.body._id] = {

                item: req.body,
                
                qty:  1,

            };
            
           cart.totalQty = cart.totalQty + 1;
                  
           cart.totalPrice += parseInt(req.body.price);
            
            //cart.totalPrice += cart.items[req.body._id].item.price;
            

             
        } else {

                 cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
             
                 cart.totalQty = cart.totalQty + 1

                 cart.totalPrice += parseInt(req.body.price);

                 // cart.totalPrice += cart.items[req.body._id].item.price;

                 
            }

                return res.json({ totalQty: req.session.cart.totalQty})

          }

       }
   
    };

   
   module.exports = cartController;