import { faHand } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'
import '../styles/orders.scss'
const Orders = ({orderInfo}) =>{
    const outerDiv = useRef(null)
    const xButton = useRef(null)
    const [isWindowOpen, setIsWindowOpen] = useState({
        isOpen: false,

    })
    const handleState = el =>{
        setIsWindowOpen(prev=>{
            return {
                isOpen: true,
                ...el
            }
        })
    }
    useState(()=>{
        window.addEventListener('click',(event)=>{
            if(event.target === xButton.current || event.target === outerDiv.current){
                setIsWindowOpen(prev=>{
                    return {
                        ...prev,
                        isOpen: false
                    }
                })
            }
        })
    })
    return (
        <section className='orders'>
            <div className="orders__flex">
                {orderInfo[0].locked ?
                <table>
                    <tbody>
                        <tr>
                            <th>Say</th>
                            <th>Masa</th>
                            <th>Ofisiant</th>
                            <th>Status</th>
                            <th>Ödəniş</th>
                            <th>Sifariş Saatı</th>
                            <th>Ətraflı</th>
                        </tr>
                        {
                            orderInfo.map(e=>e).reverse().filter((el, index)=>el.tableName != '').map((el,index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{el.tableName}</td>
                                        <td>{el.servantName}</td>
                                        <td>{el.ended ? 'Sonlanıb' : 'Sonlanmayıb'}</td>
                                        <td>{el.food.length>0 && <span>{el.food.map(el=>Number(el.price) * Number(el.amount)).reduce((a,c)=>a+c)} AZN</span>}</td>
                                        <td>{el.ended ? '15:49' : '_'}</td>
                                        <td><button
                                        onClick={()=>handleState(el)}
                                        >bax</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> :
                'Sifariş Yoxdur'
                }
            </div>
            <div ref={outerDiv} className={`more-info ${isWindowOpen.isOpen ? 'open' : 'closed'}`}>
                <div className="more-info__flex">
                    <button ref={xButton} className='exit'>X</button>
                    <div className='table'>Masa-{isWindowOpen.tableName}</div>
                    <div className='servant'>Ofisiant-{isWindowOpen.servantName}</div>
                        <div className='food'>
                            {
                                isWindowOpen.food ?
                                isWindowOpen.food.map((el, index)=>{
                                    return (
                                        <div key={index}>
                                            <div className='food-name'>Ərzaq-{el.name}</div>
                                            <div className='food-amount'>Miqdar-{el.amount}</div>
                                            <div className='food-price'>Məbləğ-{el.price}</div>
                                            <div className='order-time'>Sifariş Saatı-{el.orderTime}</div>
                                            <div className='waiting'>Gözləmə müddəti-{el.wait}</div>
                                        </div>
                                    )
                                })
                                :
                                null
                            }
                        </div>
                    <div className='ended'>{isWindowOpen.ended}</div>
                </div>
            </div>
        </section>
    )
}

export default Orders