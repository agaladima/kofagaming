import React, { Component } from 'react';
import { Grid, Row, Col, Badge, ListGroup, ListGroupItem, Button, Carousel } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

class PrizeCarousel extends Component {

    render() {
      // if(this.state.redirect === true) {
      //   return <Redirect to='/login' />
      // }
      return (
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
        );
    }
}

export default PrizeCarousel;
