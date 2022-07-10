import '../styles/makeOrder.scss'
import { useReducer, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

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
const MakeOrder = ({api}) =>{
    const tableRef = useRef(null)
    const servantRef = useRef(null)
    const foodRef = useRef(null)
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
        price: ''
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
    return (
        <section className="makeorder">
            <div className='order-details'>
                <form>
                    <div className='card create-order'>
                        <div className='table-group'>
                            <label>Sifarişin aid olduğu masa</label>
                            <input
                            ref={tableRef}
                            type={'text'}
                            value = {inputValue.table}
                            onClick={(event)=>handleInput(event,{type: 'primary', payload: 'table'})}
                            onChange={(e)=>e.target.value = ''}
                            />
                                <div className={`dropdown dropdown--table ${state.table && 'active'}`}>
                                    <CSSTransition
                                    in={state.table}
                                    unmountOnExit
                                    timeout={500}
                                    classNames='menu-primary'
                                    >
                                        <div className='table-menu'>
                                            <b>Table Group</b>
                                            <ul>
                                            {
                                                Object.keys(api.table).map((el, index)=>{
                                                    return (
                                                    <li onClick={
                                                        ()=>getTableValue({type: 'secondary', payload: 'tableNumber'},el)
                                                        } key={index}>
                                                        <span className='table-letter'>{el}</span>
                                                        <span className='right-icon'><FontAwesomeIcon icon={faCaretRight}/></span>
                                                    </li>)
                                                })
                                            }
                                            </ul>
                                        </div>
                                    </CSSTransition>
                                    <CSSTransition
                                    in={state.tableNumber}
                                    unmountOnExit
                                    timeout={500}
                                    classNames='menu-secondary'
                                    >
                                        <div className='tableNumber-menu'>
                                            <div onClick={()=>tableBack({type: 'back', payload: 'table'})}>
                                                <span><FontAwesomeIcon icon={faArrowLeft} /></span>
                                                <b>Table Group</b>
                                            </div>
                                            <ul>
                                            {
                                                api.table.A.map((el, index)=>{
                                                    return (
                                                    <li onClick={()=>getTableValue({type: 'final', payload: 'table'},el)} key={index}>
                                                        <span className='table-number'>{el}</span>
                                                    </li>)
                                                })
                                            }
                                            </ul>
                                        </div>
                                    </CSSTransition>
                                </div>
                        </div>
                        <div className='servant-group'>
                            <label>Xidmət edəcək şəxs</label>
                            <input
                            ref={servantRef}
                            type={'text'}
                            onClick={(event)=>handleInput(event,{type: 'primary', payload: 'servant'})}
                            value = {inputValue.servant}
                            onChange={(e)=>e.target.value = ''}
                            />
                                <div className={`dropdown dropdown--servant ${state.servant && 'active'}`}>
                                    <CSSTransition
                                    in={state.servant}
                                    unmountOnExit
                                    timeout={500}
                                    classNames='menu-primary'
                                    >
                                        <div className='servant-menu'>
                                            <b>Servant names</b>
                                            <ul>
                                                {
                                                    api.servant.map((el,index)=>{
                                                        return (
                                                            <li onClick={()=>getServantValue({type: 'final', payload: 'servant'},el)} key={index}>
                                                                <span className='servant'>{el}</span>
                                                            </li>)
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </CSSTransition>
                                </div>
                        </div>
                        <div className='create-button'>
                            <button>Sifarişi yarat</button>
                        </div>
                    </div>
                    <div className='card select-food'>
                        <div className='food-group'>
                            <label>Məhsul adı</label>
                            <input
                            ref={foodRef}
                            type={'text'}
                            onClick={(event)=>handleInput(event,{type: 'primary', payload: 'food'})}
                            value = {inputValue.food.name}
                            onChange={(e)=>e.target.value = ''}
                            />
                                <div className={`dropdown dropdown--food ${state.food && 'active'}`}>
                                    <CSSTransition
                                    in={state.food}
                                    unmountOnExit
                                    timeout={500}
                                    classNames='menu-primary'
                                    >
                                        <div className='food-menu'>
                                            <b>Yemək menusu</b>
                                            <ul>
                                                {
                                                    Object.keys(api.food).map((el,index)=>{
                                                        return (
                                                            <li onClick={()=>dispatch({type: 'secondary',payload: el})} key={index}>
                                                                <span className=''>{el}</span>
                                                                <span className='right-icon'><FontAwesomeIcon icon={faCaretRight}/></span>
                                                            </li>)
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </CSSTransition>
                                    <CSSTransition
                                    in={state.meal}
                                    unmountOnExit
                                    timeout={500}
                                    classNames='menu-secondary'
                                    >
                                        <div className='meal-menu'>
                                            <div onClick={()=>dispatch({type: 'back',payload: 'food'})}>
                                                <span><FontAwesomeIcon icon={faArrowLeft} /></span>
                                                <b>Yemək çeşidləri</b>
                                            </div>
                                            <ul>
                                                {
                                                    Object.keys(api.food.meal).map((el,index)=>{
                                                        return (
                                                            <li onClick={()=>dispatch({type: 'secondary',payload: el})} key={index}>
                                                                <span className=''>{el}</span>
                                                                <span className='right-icon'><FontAwesomeIcon icon={faCaretRight}/></span>
                                                            </li>)
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </CSSTransition>
                                    <CSSTransition
                                    in={state.salad}
                                    unmountOnExit
                                    timeout={500}
                                    classNames='menu-secondary'
                                    >
                                        <div className='meal-menu'>
                                            <div onClick={()=>dispatch({type: 'back',payload: 'meal'})}>
                                                <span><FontAwesomeIcon icon={faArrowLeft} /></span>
                                                <b>Salatlar</b>
                                            </div>
                                            <ul>
                                                {
                                                    Object.values(api.food.meal.salad).map((el,index)=>{
                                                        return (
                                                            <li onClick={()=>getFoodValue({type: 'final', payload: 'food'},el)} key={index}>
                                                                <span className=''>{el[0]}</span>
                                                            </li>)
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </CSSTransition>
                                    <CSSTransition
                                    in={state.dinner}
                                    unmountOnExit
                                    timeout={500}
                                    classNames='menu-secondary'
                                    >
                                        <div className='meal-menu'>
                                            <div onClick={()=>dispatch({type: 'back',payload: 'food'})}>
                                                <span><FontAwesomeIcon icon={faArrowLeft} /></span>
                                                <b>Yeməklər</b>
                                            </div>
                                            <ul>
                                                {
                                                    Object.values(api.food.meal.dinner).map((el,index)=>{
                                                        return (
                                                            <li onClick={()=>getFoodValue({type: 'final', payload: 'food'},el)} key={index}>
                                                                <span className=''>{el[0]}</span>
                                                            </li>)
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </CSSTransition>
                                    <CSSTransition
                                    in={state.drink}
                                    unmountOnExit
                                    timeout={500}
                                    classNames='menu-secondary'
                                    >
                                        <div className='drink-menu'>
                                            <div onClick={()=>dispatch({type: 'back',payload: 'food'})}>
                                                <span><FontAwesomeIcon icon={faArrowLeft} /></span>
                                                <b>İçkilər</b>
                                            </div>
                                            <ul>
                                                {
                                                    Object.keys(api.food.drink).map((el,index)=>{
                                                        return (
                                                            <li onClick={()=>dispatch({type: 'secondary',payload: el})} key={index}>
                                                                <span className=''>{el}</span>
                                                                <span className='right-icon'><FontAwesomeIcon icon={faCaretRight}/></span>
                                                            </li>)
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </CSSTransition>
                                    <CSSTransition
                                    in={state.alcoholic}
                                    unmountOnExit
                                    timeout={500}
                                    classNames='menu-secondary'
                                    >
                                        <div className='meal-menu'>
                                            <div onClick={()=>dispatch({type: 'back',payload: 'drink'})}>
                                                <span><FontAwesomeIcon icon={faArrowLeft} /></span>
                                                <b>Spirtli içkilər</b>
                                            </div>
                                            <ul>
                                                {
                                                    Object.values(api.food.drink.alcoholic).map((el,index)=>{
                                                        return (
                                                            <li onClick={()=>getFoodValue({type: 'final', payload: 'food'},el)} key={index}>
                                                                <span className=''>{el}</span>
                                                            </li>)
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </CSSTransition>
                                    <CSSTransition
                                    in={state.non_alcoholic}
                                    unmountOnExit
                                    timeout={500}
                                    classNames='menu-secondary'
                                    >
                                        <div className='meal-menu'>
                                            <div onClick={()=>dispatch({type: 'back',payload: 'drink'})}>
                                                <span><FontAwesomeIcon icon={faArrowLeft} /></span>
                                                <b>Spirtsiz içkilər</b>
                                            </div>
                                            <ul>
                                                {
                                                    Object.values(api.food.drink.non_alcoholic).map((el,index)=>{
                                                        return (
                                                            <li onClick={()=>getFoodValue({type: 'final', payload: 'food'},el)} key={index}>
                                                                <span className=''>{el}</span>
                                                            </li>)
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </CSSTransition>
                                </div>
                        </div>
                        <div className='pricing'>
                            <div className='amount-group'>
                                <label>Miqdar</label>
                                <input
                                type={'text'}
                                />
                            </div>
                            <div className='price-group'>
                                <span>Qiymət</span>
                                <span>0</span>
                            </div>
                        </div>
                        <div className='include'>
                            <button>Əlavə et</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='display-order'>

            </div>
        </section>
    )
}

export default MakeOrder