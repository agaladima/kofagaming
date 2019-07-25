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
                  <h2 ref={subtitle => this.subtitle = subtitle}>About RPS</h2>
                  <div>RPS is an internal reporting system for our various teams to keep track of stats and have visually appealing dashboards to help with improving workflow.</div>
                  <hr />
                  <h2 ref={subtitle => this.subtitle = subtitle}>RPS Help</h2>
                  <div>For help, email <a href={"mailto:errin.calhoun@jacobseye.com"}>errin.calhoun@jacobseye.com</a> or <a href={"mailto:arum.galadima@jacobseye.com"}>arum.galadima@jacobseye.com</a></div>
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
