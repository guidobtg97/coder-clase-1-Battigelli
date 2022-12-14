import React, {useState, useContext} from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import '../Cart/Cart.css';

const Cart = () => {

  const [idCompra, setIdCompra] = useState("");
  const {cart, clearCart, removeProduct, totalPrice} = useContext(CartContext);

  const HandleId = (id) => {
    setIdCompra(id);
  }

  if(idCompra){
    return <h3>Gracias por su compra, su id es: {idCompra}</h3>
  }

  if (cart.length === 0) {
    return <> 
          <div className='cart-container-1'>
            <div className='empty-container'>
              <img id='empty-cart' src="empty-cart.png" alt='carrito-vacio'/>
              <h3>¡Vaya! El carrito está vacio, deberías agregar algo.</h3>
              <button id='btn-cart'>    
                  <Link id='link-cart' to='/'>Ir a la tienda</Link>
              </button>
            </div>
          </div>
          </>
  }else {
    return (
      <div>
        {
          cart.map((prod) => (
            <div key={prod.id}>
              <div><img src={prod.img} alt='img-cart'/></div>
              <h3>{prod.title}</h3>
              <h3>Precio: {prod.price} ({prod.price * prod.count})</h3>
              <h3>Cantidad: {prod.count}</h3>
              <button onClick={()=>removeProduct(prod.id)}>Eliminar</button>
              
            </div>
          ))}
        <button onClick={clearCart}>Clear Cart</button>
        <div>Total: ${totalPrice()}</div>
        <Form cart={cart} totalPrice={totalPrice} clearCart={clearCart} handleId={HandleId}/>
      </div>
    )
  }


  
}

export default Cart