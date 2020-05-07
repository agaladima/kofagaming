import React, { Component } from 'react';
import { Grid, Row, Col, Badge, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';

class EachCurrentMatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            userEmail: ''
        };
    }
    render() {
        let data = this.props.data;
        console.log('eachcurrent:', data);
        let items = [];

        let currMatches = data.filter(item => {
            return item.reviewStatus == this.props.buttonType;
        });
        currMatches.forEach(item => {
            items.push( <
                Card key = { item._id }
                className = "CardItem" >
                <
                CardBody className = "CardContent" >
                <
                CardTitle > < Badge > Game: < /Badge>{item.game}</CardTitle > < br / >
                <
                CardText > < Badge > Wager: < /Badge>{item.wager}</CardText > < br / >
                <
                CardText > < Badge > Date: < /Badge>{item.date}</CardText > < br / >
                <
                CardText > < Badge > System: < /Badge>{item.system}</CardText > < br / >
                <
                CardText > < Badge > Opponent: < /Badge>{item.oppemail}</CardText > < br / >
                <
                CardText > < Badge > Details: < /Badge>{item.details}</CardText > < br / >
                <
                /CardBody> <
                /Card>
            )
        });

        return ( <
            div className = "CardRow" > { items } <
            /div>
        )
    }
}
export default EachCurrentMatch;