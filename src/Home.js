import React from 'react';
import Cards from './assets/cards.json';
import './Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {json: '', deck: []}

        this.textChange = this.textChange.bind(this);
        this.importDeck = this.importDeck.bind(this);
    }

    textChange(event) {
        this.setState({json: event.target.value});
    }

    importDeck(event) {
        const deck = JSON.parse(this.state.json)

        deck.forEach(deckCard => {
            Cards.forEach(card => {
                if (deckCard.name.toLowerCase() === card.Name.toLowerCase()) {
                    deckCard.upgrades = card.Upgrades
                }
            })
        })

        this.setState({deck: deck});
    }

    render() {
        if (this.state.deck.length > 0) {
            return (
                <table class='center'>
                    <tbody>
                        <tr key='-1'>
                            <td><b>Name</b></td>
                            <td><b>Upgrade 1</b></td>
                            <td><b>Upgrade 2</b></td>
                            <td><b>Upgrade 3</b></td>
                        </tr>
                        {this.state.deck.map((card, i) => {
                            return(
                                <tr key={i}>
                                    <td>{card.name}</td>
                                    {card.upgrades.map((upgrade, i) => {
                                        var difficulty = ''
                                        var mapName = '-'

                                        if (upgrade.Map != null) {
                                            mapName = upgrade.Map.Name

                                            if (upgrade.Map.Difficulty === 0) {
                                                difficulty = '(Standard)'
                                            } else if (upgrade.Map.Difficulty === 1) {
                                                difficulty = '(Advanced)'
                                            } else if (upgrade.Map.Difficulty === 2) {
                                                difficulty = '(Expert)'
                                            }
                                        }
                                        
                                        return(
                                            <td key={i}>{mapName} {difficulty}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}                        
                    </tbody>
                </table>
            );
        }

        return (
            <div class='center'>
                <h1>Import your deck</h1>
                <textarea class='textarea' onChange={this.textChange} />
                <div>
                    <button onClick={this.importDeck}>Import</button>
                </div>
            </div>
        ); 
    }
}

export default Home;