import React from 'react';
import Pawn from './pawn.png';
import LandingImg from './1_fcOemY1xrwLcWUnX8l8g8Q.jpeg';
import './style.scss';
import {Link} from 'react-router-dom';


const styleLi = {
    display: 'inline-block',
    padding: '10px',
    listStyleType: 'none',
    textDecoration: 'none',
    borderRadius: ' 20px',
    border: ' 1px gray solid',
    backgroundColor: 'pink',
    color: 'white',
    marginRight: '20px'
};

const styleImg = {
    height: '30px',
    width: '25px',
    margin: '20px'
};

const styleDiv = {
    backgroundColor: 'blue'
}


const Header  = () => {
    return(
        <div style={styleDiv}>
            <a href={"/"}>
                <img style={styleImg} src={Pawn} alt="pawn"/>
            </a>
            <ul style={{float: 'right', margin: '20px 20px 0 0'}}>
                <li style={styleLi}>About me</li>
                <li style={styleLi}><Link to="/myGames">My games</Link></li>
                <li style={styleLi}><Link to="/myRanking">Ranking</Link></li>
                <li style={styleLi}>Shop</li>
            </ul>
        </div>
    )
};


export const LandingPicture = () => {
    return(
        <img src={LandingImg} className="landing__img" alt="scythe picture"/>
    )
}



export default Header;