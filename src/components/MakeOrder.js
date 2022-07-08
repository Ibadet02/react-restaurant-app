import '../styles/makeOrder.scss'
import { useState } from 'react'
import { CSSTransition } from 'react-transition-group';
const MakeOrder = ({api}) =>{
    const [open, setOpen] = useState({
        table: false,
        servant: false,
        food: false
    })
    const handleDropDown = (e) =>{
        setOpen((prev)=>{
            return {
                table: false,
                servant: false,
                food: false,
                [e]: !open[e]
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
                            type={'text'}
                            onClick={()=>handleDropDown('table')}
                            />
                            <CSSTransition
                            in={open.table}
                            unmountOnExit
                            timeout={500}
                            classNames='menu-primary'
                            >
                                <div className={`dropdown dropdown--table ${open.table && 'active'}`}>

                                </div>
                            </CSSTransition>
                        </div>
                        <div className='servant-group'>
                            <label>Xidmət edəcək şəxs</label>
                            <input
                            type={'text'}
                            onClick={()=>handleDropDown('servant')}
                            />
                            <CSSTransition
                            in={open.servant}
                            unmountOnExit
                            timeout={500}
                            classNames='menu-primary'
                            >
                                <div className={`dropdown dropdown--servant ${open.servant && 'active'}`}>

                                </div>
                            </CSSTransition>
                        </div>
                        <div className='create-button'>
                            <button>Sifarişi yarat</button>
                        </div>
                    </div>
                    <div className='card select-food'>
                        <div className='food-group'>
                            <label>Məhsul adı</label>
                            <input
                            type={'text'}
                            onClick={()=>handleDropDown('food')}
                            />
                            <CSSTransition
                            in={open.food}
                            unmountOnExit
                            timeout={500}
                            classNames='menu-primary'
                            >
                                <div className={`dropdown dropdown--food ${open.food && 'active'}`}>

                                </div>
                            </CSSTransition>
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