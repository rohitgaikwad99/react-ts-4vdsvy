import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { eventsActions } from './../../store/events-slice';
import './BookEvent.scss';

const BookEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { eventId } = params;
  const events = useSelector((state) => state.events);
  const eventDetail = events.find((event) => event.eventId == eventId);
  const [numberofSeats, setNumberofSeats] = React.useState(1);
  const [attendesList, setAttendesList] = React.useState([]);
  const availableTickets = eventDetail.totalSeats - eventDetail.bookedSeats;
  const [formInputsValidity, setFormInputsValidity] = React.useState({
    name: true,
    email: true,
    numberofSeats: true,
    attendesList: {},
  });
  const regExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
  const isFormValid =
    formInputsValidity.name &&
    formInputsValidity.email &&
    formInputsValidity.numberofSeats;

  const handleSelectChange = async (noOfSeats) => {
    console.log(noOfSeats);
    let attendes = [];

    if (noOfSeats > 1) {
      for (let i = 0; i < noOfSeats - 1; i++) {
        const name = `attende${i + 2}`;
        attendes.push({
          id: i + 2,
          name,
        });
      }
    }

    setAttendesList(attendes);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isFormValid = {
      ...formInputsValidity,
    };

    switch (name) {
      case 'name':
        isFormValid.name = value == '' ? false : true;
        break;
      case 'email':
        isFormValid.email = regExp.test(value) ? true : false;
        break;
      case 'numberofSeats':
        setNumberofSeats(value);
        if (value > availableTickets) {
          isFormValid.numberofSeats = false;
        } else {
          isFormValid.numberofSeats = true;
          handleSelectChange(value);
        }
        break;
      default:
        if (name.includes('attende')) {
          isFormValid.attendesList[name] = value == '' ? false : true;
        }
    }

    console.log(isFormValid, formInputsValidity);
    console.log(attendesList);
    setFormInputsValidity({
      ...isFormValid,
    });
  };

  const handleFormSubmit = () => {
    dispatch(
      eventsActions.bookEvent({
        id: eventId,
        bookedSeats: numberofSeats,
      })
    );
    navigate('/events');
  };

  return (
    <React.Fragment>
      <div className="book-event">
        <div className="book-event__form">
          <div className="book-event__form-header">
            <h2>{eventDetail.eventName}</h2>
            <div>{eventDetail.eventDate}</div>
            <div>Tickets Available: {availableTickets}</div>
          </div>
          <div className="book-event__form-body">
            <div className="form-element">
              <label>Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="FirstName LastName"
                onChange={handleInputChange}
              />
              {!formInputsValidity.name && (
                <div className="invalid-feedback">Please Enter Valid Name.</div>
              )}
            </div>
            <div className="form-element">
              <label>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="UserName@Domain.com"
                onChange={handleInputChange}
              />
              {!formInputsValidity.email && (
                <div className="invalid-feedback">
                  Please Enter Valid Email.
                </div>
              )}
            </div>
            <div className="form-element">
              <label>No. of Seats</label>
              <select
                name="numberofSeats"
                className="custom-select"
                aria-label="Filter Countries By Region"
                onChange={handleInputChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              {!formInputsValidity.numberofSeats && (
                <div className="invalid-feedback">{`${numberofSeats} seats are not available`}</div>
              )}
            </div>

            {numberofSeats > 1 &&
              attendesList.map((attende, index) => {
                return (
                  <div className="form-element" key={index}>
                    <label>Attende #{attende.id}</label>
                    <input
                      type="text"
                      name={`attende${attende.id}`}
                      id={`attende${attende.id}`}
                      placeholder="FirstName LastName"
                      onChange={handleInputChange}
                    />
                    {formInputsValidity.attendesList.hasOwnProperty(name) &&
                      !formInputsValidity.attendesList[name] && (
                        <div className="invalid-feedback">
                          {formInputsValidity.attendesList.length}
                          Please Enter Valid Name.
                        </div>
                      )}
                  </div>
                );
              })}
          </div>
          <div className="book-event__form-footer">
            <button
              className={!isFormValid ? 'btn-disabled' : 'btn-primary'}
              onClick={handleFormSubmit}
              disabled={isFormValid}
            >
              Submit
            </button>
            <button onClick={() => navigate('/events')}>Cancel</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BookEvent;
