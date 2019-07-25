import React from 'react';
import { Col } from 'react-bootstrap';
import Events from '../Eventdata.json';

function EventItem() {
  let eventLayout = Events.events;
  const eventItem = eventLayout.map(function(user, i) {
    return <Col key={eventLayout[i].A} className="home-col-ev" xs={2}>{eventLayout[i].value}</Col>
  });
  return eventItem;
}

export default EventItem;
