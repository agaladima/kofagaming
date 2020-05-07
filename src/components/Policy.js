import React, { Component } from 'react';
import { Grid, Row, Col, Badge, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { admin } from '../firebase.js';
import TableauReport from 'tableau-react';
import axios from 'axios';

import Dashes from '../Dashboards.json';
import SubHeader from './SubHeader.js';
import PrizeCarousel from './PrizeCarousel';

// Initialize firestore
let db = admin.firestore();
// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});

class Dashboards extends Component {

    render() {

        return ( <
            div >
            <
            div className = "Dashboard" >
            <
            div className = "widgRow" >
            Kofa is a platform that rewards gamers
            for doing what they love...gaming!If you 're playing a MULTIPLAYER game, on the '
            Cmd Center ' tab, select '
            Start a match ', 
            fill in the information, and submit.You can bet a specific number of Koyns and
            if you win, you 'll be awarded that Koyn amount. Koyns can be traded for
            an item on your dashboard page.Just make sure to look at the cost.If you have enough Koyns, you can purchase it and get a code
            for that item.Later on, you 'll get an email that you'
            ll need to respond to with a screenshot of your screen after you win or lose.If you win, you 'll be awarded your Koyns. <
            /div> <
            /div> <
            /div>
        );
    }
}
export default Dashboards;