import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Consumer } from '../Context'

class MeetupItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item: props.value
        }
    }

    render() {
        const { id, name } = this.state.item
        return (
            <Consumer>
                {
                    (value) => {
                        const { dispatch } = value;
                        return (
                            <>
                                <li className="collection-item">
                                    <Link to={`/meetups/${id}`}>{name}
                                    </Link>
                                </li>

                            </>
                        )
                    }
                }
            </Consumer>
        )
    }
}

export default MeetupItem
