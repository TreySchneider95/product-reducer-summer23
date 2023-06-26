import React, {useReducer, useEffect} from 'react'

import './App.css';
// import {v4 as uuidv4} from 'uuid'
import productReducer from './reducers/productReducer'
import ProductCard from './components/ProductCard';
import { getProducts } from './redux/productSlice';
import productSlice from './redux/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, editProduct, addProduct } from './redux/productSlice';

function App() {
  // const initialState = [
  //   {
  //     id: uuidv4(),
  //     title: "Hogwart's Legacy",
  //     publisher: "Warner Bros.",
  //     genre: "Adventure",
  //     price: 59.99
  //   },
  //   {
  //     id: uuidv4(),
  //     title: "Destiny 2",
  //     publisher: "Bungie",
  //     genre: "FPS",
  //     price: 29.99
  //   },
  //   {
  //     id: uuidv4(),
  //     title: "The Last of Us",
  //     publisher: "Sony",
  //     genre: "Adventure",
  //     price: 69.99
  //   },
  //   {
  //     id: uuidv4(),
  //     title: "Total War: Warhammer III",
  //     publisher: "Sega",
  //     genre: "Strategy",
  //     price: 49.99
  //   },
  //   {
  //     id: uuidv4(),
  //     title: "Everything, Everywhere, All at Once",
  //     publisher: "A24",
  //     genre: "Action/Adventure",
  //     price: 29.99      
  //   },
  //   {
  //     id: uuidv4(),
  //     title: "Dune",
  //     publisher: "Penguin Classics",
  //     genre: "Action/Adventure",
  //     price: 20.99     
  //   }
  // ]

  // const [product, dispatch] = useReducer(productReducer, initialState)

  // const [product, dispatch] = useReducer(productReducer, [])

  const product = useSelector(state => state.products)
  const dispatch = useDispatch()
  
  
  useEffect(() => {
    dispatch(getProducts())
  // const loadData = async () => {
  //   const response = await fetch('http://localhost:4000/api/products/get-all-products')
  //   const data = await response.json()
  //   // console.log(data)
  //   dispatch({
  //     type: 'get-products',
  //     payload: data
  //   })
  // }
  // loadData()
 }, [dispatch, product.products])
 

 //make a button the calls to the store/list-products route
 // take the data from that route. destructure it so it is compatible
 // add to the existing array of data

// take this object data
//  {
//   "id": 782330,
//   "gameTitle": "Doom: Eternal",
//   "publisherName": "Bethesda",
//   "gameStudio": "id Software",
//   "genre": "FPS",
//   "MSRP": 39.99
// },
// and turn it into the below object
// {
//   "id": 782330,
//   "title": "Doom: Eternal",
//   "publisher": "Bethesda",
//   "genre": "FPS",
//   "price": 39.99
// },

// const getAPIdata = async () => {
//   const response = await fetch('http://localhost:4000/api/store/list-products')
//   const data = await response.json()
//   dispatch({
//     type: 'add-store',
//     payload: data
//   })
// }

  return (
    <div className="App">
      <h1>Video Game Products</h1>
      <button onClick={
        ()=>dispatch(addProduct())
      }>Add Product</button>

      {/* <button onClick={getAPIdata}>API</button> */}
      {!product.products ?
        product.map((element) => {
          return (
          <ProductCard
            key={element.id}
            id={element.id}
            title={element.title}
            publisher={element.publisher}
            genre={element.genre}
            price={element.price}
            deleteProduct = {
              (id) => dispatch(deleteProduct({
                id: id
              }))
            }
            editProduct = {
              (param) => dispatch(editProduct({
                editedObj: param
              }))
            }
          /> 
          )
        })
     : ""}
    </div>
  );
}

export default App;
