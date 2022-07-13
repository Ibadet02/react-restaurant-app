import '../styles/makeOrder.scss'
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import OrderInfo from './OrderInfo';

const MakeOrder = ({api, handleInput, tableBack, getTableValue, getServantValue, getFoodValue, state, inputValue, tableRef, servantRef, foodRef, dispatch, createOrder, orderInfo, addOrder, amountRef, onlyNumbers, editFirstSlide, endOrder, deleteOrder}) =>{
    return (
        <section className="makeorder">
            <div className='makeorder__flex'>
                <div className='order-details'>
                    <form>
                        <CSSTransition
                        in={orderInfo[orderInfo.length-1].currentStep === 1}
                        unmountOnExit
                        timeout={800}
                        classNames='card1'
                        >
                            <div className={`card create-order`}>
                                <h2 className='card__name'>Sifarişi yaradın</h2>
                                <div className='table-group'>
                                    <label>Sifarişin aid olduğu masa</label>
                                    <input
                                    placeholder='Masa'
                                    required
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
                                                <div className='menu'>
                                                    <div className='menu__name'>
                                                        <b>Masa Qrupu</b>
                                                    </div>
                                                    <ul>
                                                    {
                                                        Object.keys(api.table).map((el, index)=>{
                                                            return (
                                                            <li
                                                            className='select-arrow'
                                                            onClick={()=>getTableValue({type: 'secondary', payload:'tableNumber'},el)}
                                                            key={index}
                                                            >
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
                                                <div className='menu'>
                                                    <div className='menu__name--back'>
                                                        <span onClick={()=>tableBack({type: 'back', payload: 'table'})}><FontAwesomeIcon icon={faArrowLeft} /></span>
                                                        <b>Masa Nömrəsi</b>
                                                    </div>
                                                    <ul>
                                                    {
                                                        api.table.A.map((el, index)=>{
                                                            return (
                                                            <li
                                                            className='select'
                                                            onClick={()=>getTableValue({type: 'final', payload: 'table'},el)}
                                                            key={index}>
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
                                    placeholder='Ofisiant'
                                    required
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
                                                <div className='menu'>
                                                    <div className='menu__name'>
                                                        <b>Servant names</b>
                                                    </div>
                                                    <ul>
                                                        {
                                                            api.servant.map((el,index)=>{
                                                                return (
                                                                    <li
                                                                    className='select'
                                                                    onClick={()=>getServantValue({type: 'final', payload: 'servant'},el)}
                                                                    key={index}>
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
                                    <button onClick={(event)=>createOrder(event)}>Sifarişi Yarat</button>
                                </div>
                            </div>
                        </CSSTransition>
                        <CSSTransition
                        in={orderInfo[orderInfo.length-1].currentStep === 2}
                        unmountOnExit
                        timeout={800}
                        classNames='card2'
                        >
                            <div className={`card select-food`}>
                                <div className='food-group'>
                                    <label>Məhsul adı</label>
                                    <input
                                    required
                                    placeholder='Yemək/İçki'
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
                                                <div className='menu'>
                                                    <div className='menu__name'>
                                                        <b>Yemək menusu</b>
                                                    </div>
                                                    <ul>
                                                        {
                                                            Object.keys(api.food).map((el,index)=>{
                                                                return (
                                                                    <li
                                                                    className='select-arrow'
                                                                    onClick={()=>dispatch({type: 'secondary',payload: el})}
                                                                    key={index}>
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
                                                <div className='menu'>
                                                    <div className='menu__name--back'>
                                                        <span 
                                                        onClick={()=>dispatch({type: 'back',payload: 'food'})}
                                                        >
                                                            <FontAwesomeIcon icon={faArrowLeft} />
                                                        </span>
                                                        <b>Yemək çeşidləri</b>
                                                    </div>
                                                    <ul>
                                                        {
                                                            Object.keys(api.food.meal).map((el,index)=>{
                                                                return (
                                                                    <li
                                                                    className='select-arrow'
                                                                    onClick={()=>dispatch({type: 'secondary',payload: el})}
                                                                    key={index}>
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
                                                <div className='menu'>
                                                    <div className='menu__name--back'>
                                                        <span
                                                        onClick={()=>dispatch({type: 'back',payload: 'meal'})}
                                                        ><FontAwesomeIcon icon={faArrowLeft} /></span>
                                                        <b>Salatlar</b>
                                                    </div>
                                                    <ul>
                                                        {
                                                            Object.values(api.food.meal.salad).map((el,index)=>{
                                                                return (
                                                                    <li
                                                                    className='select'
                                                                    onClick={()=>getFoodValue({type: 'final', payload: 'food'},el)}
                                                                    key={index}>
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
                                                <div className='menu'>
                                                    <div className='menu__name--back'>
                                                        <span
                                                        onClick={()=>dispatch({type: 'back',payload: 'food'})}
                                                        ><FontAwesomeIcon icon={faArrowLeft} /></span>
                                                        <b>Yeməklər</b>
                                                    </div>
                                                    <ul>
                                                        {
                                                            Object.values(api.food.meal.dinner).map((el,index)=>{
                                                                return (
                                                                    <li
                                                                    className='select'
                                                                    onClick={()=>getFoodValue({type: 'final', payload: 'food'},el)}
                                                                    key={index}>
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
                                                <div className='menu'>
                                                    <div className='menu__name--back'>
                                                        <span
                                                        onClick={()=>dispatch({type: 'back',payload: 'food'})}
                                                        ><FontAwesomeIcon icon={faArrowLeft} /></span>
                                                        <b>İçkilər</b>
                                                    </div>
                                                    <ul>
                                                        {
                                                            Object.keys(api.food.drink).map((el,index)=>{
                                                                return (
                                                                    <li
                                                                    className='select-arrow'
                                                                    onClick={()=>dispatch({type: 'secondary',payload: el})}
                                                                    key={index}>
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
                                                <div className='menu'>
                                                    <div className='menu__name--back'>
                                                        <span
                                                        onClick={()=>dispatch({type: 'back',payload: 'drink'})}
                                                        ><FontAwesomeIcon icon={faArrowLeft} /></span>
                                                        <b>Spirtli içkilər</b>
                                                    </div>
                                                    <ul>
                                                        {
                                                            Object.values(api.food.drink.alcoholic).map((el,index)=>{
                                                                return (
                                                                    <li
                                                                    className='select'
                                                                    onClick={()=>getFoodValue({type: 'final', payload: 'food'},el)}
                                                                    key={index}>
                                                                        <span className=''>{el[0]}</span>
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
                                                <div className='menu'>
                                                    <div className='menu__name--back'>
                                                        <span
                                                        onClick={()=>dispatch({type: 'back',payload: 'drink'})}
                                                        ><FontAwesomeIcon icon={faArrowLeft} /></span>
                                                        <b>Spirtsiz içkilər</b>
                                                    </div>
                                                    <ul>
                                                        {
                                                            Object.values(api.food.drink.non_alcoholic).map((el,index)=>{
                                                                return (
                                                                    <li
                                                                    className='select'
                                                                    onClick={()=>getFoodValue({type: 'final', payload: 'food'},el)}
                                                                    key={index}>
                                                                        <span className=''>{el[0]}</span>
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
                                        required
                                        ref={amountRef}
                                        type={'text'}
                                        onChange = {(event)=>onlyNumbers(event)}
                                        value={inputValue.amount}
                                        />
                                    </div>
                                    <div className='price-group'>
                                        <span>Qiymət: </span>
                                        <span>{Number(inputValue.food.foodPrice)*Number(inputValue.amount)} AZN</span>
                                    </div>
                                </div>
                                <div className='include'>
                                    <button
                                    disabled = {orderInfo[orderInfo.length - 1].locked}
                                    className={`edit ${orderInfo[orderInfo.length-1].locked && 'disabled'}`}
                                    onClick={(event)=>editFirstSlide(event)}
                                    ><FontAwesomeIcon icon={faArrowLeft}/>Düzəliş et</button>
                                    <button className='add' onClick={(event)=>addOrder(event)}>Əlavə et</button>
                                </div>
                            </div>
                        </CSSTransition>
                    </form>
                </div>
                <div className='display-order'>
                    <OrderInfo
                    orderInfo = {orderInfo}
                    endOrder = {endOrder}
                    deleteOrder = {deleteOrder}
                    />
                </div>
            </div>
        </section>
    )
}

export default MakeOrder