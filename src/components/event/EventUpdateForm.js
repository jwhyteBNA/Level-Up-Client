import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGames } from '../../managers/GameManager.js'
import { updateSingleEvent, getGamers, updateEvent } from "../../managers/EventManager.js"


export const EventUpdateForm = () => {
    const navigate = useNavigate()
    const { eventId } = useParams()
    const [games, setGames] = useState([])
    const [gamers, setGamers] = useState([])

    const [currentEventProfile, updateCurrentEvent] = useState({
        description: "",
        date: "",
        time: "",
        game: "",
        organizer: ""
    })

    useEffect(() => {
    // TODO: Get the games, then set the state
        getGames()
            .then((res) => setGames(res))

    }, [])

    useEffect(() => {
        // TODO: Get the games, then set the state
            getGamers()
                .then((res) => setGamers(res))
    
        }, [])

    useEffect(() => {
        updateSingleEvent(eventId)
        .then((data) => {
            const singleEvent = data[0];
            updateCurrentEvent(singleEvent);
        })
    }, [eventId])

    const changeEventState = (domEvent) => {
        const copy = {...currentEventProfile}
        copy[domEvent.target.name] = domEvent.target.value;
        updateCurrentEvent(copy);
    }

    return (
        <form className="EventForm">
            <h2 className="EventForm__title">Create New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEventProfile.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Event Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEventProfile.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Event Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEventProfile.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="gameId">Game: </label>
                <select
             name="gameId"
            className="form-control"
            value={currentEventProfile.game}
            onChange={changeEventState}
          >
            <option value="0">Select a Game</option>
            {games.map((g) => (
              <option key={g.id} value={g.id}>
                {g.title}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
                <div className="form-group">
                <label htmlFor="gamerId">Event Organizer: </label>
                <select
             name="organizer"
            className="form-control"
            value={currentEventProfile.organizer}
            onChange={changeEventState}
          >
            <option value="0">Select an Organizer</option>
            {gamers.map((gm) => (
              <option key={gm.id} value={gm.id}>
                {gm.user.username}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    updateEvent(currentEventProfile)
                        .then(() => { navigate("/events")})
                }}
                className="btn-1 btn-primary">Update Event Details</button>
        </form>
    )
}