import { useState, useEffect } from 'react';

import retrieveUser from '../logic/retrieve-user';
import retrieveVehicle from '../logic/retrieve-vehicle';



function Cart (){
    const [cart, setCart] = useState()


    
    console.log(cart) 

    const getUserCart = ()=>{
        let cartVehicles = []
        retrieveUser(sessionStorage.token, (error, user) => {
            if (error) {console.log(error.message);
            }else {
             let userCart = user.cart;
             
             console.log(userCart)
             
             if(userCart){
                userCart.map((vehicle) => {
                    retrieveVehicle(sessionStorage.token, vehicle.id, (error, vehicle) => {
                        if (error) console.log(error.message);
                        else {
                            console.log(cartVehicles)
                            cartVehicles.push(vehicle)
                           
                        }
                    })
                })
                setCart(cartVehicles)
             }else console.log(' cart not found ')
            }
        })
    }

    useEffect(()=>{
        getUserCart()
    })


        return(
            <div className="cart-container panel cart-panel">
                <h2>Cart</h2>

               { cart ? (
                   <ul>
                       {cart.map((vehicle)=>{
                           return(
                           <li className="cart-list-item" key={vehicle.id}>
                           <img className="cart-list-item-img" src={vehicle.image}></img>
                           <p className="cart-list-item-name">{vehicle.name}</p>
                           <p className="cart-list-item-price">{vehicle.price}$</p>
                           <span
                             onClick={() =>
                               alert("TODO => onclick to delte fav vehicle")
                             }
                             className="cart-list-item-delete selectable"
                           >
                             🗑️
                           </span>
                         </li>
                         )
                       })}
                   </ul>
               ): (
                   <h2> NO HAY COCHES</h2>
               )}

            </div>
        )
}
export default Cart

