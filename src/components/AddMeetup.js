import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { Consumer } from '../Context';

class AddMeetup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            city: '',
            address: ''
        }
    }
    onsubmit = (dispatch, e) => {
        e.preventDefault();
        const { name, city, address } = this.state;
        const newMeetup = {
            id: uuid(),
            name,
            city,
            address
        }
        dispatch({ type: "Add_Meetup", payload: newMeetup })

        this.setState({
            name: '',
            city: '',
            address: ''
        })
        this.props.history.push('/');
    }
    changeHandler = (e) => this.setState({ [e.target.name]: e.target.value })
    render() {
        return (
            <Consumer>
                {
                    (value) => {
                        const { dispatch } = value;
                        return (
                            <div>
                                <Link className="btn grey" to="/">Back</Link>
                                <h1>Add Meetup</h1>
                                <form onSubmit={this.onsubmit.bind(this, dispatch)}>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.changeHandler}
                                        />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="city"
                                            value={this.state.city}
                                            onChange={this.changeHandler}
                                        />
                                        <label htmlFor="city">City</label>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="address"
                                            value={this.state.address}
                                            onChange={this.changeHandler}
                                        />
                                        <label htmlFor="address">Address</label>
                                    </div>
                                    <input type="submit" value="save" className="btn" />
                                </form>
                            </div>
                        )
                    }
                }
            </Consumer>
        )
    }
}

export default AddMeetup



// addMeetup(newMeetup) {
//     console.log(newMeetup);
//     axios.post('https://jsonplaceholder.typicode.com/users', newMeetup)
//         .then(response => {
//             this.props.history.push('/')
//         })
//         .catch(error => {
//             console.log(error);
//         })
// }