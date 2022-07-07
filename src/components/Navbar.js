import '../styles/navbar.scss'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faArrowsUpDown, faPlus, faCircleInfo, faComment } from '@fortawesome/free-solid-svg-icons'
const Navbar = () =>{

    const activeLinkStyle = ({isActive}) =>{
        return isActive ?
        {
            color: 'rgb(0,71,124)',
        }:
        {}
    }

    return (
        <nav className='navbar'>
            <div className='navbar__flex'>
                <div className='navbar__flex__logo'>
                    LOGO
                </div>
                <div className='navbar__flex__links'>
                    <div className='tool'>
                        <h3>Alətlər</h3>
                        <div className='tool__links'>
                            <div className='tool__links__link tool__links__home'>
                                <NavLink style={activeLinkStyle} to={'/'}>
                                    <span className='icon home-icon'>
                                        <FontAwesomeIcon icon={faHome} />
                                    </span>
                                    <span className='link-text'>Ana səhifə</span>
                                </NavLink>
                                <div className='link-border'></div>
                            </div>
                            <div className='tool__links__link tool__links__orders'>
                                <NavLink style={activeLinkStyle} to={'/sifarisler'}>
                                    <span className='icon order-icon'>
                                        <FontAwesomeIcon icon={faArrowsUpDown} />
                                    </span>
                                    <span className='link-text'>Sifarişlər</span>
                                </NavLink>
                                <div className='link-border'></div>
                            </div>
                            <div className='tool__links__link tool__links__make-order'>
                                <NavLink style={activeLinkStyle} to={'/sifarisver'}>
                                    <span className='icon make-order-icon'>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </span>
                                    <span className='link-text'>Sifariş ver</span>
                                </NavLink>
                                <div className='link-border'></div>
                            </div>
                        </div>
                    </div>
                    <div className='support'>
                        <h3>Dəstək</h3>
                        <div className='support__links'>
                            <div className='support__links__link support__links__help'>
                                <NavLink style={activeLinkStyle} to={'/komek'}>
                                    <span className='icon help-icon'>
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    </span>
                                    <span className='link-text'>Kömək</span>
                                </NavLink>
                                <div className='link-border'></div>
                            </div>
                            <div className='support__links__link support__links__feedback'>
                                <NavLink style={activeLinkStyle} to={'/rey'}>
                                    <span className='icon feedback-icon'>
                                        <FontAwesomeIcon icon={faComment} />
                                    </span>
                                    <span className='link-text'>Rəy</span>
                                </NavLink>
                                <div className='link-border'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar