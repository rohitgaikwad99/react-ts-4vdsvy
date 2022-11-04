import * as React from 'react';
import { assetUrl } from './../../constants';
import { useNavigate } from 'react-router-dom';
import './EventItem.scss';

const EventItem = ({ eventDetail }) => {
  const navigate = useNavigate();
  const imgUrl = `${assetUrl}${eventDetail.eventLogo}`;
  const availableTickets = eventDetail.totalSeats - eventDetail.bookedSeats;

  return (
    <React.Fragment>
      <div className="event-detail">
        <div className="event-detail__header-image">
          <img src={imgUrl} />
        </div>
        <div className="event-detail__info">
          <h3>{eventDetail.eventName}</h3>
          <div className="event-detail__ticket-detail">
            <div>{eventDetail.eventDate}</div>
            <div>Tickets Available: {availableTickets}</div>
          </div>
        </div>
        <div className="event-detail__footer">
          {availableTickets > 0 && (
            <button
              onClick={() => navigate(`/book-event/${eventDetail.eventId}`)}
            >
              <img src={`${assetUrl}book.png`} /> Book Event
            </button>
          )}
          {availableTickets == 0 && (
            <button className="btn-disabled">
              <img src={`${assetUrl}sold-out.png`} /> Sold Out
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventItem;
