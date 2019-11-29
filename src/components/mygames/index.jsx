import React, {Component} from 'react';
import './style.scss';



class ListOfGames extends Component {
    state= {
        games:[]
    }

    componentDidMount() {
        const URL_ADDRESS = 'http://localhost:3003/games';
        fetch(URL_ADDRESS)
            .then(data=> data.json())
            .then( element => this.setState({ games: element}))

    }



    render() {
        return (
            <div>
                <div className="landing__img">
                    <div className="mygames__div__on__landing__img">
                <ul className="mygames__list__ul">
                    {this.state.games.map(game => (
                            <>
                                <li className="mygames__element__li">
                                    <div>
                                    <div><h2>{game.title}</h2></div>
                                    <div>Designer: {game.designer}</div>
                                    <div>Publisher: {game.publishers}</div>
                                    <div>{game.rating}/10</div>
                                    </div>
                                </li>
                            </>
                        )
                    )}

                </ul>
                    </div>
                </div>
            </div>
        )
    }


}

export default ListOfGames;
