
import { useState } from 'react';
import './App.css';

function App() {
  const [basket, setBasket] = useState([]);

  function addProduct(product) {
    const existingProduct = basket.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedBasket = basket.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            price: item.price + (item.price/item.quantity),
          };
        }
        return item;
      });

      setBasket(updatedBasket);
    } else {
      setBasket([...basket, { ...product, quantity: 1 }]);
    }
  }

  function removeProduct(product) {
    const existingProduct = basket.find((item) => item.id === product.id);

    if (existingProduct) {
      if (existingProduct.quantity === 1) {
        setBasket(basket.filter((item) => item.id !== product.id));
      } else {
        const updatedBasket = basket.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity - 1,
              price: (item.quantity - 1) * (item.price / item.quantity),
            };
          }
          return item;
        });

        setBasket(updatedBasket);
      }
    } else {
      setBasket([...basket, { ...product, quantity: 1 }]);
    }
  }

  return (
    <div className="App-header">
      <div className='product'>
        <p>Tomato</p>
        <p>Price: 30</p>
        <button onClick={() => addProduct({ id: 1, name: 'Tomato', price: 30 })}>Add</button>
      </div>

      <div className='product'>
        <p>Potato</p>
        <p>Price: 15</p>
        <button onClick={() => addProduct({ id: 2, name: 'Potato', price: 15 })}>Add</button>
      </div>

      <div className='product'>
        <p>Cucumber</p>
        <p>Price: 10</p>
        <button onClick={() => addProduct({ id: 3, name: 'Cucumber', price: 10 })}>Add</button>
      </div>

      <div className='basket'>
        <h2>Basket</h2>
        {basket.map((product) => (
          <div key={product.id} className='product'>
            <p>{product.name}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Price: {product.price}</p>
            <button onClick={() => addProduct({ id: product.id, name: product.name, price: product.price })}>+</button>
            <button onClick={() => removeProduct({ id: product.id, name: product.name, price: product.price })}>-</button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
