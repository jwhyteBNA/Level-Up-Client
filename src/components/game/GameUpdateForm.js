import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateSingleGame, getGameTypes, updateGame } from '../../managers/GameManager.js'


export const GameUpdateForm = () => {
    const navigate = useNavigate()
    const { gameId } = useParams()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGameProfile, updateCurrentGame] = useState({
        skillLevel: "",
        numberOfPlayers: "",
        title: "",
        maker: "",
        game_type: ""
    })

    useEffect(() => {
    // TODO: Get the game types, then set the state
        getGameTypes()
            .then((res) => setGameTypes(res))

    }, [])

    useEffect(() => {
        updateSingleGame(gameId)
        .then((data) => {
            const singleGame = data[0];
            updateCurrentGame(singleGame);
        })
    }, [gameId])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = { ...currentGameProfile}
        copy[domEvent.target.name] = domEvent.target.value;
        updateCurrentGame(copy);
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGameProfile.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGameProfile.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="players">Number of Players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        value={currentGameProfile.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="text" name="skill_level" required autoFocus className="form-control"
                        value={currentGameProfile.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="game_type">Game Type: </label>
                <select
            name="game_type"
            className="form-control"
            value={currentGameProfile.game_type}
            onChange={changeGameState}
          >
            <option value="0">Select a Game Type</option>
            {gameTypes.map((gameType) => (
              <option key={gameType.id} value={gameType.id}>
                {gameType.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

            <button type="submit"
                onClick={(evt) => {
                    evt.preventDefault();
                
                    updateGame(currentGameProfile)
                      .then(() => navigate("/games"))
                  }}
                className="btn-1 btn-primary">Edit Game</button>
        </form>
    )
}