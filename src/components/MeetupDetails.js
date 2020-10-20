import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Consumer } from '../Context'

class MeetupDetails extends Component {
    deleteMeetup = (id, dispatch) => {
        dispatch(
            {
                type: "Delete_Meetup",
                payload: id
            }
        )
        this.props.history.push('/')
    }

    render() {
        const id = this.props.match.params.id;
        return (
            <Consumer>
                {
                    (value) => {
                        const { meetups, dispatch } = value;
                        const filter = meetups.filter(meetup => meetup.id == id)
                        let [details] = filter
                        return (
                            <div>
                                <br />
                                <Link className="btn grey" to="/">Back</Link>
                                <ul className="collection">
                                    <li className="collection-item">
                                        City: {details.city}
                                    </li>
                                    <li className="collection-item">
                                        Address: {details.address}
                                    </li>
                                </ul>
                                <Link className="btn" to={`/meetups/edit/${details.id}`}>Edit</Link>
                                <button onClick={this.deleteMeetup.bind(this, id, dispatch)} className="btn red right" >Delete</button>
                            </div>
                        )
                    }
                }
            </Consumer>
        )
    }
}

export default MeetupDetails;


// getMeetup() {
//     let id = this.props.match.params.id;
//     axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
//         .then(response => {
//             this.setState({ details: response.data, address: response.data.address }, () => {
//                 // console.log(this.state.address);
//             })
//         })
//         .catch(err => console.log(err))
// }

// onDelete() {
//     let meetupId = this.state.details.id;
//     axios.delete(`https://jsonplaceholder.typicode.com/users/${meetupId}`)
//         .then(response => {
//             this.props.history.push('/')
//         })
// }

// componentDidMount() {
//     this.getMeetup();
// }



// onClick={this.onDelete.bind(this)}