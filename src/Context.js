import React, { Component } from 'react';
import { v4 as uuid } from 'uuid'

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'Add_Meetup':
            return {
                ...state,
                meetups: [action.payload, ...state.meetups]
            };

        case 'Delete_Meetup':
            return {
                ...state,
                meetups: state.meetups.filter(meetup => meetup.id !== action.payload)
            };

        case 'Update_Meetup':
            console.log(action.payload);
            return {
                ...state,
                meetups: state.meetups.map(meetup => meetup.id === action.payload.id ?
                    meetup = action.payload : meetup)
            }
    }
}


export class Provider extends Component {
    state = {
        meetups: [
            {
                id: uuid(),
                name: 'Mathew',
                city: 'London',
                address: '3rd street'
            },
            {
                id: uuid(),
                name: 'Reo',
                city: 'LosAngels',
                address: '1st cross street'
            },
            {
                id: uuid(),
                name: 'John',
                city: 'India',
                address: '4th Main Road'
            }
        ],
        dispatch: (action) => {
            this.setState(state => reducer(state, action))
        }
    }
    render() {
        return (
            <div>
                <Context.Provider value={this.state}>
                    {this.props.children}
                </Context.Provider>
            </div>
        )
    }
}

export const Consumer = Context.Consumer;
