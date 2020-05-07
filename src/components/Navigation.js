import React, {Component} from 'react';
import { Navbar, NavDropdown, MenuItem, Nav, NavItem } from 'react-bootstrap';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

class Navigation extends Component {
  constructor(props) {
      super(props);

      this.state = {
        modalIsOpen: false,
        loading: true,
        authenticated: false
      };

      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    // if(this.props.authenticated){
    //   this.setState({
    //     loading: false
    //   });
    // }
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  render() {

    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a className="logo" href="/"><span className="begin-logo">k</span><span className="end-logo">o</span><span className="begin-logo">fa</span></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavDropdown eventKey={1} title="Help" id="basic-nav-dropdown">
                <MenuItem onClick={this.openModal} className="menuitem" eventKey={1.1}>Contact</MenuItem>
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="About Modal"
                >
                  <h2 ref={subtitle => this.subtitle = subtitle}>About Kofa</h2>
                  <div>Kofa is a platform that rewards gamers for doing what they love...gaming! If you're playing a MULTIPLAYER game, on the 'Cmd Center' tab, select 'Start a match', 
                    fill in the information, and submit. You can bet a specific number of Koyns and if you win, you'll be awarded that Koyn amount. Koyns can be traded for
                    an item on your dashboard page. Just make sure to look at the cost. If you have enough Koyns, you can purchase it and 
                    get a code for that item. Later on, you'll get an email that you'll need to respond to with a screenshot of your screen
                    after you win or lose. If you win, you'll be awarded your Koyns.</div>
                  <hr />
                  <h2 ref={subtitle => this.subtitle = subtitle}>Kofa Help</h2>
                  <div>For help, email <a href={"mailto:arum.galadima@jacobseye.com"}>arum.galadima@gmail.com</a></div>
                  <br />
                  <button onClick={this.closeModal}>close</button>
                </Modal>
                <MenuItem divider />
              </NavDropdown>
              {this.props.authenticated
                ? (<Nav pullRight>
                    <NavItem eventKey={2} href="/dashboards">Cmd Center</NavItem>
                    <NavItem eventKey={2} href="/logout">Logout</NavItem>
                  </Nav>)
                : (<Nav pullRight>
                    <NavItem eventKey={2} href="/login">Login</NavItem>
                  </Nav>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
