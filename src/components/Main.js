import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Meetups from './Meetups'
import MeetupDetails from './MeetupDetails'
import About from './About'
import AddMeetup from './AddMeetup'
import EditMeetup from './EditMeetup'
import { Provider } from '../Context'
function Main() {
    return (
        <div>
            <Provider>
                <Switch>
                    <Route exact path='/' component={Meetups} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/meetups/add' component={AddMeetup} />
                    <Route exact path='/meetups/edit/:id' component={EditMeetup} />
                    <Route exact path='/meetups/:id' component={MeetupDetails} />
                </Switch>
            </Provider>
        </div>
    )
}

export default Main
