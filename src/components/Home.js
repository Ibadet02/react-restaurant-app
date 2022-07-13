import '../styles/home.scss'

const Home = ({orderInfo}) =>{
    return (
        <section className="home">
            <div className="home__flex">
                <div className='daily-result'>
                    <div className='ended-orders'>
                        {
                            orderInfo.length === 0 ? 'Hələlik, Sonlandırılan sifariş yoxdur' : orderInfo.filter(el=>el.ended).length === 0 ? 'Hələlik, Sonlandırılan sifariş yoxdur' : `${orderInfo.filter(el=>el.ended).length} ədəd sifariş sonlandırılıb`
                        }
                    </div>
                    <div className='income'>
                        {
                            orderInfo.length === 0 ? 'Hələlik, kassada pul yoxdur' : orderInfo.filter(el=>el.ended).length === 0 ? 'Hələlik, kassada pul yoxdur' : `Kassada ${orderInfo.filter(el=>el.ended).map((el, i)=>el.food.map(el=>Number(el.price) * Number(el.amount)).reduce((a,b)=>a+b)).reduce((a,b)=>a+b)} manat var`
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home