import { useEffect, useState, useReducer, useRef } from 'react';
import useLocalStorage from './hooks/localStorage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './styles/app.scss';
import Navbar from './components/Navbar.js'
import Home from './components/Home';
import Orders from './components/Orders';
import MakeOrder from './components/MakeOrder';
import Help from './components/Help';
import Feedback from './components/Feedback';
const reducer = (state, action) => {
  switch (action.type) {
      case 'primary':
          return {
              table: false,
              servant: false,
              food: false,
              tableNumber: false,
              meal: false,
              salad: false,
              dinner: false,
              drink: false,
              alcoholic: false,
              non_alcoholic: false,
              [action.payload]: !state[action.payload]
          }
      case 'secondary':
          return {
              table: false,
              servant: false,
              food: false,
              tableNumber: false,
              meal: false,
              salad: false,
              dinner: false,
              drink: false,
              alcoholic: false,
              non_alcoholic: false,
              [action.payload]: true
          }
      case 'back':
          return{
              table: false,
              servant: false,
              food: false,
              tableNumber: false,
              meal: false,
              salad: false,
              dinner: false,
              drink: false,
              alcoholic: false,
              non_alcoholic: false,
              [action.payload]: true
          }
      case 'final':
          return{
              table: false,
              servant: false,
              food: false,
              tableNumber: false,
              meal: false,
              salad: false,
              dinner: false,
              drink: false,
              alcoholic: false,
              non_alcoholic: false,
          }
  }
}
function App() {
  const tableRef = useRef(null)
  const servantRef = useRef(null)
  const foodRef = useRef(null)
  const amountRef = useRef(null)
  const [server, setServer] = useState(null)
  useEffect(()=>{
    window.addEventListener('click',(event)=>{
      if(event.target === tableRef.current || event.target === servantRef.current || event.target === foodRef.current){
        return
      }else{
        if(event.target !== tableRef.current.nextElementSibling){
          // console.log('target = ',event.target)
          // console.log('sibling = ',tableRef.current.nextElementSibling)
          // dispatch({type:'final'})
        }
      }
    },true)
    fetch('http://localhost:8000/data')
    .then(res=>res.json())
    .then(d=>{
      setServer(d)
    })
  },[])
  const [state, dispatch] = useReducer(reducer, {
      table: false,
      servant: false,
      food: false,
      tableNumber: false,
      meal: false,
      salad: false,
      dinner: false,
      drink: false,
      alcoholic: false,
      non_alcoholic: false,
  })
  const [inputValue, setInputValue] = useState({
    table: '',
    servant: '',
    food: {name: '',foodPrice: ''},
    amount: '',
    price: '',
})
const handleInput = (e,dropdown) =>{
  dispatch({type: dropdown.type,payload: dropdown.payload})
  if(e.target == tableRef.current){
      setInputValue(prev=>{
          return{
              ...prev,
              table: ''
          }
      })
  }
  else if(e.target == servantRef.current){
      setInputValue(prev=>{
          return{
              ...prev,
              servant: ''
          }
      })
  }
}
const tableBack = (dropdown) =>{
  dispatch({type: dropdown.type,payload: dropdown.payload})
  setInputValue(prev=>{
      return{
          ...prev,
          table: ''
      }
  })
}
const getTableValue = (dropdown, tableLetter) =>{
  dispatch({type: dropdown.type,payload: dropdown.payload})
  setInputValue(prev=>{
      return {
          ...prev,
          table: prev.table+String(tableLetter),
      }
  })
}
const getServantValue = (dropdown,servantName) =>{
  dispatch({type: dropdown.type, payload: dropdown.payload})
  setInputValue(prev=>{
      return{
          ...prev,
          servant: servantName
      }
  })
}
const getFoodValue = (dropdown, food) =>{
  dispatch({type: dropdown.type, payload: dropdown.payload})
  setInputValue(prev=>{
      return{
          ...prev,
          food: {name: food[0],foodPrice: food[1]}
      }
  })
}
const [orderInfo, setOrderInfo] = useLocalStorage('orderInfo', [{
  tableName: '',
  servantName: '',
  food: [
    // {
    //   name: '',
    //   amount: '',
    //   price: ''
    // }
  ],
  orderDate: '',
  ended: false,
  currentStep: 1,
  dataOrder: 0
}])
const createOrder = (event) =>{
  event.preventDefault()
  const inputs = [tableRef.current, servantRef.current]
  const allValid = inputs.every(input=> input.reportValidity())
  if(allValid){
    setOrderInfo(prev=>{
      return [{
        ...prev[orderInfo.length - 1],
        tableName: inputValue.table,
        servantName: inputValue.servant,
        currentStep: 2,
        dataOrder: orderInfo.length - 1
      }]
    })
  }
}
const addOrder = (event) =>{
  event.preventDefault()
  const inputs = [foodRef.current, amountRef.current]
  const allValid = inputs.every(input=> input.reportValidity())
  if(foodRef.current.checkValidity()){
    setOrderInfo(prev=>{
      return [{
        ...prev[orderInfo.length - 1],
        food: [
          ...prev[orderInfo.length - 1].food,
        {
          name: inputValue.food.name,
          amount: inputValue.amount,
          price: inputValue.food.foodPrice,
        }],
      }]
    })
  }
}
console.log(orderInfo)
  return (
    <Router>
      <div className='App'>
        <div className='App__flex'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sifarisler' element={<Orders />} />
            <Route path='/sifarisver' element={server && <MakeOrder
            api = {server}
            handleInput = {handleInput}
            tableBack = {tableBack}
            getTableValue = {getTableValue}
            getServantValue = {getServantValue}
            getFoodValue = {getFoodValue}
            dispatch = {dispatch}
            createOrder = {event=>createOrder(event)}
            addOrder = {event => addOrder(event)}
            state = {state}
            inputValue = {inputValue}
            tableRef = {tableRef}
            servantRef = {servantRef}
            foodRef = {foodRef}
            amountRef = {amountRef}
            orderInfo = {orderInfo}
            />} />
            <Route path='/komek' element={<Help />} />
            <Route path='/rey' element={<Feedback />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;