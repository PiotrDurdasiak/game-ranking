import React, {Component} from 'react';


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
        console.log(this.state.games)
        return (
            <div>
                <ul>
                    {this.state.games.map(game => (
                            <>
                                <li>
                                    <div><h2>{game.title}</h2></div>
                                    <div>Autor: {game.designer}</div>
                                    <div>Wydawca: {game.publishers}</div>
                                    <div>Moja Ocena: 5/6</div>
                                </li>
                            </>
                        )
                    )}

                </ul>
            </div>
        )
    }


}

export default ListOfGames;
