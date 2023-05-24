import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "../../managers/EventManager.js";

export const EventList = (props) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  const deleteThisEvent = (e, eventId) => {
    e.preventDefault();
    deleteEvent(eventId).then(() =>
      getEvents().then((data) => setEvents(data))
    );
  };

  const joinThisEvent = (e, eventId) => {
    e.preventDefault();
    joinEvent(eventId).then(() =>
    getEvents().then((data) => setEvents(data))
    );
  }

  const leaveThisEvent = (e, eventId) => {
    e.preventDefault();
    leaveEvent(eventId).then(() =>
    getEvents().then((data) => setEvents(data))
    );
  }

  return (
    <section>
      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          navigate({ pathname: "/events/new" });
        }}
      >
        Register New Event
      </button>
      <article className="events">
        {events.map((event) => {
          return (
            <section key={`event--${event.id}`} className="event">
              <div className="event__title">
                {event.description} by {event.organizer.user.username}
              </div>
              <div className="event__date">Date: {event.date}</div>
              <div className="event__time">Time: {event.time}</div>
              <div className="event_joined">
              {
  event.joined ?
  <button
  className="btn-3" onClick={(e) => {
    leaveThisEvent(e, event.id)
  }}>Leave</button>
  :
  <button
  className="btn-2" onClick={(e) => {
    joinThisEvent(e, event.id)
  }}>Join</button>
}

              </div>
              <button
                className="btn-1"
                onClick={() => {
                  navigate({ pathname: `/events/${event.id}` });
                }}
              >
                Edit This Event
              </button>
              <button className="btn-3" onClick={(e) => deleteThisEvent(e, event.id)}>
                Cancel Event
              </button>
            </section>
          );
        })}
      </article>
    </section>
  );
};
