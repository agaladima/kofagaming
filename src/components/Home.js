import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Row, Col, Carousel } from 'react-bootstrap';
import {admin} from '../firebase.js';
import * as moment from 'moment';


// Initialize firestore
let db = admin.firestore();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      userEmail: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(e.target.getAttribute('keyprop'));
    this.setState({ selectedEvent: e.target.getAttribute('keyprop') });
    console.log(moment().format('YYYY-MM-DD'));
    this.getElement();

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
    //this.getElement();
  }

  getElement() {
    let node = document.getElementsByClassName('home-col-ev');
    for(var i=0; i<node.length; i++) {
      let start = node[i].attributes.startdate.nodeValue;
      let end = node[i].attributes.enddate.nodeValue;

      if(this.dateBetween(start, end)) {
        console.log('this event:');
      }
    }
    //const element = node();
    //console.log('there are this many items:',node);
  }

  dateBetween(start, end) {

    // let startDate = moment(e.target.getAttribute('startdate')).format('YYYY-MM-DD');
    // let endDate = moment(e.target.getAttribute('enddate')).format('YYYY-MM-DD');
    let currentDate = moment();
    return currentDate.isBetween(start, end);
  }

  render() {
    if(this.state.redirect === true) {
      return <Redirect to='/login' />
    }

    return (
      <div className="home-page">
        <h1 className="page-header">Featured Prizes</h1>
        <div className="eventItems">
          <div className="home-inner">
            <div className="CarouselDiv">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://file-cdn.scdkey.com/product/20180918201754_scdk.jpg"
                    alt="COD 4"
                  />
                  <Carousel.Caption>
                    <h3>Call of Duty 4</h3>
                    <p>Cash in Koyns for this prize</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://i2-prod.manchestereveningnews.co.uk/sport/gaming/article16525166.ece/ALTERNATES/s615/0_FIFA-20.jpg"
                    alt="Fifa 20"
                  />

                  <Carousel.Caption>
                    <h3>Fifa 20</h3>
                    <p>Cash in Koyns for this prize</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://amp.businessinsider.com/images/5d1a7a92a17d6c0f5b383a15-750-455.jpg"
                    alt="NBA 2k20"
                  />

                  <Carousel.Caption>
                    <h3>NBA 2k20</h3>
                    <p>Cash in Koyns for this prize</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://www.nj.com/resizer/2AnsUL7IPYfiIP_7b8LCike6OSQ=/1200x0/arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/XWHLMWJPRVAYJDYZK5MLDBNI24.JPG"
                    alt="Madden 20"
                  />

                  <Carousel.Caption>
                    <h3>Madden 20</h3>
                    <p>Cash in Koyns for this prize</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default home;
