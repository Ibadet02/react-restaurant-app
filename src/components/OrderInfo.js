import React from "react";

const OrderInfo = ({orderInfo}) =>{
    return (
        <section className="order-infos">
            <div className="order-infos__flex">
            {
                orderInfo.reverse().map((el,index)=>{
                    return (
                    <div key={Date.now()} className='order-info'>

                    </div>)
                })
            }
            </div>
        </section>
    )
}

export default OrderInfo