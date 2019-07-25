import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Row, Col, Button } from 'react-bootstrap';
import {admin} from '../firebase.js';
import Events from '../Eventdata.json';
import EventItem from './EventItem';
import * as moment from 'moment';


// Initialize firestore
let db = admin.firestore();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      userEmail: '',
      eventIndex: [4]
    };
    this.handleClick = this.handleClick.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  handleClick(e) {
    console.log(e.target.getAttribute('keyprop'));
    this.setState({ selectedEvent: e.target.getAttribute('keyprop') });
    console.log(moment().format('YYYY-MM-DD'));
    //this.getElement();

    // let startDate = moment(e.target.getAttribute('startdate')).format('YYYY-MM-DD');
    // let endDate = moment(e.target.getAttribute('enddate')).format('YYYY-MM-DD');
    // let currentDate = moment();
    // console.log(currentDate.isBetween(startDate, endDate));
  }

  componentDidMount() {
    admin.auth().onAuthStateChanged((user) => {
      if(user === null) {
        this.setState({redirect: true});
      }
    });
    this.state.eventIndex = [];
    this.getElement();
    this.eventBackground();
  }

  eventBackground() {
    let node = document.getElementsByClassName('home-col-ev');
    for (var i = 0; i < this.state.eventIndex.length; i++) {
      for (var j = 0; j < node.length; j++) {
        if (this.state.eventIndex[i] == j) {
          node[j].style.background = '#4EAFEF';
        }
      }
    }
  }

  getElement() {
    let node = document.getElementsByClassName('home-col-ev');
    for(var i=0; i<node.length; i++) {
      let start = node[i].attributes.startdate.nodeValue;
      let end = node[i].attributes.enddate.nodeValue;

      var newArray = this.state.eventIndex;

      if(this.dateBetween(start, end)) {
        newArray.push(i);
        this.setState({eventIndex: newArray});
        console.log(i, this.dateBetween(start, end));
      }
    }
    console.log('event array:', this.state.eventIndex);
    //const element = node();
    //console.log('there are this many items:',node);
  }

  dateBetween(start, end) {
    // let startDate = moment(e.target.getAttribute('startdate')).format('YYYY-MM-DD');
    // let endDate = moment(e.target.getAttribute('enddate')).format('YYYY-MM-DD');
    let currentDate = moment();
    return currentDate.isBetween(start, end);
  }

  loadData() {
    console.log('clicked');
  }

  render() {
    if(this.state.redirect === true) {
      return <Redirect to='/login' />
    }
    let eventLayout = Events.events;

    return (
      <div className="home-page">
        <h1 className="page-header">All Events</h1>
        <div>
          <Button bsStyle="link" onClick={this.loadData}>Show Live Events</Button>
        </div>
        <div className="eventItems">

        {
          eventLayout.map(function(user, i) {
            return <Col key={eventLayout[i].A}
                      keyprop={eventLayout[i].A}
                      ref={`box${i}`}
                      startdate={eventLayout[i].startDate}
                      enddate={eventLayout[i].endDate}
                      onClick={(e) => this.handleClick(e)}
                      className="home-col-ev" xs={2}>{eventLayout[i].value}
                  </Col>
          }.bind(this))
        }
        </div>
      </div>
    )
  }
}

export default EventsList;
