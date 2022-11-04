import * as React from 'react';
import { useSelector } from 'react-redux';
import EventItem from './EventItem';
import './Events.scss';

const Events = () => {
  const eventList = useSelector((state) => state.events);
  const [searchInputValue, setSearchInput] = React.useState('');

  const handleSearchInputChange = (event) => {
    const filterVal = event.target.value;
    setSearchInput(filterVal);
    searchEventList(eventList);
  };

  const searchEventList = (eventsData) => {
    return eventsData.filter((item) => {
      return (
        item.eventName.toLowerCase().indexOf(searchInputValue.toLowerCase()) >
        -1
      );
    });
  };

  return (
    <React.Fragment>
      <div className="event-filter">
        <label htmlFor="search-form">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="search-input"
            placeholder="Search by Event Title...."
            value={searchInputValue}
            onChange={handleSearchInputChange}
          />
        </label>
      </div>
      <div className="event-body">
        <h1>Events({eventList.length})</h1>
        <div className="event-list">
          {searchEventList(eventList).map((event, key) => (
            <EventItem key={key} eventDetail={event} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Events;
