import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames } from '../../managers/GameManager.js'
import { createGameEvent, getGamers } from "../../managers/EventManager.js"


export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [gamers, setGamers] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        time: "",
        gameId: "",
        organizerId: 0
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

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = Object.assign({}, currentEvent);
        copy[domEvent.target.name] = domEvent.target.value;
        setCurrentEvent(copy);
    }

    return (
        <form className="EventForm">
            <h2 className="EventForm__title">Create New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Event Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Event Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
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
            value={currentEvent.gameId}
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
             name="organizerId"
            className="form-control"
            value={currentEvent.organizerId}
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

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: parseInt(currentEvent.gameId),
                        organizer: parseInt(currentEvent.organizerId)
                    }

                    // Send POST request to your API
                    createGameEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn-1 btn-primary">Create Event Now!</button>
        </form>
    )
}