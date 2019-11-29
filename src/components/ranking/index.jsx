import React, {Component} from 'react';
import './style.scss';



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

    // compareRatings = (a, b) => {
    //     return a - b
    // }
    // sort(el => el.rating - el.rating)

    //
    // counter = () => {
    //     this.state.games.forEach()
    // }



    render() {
        console.log(this.state.games)
        console.log(this.state.note)
        return (
            <>
                <div className="landing__img">
                    <div className="ranking__div__on__landing__img">
                <h1>Ranking:</h1>
                        <table>
                            <thead>
                            <tr>
                                <td>Rank</td>
                                <td>Title</td>
                                <td>Current Rating</td>
                                <td>Change Rating</td>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.games.sort((a,b)=> b.rating - a.rating).map((game,index) => (
                                    <>

                            <tr key={game.id}>
                                <td>{index + 1}</td>
                                <td>{game.title}</td>
                                <td>{game.rating}</td>
                                <td>
                                    <select name="note" id="" onChange={(e)=>this.onNoteSelectChange(game.id,e.target.value)}>
                                        <option></option>
                                        <option value="10">10</option>
                                        <option value="9">9</option>
                                        <option value="8">8</option>
                                        <option value="7">7</option>
                                        <option value="6">6</option>
                                        <option value="6">6</option>
                                        <option value="5">5</option>
                                        <option value="4">4</option>
                                        <option value="3">3</option>
                                        <option value="2">2</option>
                                        <option value="1">1</option>
                                        <option value="0">0</option>
                                    </select></td>
                            </tr>
                            </>
                            )
                            )
                            }

                            </tbody>

                        </table>
                        </div>
                </div>



            </>

        )
    }


}

export default Ranking;