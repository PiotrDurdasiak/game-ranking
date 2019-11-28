import React, {Component} from "react";
import "./style.scss";
import uniqid from 'uniqid';
class MainForm extends Component  {
    state = {
        guest : [],
        id: '',
        surname: '',
        name: '',
        country: '',
        city: '',
        street: '',
        arrive: '',
        departure: '',
        days:'',
        notes: '',
        searchGuests: [],
        searchNameGuests: [],
        searchCountryGuests: [],
        nonPolandNbr: 0
    };
    componentDidMount() {
        this.fetchGuests();
    }
    fetchGuests = () => {
        const URL_ADDRESS = 'http://localhost:3000/guests';
        fetch(URL_ADDRESS)
            .then(data => data.json())
            .then(guest => this.setState({ guest }))
    };
    onInputChange = e => {
        this.setState({
            [ e.target.name]: e.target.value
        });
        const nonPoland = this.state.guest.filter( el => el.country !== 'Polska');
        this.setState({
            nonPolandNbr: nonPoland.length
        })
    };
    onButtonClick = (e)=> {
        e.preventDefault();
        const date1 = new Date(this.state.arrive);
        const date2 = new Date(this.state.departure);
        const Difference_In_Time = date2.getTime() - date1.getTime();
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        const addGuest = {
            id: uniqid(),
            surname: this.state.surname,
            name: this.state.name,
            country: this.state.country,
            city: this.state.city,
            street: this.state.street,
            arrive: this.state.arrive,
            departure: this.state.departure,
            days: Difference_In_Days,
            notes: this.state.notes
        };
        this.setState( {
            guest: [...this.state.guest, addGuest],
            id: '',
            surname: '',
            name: '',
            country: '',
            city: '',
            street: '',
            arrive: '',
            departure: '',
            days:'',
            notes: ''
        });
        const URL_ADDRESS = `http://localhost:3000/guests`;
        fetch(URL_ADDRESS, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(addGuest)
        })
            .then(() => this.fetchGuests());
    };
    onButtonSearchClick = (e) => {
        e.preventDefault();
        const filteredGuests = this.state.guest.filter( el => el.surname === this.state.surname);
        this.setState({
            searchGuests : filteredGuests,
            surname: ''
        });
        const filteredNameGuests = this.state.guest.filter( el=> el.name === this.state.name);
        this.setState({
            searchNameGuests : filteredNameGuests,
            name: ''
        });
        const filteredCountryGuests = this.state.guest.filter( el=> el.country === this.state.country);
        this.setState({
            searchCountryGuests : filteredCountryGuests,
            country: ''
        });
    };
    onGuestDelete = id => {
        const URL_ADDRESS = `http://localhost:3000/guests/${id}`;
        fetch(URL_ADDRESS, { method: 'delete' })
            .then(() => this.fetchGuests());
        this.setState({
            searchGuests : [],
            searchNameGuests : [],
            searchCountryGuests: []
        })
    };
    onGuestEdit = id => {
        const URL_ADDRESS = `http://localhost:3000/guests/${id}`;
        fetch(URL_ADDRESS)
            .then(data => data.json())
            .then(data => this.setState({
                surname: data.surname,
                name: data.name,
                country: data.country,
                city: data.city,
                street: data.street,
                arrive: data.arrive,
                departure: data.departure,
                notes: data.notes
            })).then(() => this.onGuestDelete(id));
    };
    render() {
        const {surname, name, country, city, street, arrive, departure, days, guest, notes ,searchGuests, searchNameGuests, searchCountryGuests} = this.state;
        return (
            <>
                <div className="container">
                    <div className="logo">
                    </div>
                    <h1> Rejestracja Gości </h1>
                    <p> Ilość gości w bazie : {guest.length}</p>
                    <p> {this.state.nonPolandNbr !==0 ? `Ilość zagranicznych gości w bazie : ${this.state.nonPolandNbr}`: null}</p>
                    <form className="form">
                        <input onChange={this.onInputChange} type="text" name="surname" value={surname} placeholder="Nazwisko"/>
                        <input onChange={this.onInputChange} type="text" name="name" value={name} placeholder="Imię"/>
                        <input onChange={this.onInputChange} type="text" name="country" value={country} placeholder="Kraj pochodzenia"/>
                        <input onChange={this.onInputChange} type="text" name="city" value={city} placeholder="Miasto"/>
                        <input onChange={this.onInputChange} type="text" name="street" value={street} placeholder="Ulica"/>
                        <input onChange={this.onInputChange} type="date" name="arrive" value={arrive} placeholder="Data przyjazdu : "/>
                        <input onChange={this.onInputChange} type="date" name="departure" value={departure} placeholder="Data wyjazdu : "/>
                        <input onChange={this.onInputChange} type="textarea" name="notes" value={notes} placeholder="Uwagi"/>
                    </form>
                    <div className="buttons">
                        <button onClick={this.onButtonSearchClick} className='btn search' name="szukaj"> Szukaj </button>
                        <button onClick={this.onButtonClick} className='btn add' name="dodaj"> Dodaj</button>
                    </div>
                </div>
                <table className="zui-table">
                    <tbody>
                    {searchCountryGuests.map(searchCountryGuests => (
                        <tr key={searchCountryGuests.id}>
                            <td>{searchCountryGuests.surname}</td>
                            <td>{searchCountryGuests.name}</td>
                            <td>{searchCountryGuests.city}</td>
                            <td>{searchCountryGuests.street}</td>
                            <td>{searchCountryGuests.country}</td>
                            <td>{searchCountryGuests.arrive}</td>
                            <td>{searchCountryGuests.departure}</td>
                            <td>{searchCountryGuests.days}</td>
                            <td>{searchCountryGuests.notes}</td>
                            <td style={{backgroundColor: 'red', color: 'white', textShadow: 'none'}} onClick={this.onGuestEdit.bind(this, searchCountryGuests.id)}> Edytuj </td>
                            <td style={{backgroundColor: 'red', color: 'white', textShadow: 'none'}} onClick={this.onGuestDelete.bind(this, searchCountryGuests.id)}> Usuń </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <table className="zui-table">
                    <tbody>
                    {searchNameGuests.map(searchNameGuests => (
                        <tr key={searchNameGuests.id}>
                            <td>{searchNameGuests.surname}</td>
                            <td>{searchNameGuests.name}</td>
                            <td>{searchNameGuests.city}</td>
                            <td>{searchNameGuests.street}</td>
                            <td>{searchNameGuests.country}</td>
                            <td>{searchNameGuests.arrive}</td>
                            <td>{searchNameGuests.departure}</td>
                            <td>{searchNameGuests.days}</td>
                            <td>{searchNameGuests.notes}</td>
                            <td style={{backgroundColor: 'red', color: 'white', textShadow: 'none'}} onClick={this.onGuestEdit.bind(this, searchNameGuests.id)}> Edytuj </td>
                            <td style={{backgroundColor: 'red', color: 'white', textShadow: 'none'}} onClick={this.onGuestDelete.bind(this, searchNameGuests.id)}> Usuń </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <table className="zui-table">
                    <tbody>
                    {searchGuests.map(searchGuests => (
                        <tr key={searchGuests.id}>
                            <td>{searchGuests.surname}</td>
                            <td>{searchGuests.name}</td>
                            <td>{searchGuests.city}</td>
                            <td>{searchGuests.street}</td>
                            <td>{searchGuests.country}</td>
                            <td>{searchGuests.arrive}</td>
                            <td>{searchGuests.departure}</td>
                            <td>{searchGuests.days}</td>
                            <td>{searchGuests.notes}</td>
                            <td style={{backgroundColor: 'red', color: 'white', textShadow: 'none'}} onClick={this.onGuestEdit.bind(this, searchGuests.id)}> Edytuj </td>
                            <td style={{backgroundColor: 'red', color: 'white', textShadow: 'none'}} onClick={this.onGuestDelete.bind(this, searchGuests.id)}> Usuń </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <table className="zui-table">
                    <thead>
                    <tr>
                        <th>Nazwisko</th>
                        <th>Imię</th>
                        <th>Miasto</th>
                        <th>Ulica</th>
                        <th>Kraj</th>
                        <th>Data przyjazdu</th>
                        <th>Data wyjazdu</th>
                        <th>Ilość dni</th>
                        <th>Uwagi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {guest.map(guest => (
                        <tr key={guest.id}>
                            <td>{guest.surname}</td>
                            <td>{guest.name}</td>
                            <td>{guest.city}</td>
                            <td>{guest.street}</td>
                            <td>{guest.country}</td>
                            <td>{guest.arrive}</td>
                            <td>{guest.departure}</td>
                            <td>{guest.days}</td>
                            <td>{guest.notes}</td>
                            <td style={{backgroundColor: 'red', color: 'white', textShadow: 'none'}} onClick={this.onGuestEdit.bind(this, guest.id)}> Edytuj </td>
                            <td style={{backgroundColor: 'red', color: 'white', textShadow: 'none'}} onClick={this.onGuestDelete.bind(this, guest.id)}> Usuń </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </>
        )
    }
}
export default MainForm;