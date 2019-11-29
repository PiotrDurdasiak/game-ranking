import React from 'react';
import Pawn from './noun_Meeple_1269.svg';
import LandingImg from './1_fcOemY1xrwLcWUnX8l8g8Q.jpeg';
import './style.scss';
import {Link} from 'react-router-dom';




const styleLink = {
    textDecoration: 'none',
    color: 'white',
    fontSize: '1.5em'
}

const styleImg = {
    height: '60px',
    width: '50px',
    margin: '20px'
};


const Header  = () => {
    return(
        <div className="menu__container">
            <Link to="/">
                <img style={styleImg} src={Pawn} alt="pawn"/>
            </Link>
            <ul className="main__nav__ul">
                <li className="menu_element__li"><Link style={styleLink}>About me</Link></li>
                <li className="menu_element__li"><Link style={styleLink} to="/myGames">My games</Link></li>
                <li className="menu_element__li"><Link style={styleLink} to="/myRanking">Ranking</Link></li>
                <li className="menu_element__li"><Link style={styleLink}>Add new game</Link></li>
            </ul>
        </div>
    )
};


export const LandingPicture = () => {
    return(
        <div className="landing__img">
            <div className="div__on__landing__img"> <h2 className="welcome__banner">Welcome to</h2> <h2 className="welcome__banner">Durdasiak's Board Games</h2> </div>
        </div>
    )
}



export default Header;