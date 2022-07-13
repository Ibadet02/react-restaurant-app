import React from "react";
import '../styles/orderInfo.scss'
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
const OrderInfo = ({orderInfo, endOrder, deleteOrder}) =>{
    return (
        <section className="order-infos">
            <div className="order-infos__flex">
            {
                orderInfo.map((el,index)=>{
                    return (
                    el.locked ?
                    <CSSTransition
                    key={index}
                    in={true}
                    unmountOnExit
                    timeout={800}
                    classNames='order-info-animate'
                    >
                        <div className='order-info'>
                            <div className="order-info__flex">
                                <div className="order-info__flex--middle">
                                    <button
                                    className="delete"
                                    onClick={()=>deleteOrder(index)}
                                    ><FontAwesomeIcon icon={faTrash} /></button>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Say</th>
                                                <th>Məhsul Adı</th>
                                                <th>Miqdar</th>
                                                <th>Məbləğ</th>
                                                <th>Sifariş Saatı</th>
                                                <th>Gözləmə</th>
                                                <th>#</th>
                                                <th>Geri</th>
                                            </tr>
                                    {
                                        el.food.map((f,i)=>{
                                            return (
                                                <CSSTransition
                                                key={i}
                                                in={f ? true : false}
                                                unmountOnExit
                                                timeout={800}
                                                classNames='food-info-animate'
                                                >
                                                    <tr>
                                                        <td style={{backgroundColor: i % 2 === 0 ? '#ddd' : 'ccc'}}>{i + 1}</td>
                                                        <td style={{backgroundColor: i % 2 === 0 ? '#ddd' : 'ccc'}}>{f.name}</td>
                                                        <td style={{backgroundColor: i % 2 === 0 ? '#ddd' : 'ccc'}}>{f.amount}</td>
                                                        <td style={{backgroundColor: i % 2 === 0 ? '#ddd' : 'ccc'}}>{Number(f.price)*Number(f.amount)} AZN</td>
                                                        <td style={{backgroundColor: i % 2 === 0 ? '#ddd' : 'ccc'}}>15:49</td>
                                                        <td style={{backgroundColor: i % 2 === 0 ? '#ddd' : 'ccc'}}>0 dəq</td>
                                                        <td style={{backgroundColor: i % 2 === 0 ? '#ddd' : 'ccc'}}><button>verildi</button></td>
                                                        <td style={{backgroundColor: i % 2 === 0 ? '#ddd' : 'ccc'}}><button>geri al</button></td>
                                                    </tr>
                                                </CSSTransition>
                                            )
                                        })
                                    }
                                    <tr className="sum">
                                        <td colSpan={6}>
                                            Cəmi məbləğ: {el.food.length>0 && <span>{el.food.map(el=>Number(el.price) * Number(el.amount)).reduce((a,c)=>a+c)} AZN</span>}
                                        </td>
                                        <td className="td-end" colSpan={2}>
                                            <button
                                            className={`end ${el.ended ? 'disabled' : ''}`}
                                            disabled = {el.ended}
                                            onClick={()=>endOrder(index)}
                                            >{el.ended ? 'Sonlanıb' : 'Sonlandır'}</button>
                                        </td>
                                    </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* <div className="order-info__flex--bottom">
                                    <button
                                    disabled = {el.ended}
                                    onClick={()=>endOrder(index)}
                                    >{el.ended ? 'Sonlanıb' : 'Sonlandır'}</button>
                                </div> */}
                            </div>
                        </div>
                    </CSSTransition>
                    : null)
                }).reverse()
            }
            </div>
        </section>
    )
}
export default OrderInfo