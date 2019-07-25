import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { admin } from '../firebase.js';
import * as firebase from 'firebase';
import Alert from 'react-s-alert';


class LastTen extends Component {
    constructor(props) {
      super(props);

      this.state = {
        email: '',
        redirect: false,
        loading: true
      };
    }

    componentDidMount(){
      admin.auth().onAuthStateChanged((user) => {
        // console.log(user);
        if(user === null) {
          this.setState({redirect: true});
        }
      });
    }

    createTable = () => {
      let table = []

      // Outer loop to create parent
      for (let i = 0; i < 10; i++) {
        let children = []
        //Inner loop to create children
        for (let j = 0; j < 5; j++) {
          children.push(<td>{`Column ${j + 1}`}</td>)
        }
        //Create the parent and add the children
        table.push(<tr key={i}>{children}</tr>)
      }
      return table
    }

    render() {
      if(this.state.redirect === true) {
        return <Redirect to='/login' />
      }
      return (
        <div className="FormCenter">
        <h1 className="page-header">Last Ten Surveys</h1>
          <div className="top-ten-table">
            <Table responsive striped bordered condensed hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Timestamp</th>
                  <th>Flag</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td><Button>Flag</Button></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td><Button>Flag</Button></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      );
    }
}

export default LastTen;
