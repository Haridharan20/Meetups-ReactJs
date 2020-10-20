import React, { Component } from 'react'
import axios from 'axios'
import MeetupItem from './MeetupItem'
import { v4 as uuid } from 'uuid'
import { Consumer } from '../Context'


class Meetups extends Component {
    render() {
        return (
            <Consumer>
                {
                    (value) => {
                        const { meetups } = value;
                        return (
                            <div>
                                <h1>Meetups</h1>
                                <ul className="collection">
                                    {meetups.map(meetup => <MeetupItem key={meetup.id} value={meetup} />)}
                                </ul>
                            </div>
                        )
                    }
                }
            </Consumer>
        )
    }
}

export default Meetups


// getMeetups() {
//     axios.get('https://jsonplaceholder.typicode.com/users')
//         .then(response => {
//             this.setState({ meetups: response.data })
//         })
//         .catch(err => console.log(err))
// }

// componentDidMount() {
//     this.getMeetups();
// }

