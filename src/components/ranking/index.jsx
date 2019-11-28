import React, {Component} from 'react';


class Ranking extends Component {
    state= {
        games:[],
        id:'',
        note: ''
    }

    componentDidMount() {
        this.fetchGames()

    }

    fetchGames = () => {
        const URL_ADDRESS = 'http://localhost:3003/games';
        fetch(URL_ADDRESS)
            .then(data=> data.json())
            .then( element => this.setState({ games: element}))
    };

    onNoteSelectChange = (id,value) => {
        const addRating = {
            rating:value
        };
        this.setState({
            note:value
        })

        const URL_ADDRESS = `http://localhost:3003/games/${id}`;
        fetch(URL_ADDRESS, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(addRating)
        })
            .then(() => this.fetchGames());
    };







        // this.setState({
        //     [e.target.name]: e.target.value
        // })

    render() {
        console.log(this.state.games)
        console.log(this.state.note)
        return (
            <>Oceń grę:
                        <table>
                            <thead>
                            <tr>
                                <td>Rank</td>
                                <td>Title</td>
                                <td>Current Rating</td>
                                <td>Your Note</td>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.games.sort(a=>a.game.rating>a.game.rating).map(game => (
                                    <>

                            <tr key={game.id}>
                                <td>${}</td>
                                <td>{game.title}</td>
                                <td>{game.rating}</td>
                                <td>
                                    <select name="note" id="" onChange={(e)=>this.onNoteSelectChange(game.id,e.target.value)}>
                                        <option></option>
                                        <option value="6">6</option>
                                        <option value="5">5</option>
                                        <option value="4">4</option>
                                        <option value="3">3</option>
                                        <option value="2">2</option>
                                        <option value="1">1</option>
                                    </select></td>
                            </tr>
                            </>
                            )
                            )
                            }
                            </tbody>

                        </table>




            </>

        )
    }


}

export default Ranking;