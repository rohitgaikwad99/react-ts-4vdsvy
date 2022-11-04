import { createSlice } from '@reduxjs/toolkit';
import Data from './../data/events';

export const fetchEventsList = () => {
  return async (dispatch) => {
    const fetchEvents = async () => {
      const response = await fetch(
        'https://react-ts-4vdsvy.stackblitz.io/data/events.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      console.log('data', data);
      return data;
    };

    const cartData = await fetchEvents();
  };
};

const initialState = Data.data;
const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    bookEvent(state, action) {
      const { id, bookedSeats } = action.payload;
      const eventDetail = state.find((event) => event.eventId == id);
      eventDetail.bookedSeats += parseInt(bookedSeats);
    },
  },
});

export const eventsActions = eventsSlice.actions;

export default eventsSlice;
