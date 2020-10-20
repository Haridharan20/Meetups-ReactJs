import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { Consumer } from '../Context';

class EditMeetup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            city: '',
            address: ''
        }
        this.nameInput = React.createRef();
        this.cityInput = React.createRef();
        this.addressInput = React.createRef();
    }
    onsubmit = (dispatch, e) => {
        e.preventDefault();
        const { id, name, city, address } = this.state;
        const newMeetup = {
            id: this.props.match.params.id,
            name: this.nameInput.current.value,
            city: this.cityInput.current.value,
            address: this.addressInput.current.value
        }
        console.log(newMeetup);
        dispatch({ type: "Update_Meetup", payload: newMeetup })

        this.setState({
            name: '',
            city: '',
            address: ''
        })
        this.props.history.push('/');
    }
    changeHandler = (e) => this.setState({ [e.target.name]: e.target.value })
    render() {
        const id = this.props.match.params.id;
        return (
            <Consumer>
                {
                    (value) => {
                        const { dispatch, meetups } = value;
                        const filter = meetups.filter(meetup => meetup.id == id)
                        const [editdetails] = filter
                        console.log(editdetails.name);
                        return (
                            <div>
                                <Link className="btn grey" to="/">Back</Link>
                                <h1>Edit Meetup</h1>
                                <form onSubmit={this.onsubmit.bind(this, dispatch)}>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={editdetails.name}
                                            ref={this.nameInput}
                                        // onChange={this.changeHandler}
                                        />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="city"
                                            defaultValue={editdetails.city}
                                            ref={this.cityInput}
                                        // onChange={this.changeHandler}
                                        />
                                        <label htmlFor="city">City</label>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="address"
                                            defaultValue={editdetails.address}
                                            ref={this.addressInput}
                                        // onChange={this.changeHandler}
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

export default EditMeetup
