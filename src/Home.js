import React from 'react';
import Cards from './assets/cards.json'
import Upgrades from './assets/upgrades.json';
import './Home.css';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {json: '[{"name": "Windweavers"},{"name": "Spearmen"}]', deck: []}

        this.textChange = this.textChange.bind(this);
        this.importDeck = this.importDeck.bind(this);
    }

    textChange(event) {
        this.setState({json: event.target.value});
    }

    importDeck(event) {
        const deck = JSON.parse(this.state.json)

        Cards.forEach(card => {
            deck.forEach(deckCard => {
                if (deckCard.name.toLowerCase() === card.Name.toLowerCase()) {
                    // TODO: need to fix the correct image if multiple factions
                    deckCard.image_name = card.Image.Name
                    deckCard.image_url = 'https://cardbase.skylords.eu' + card.Image.Url
                }
            })
        })

        Upgrades.forEach(upgrade => {
            upgrade.drops.forEach(card => {
                deck.forEach(deckCard => {
                    var found = false

                    if (deckCard.name.toLowerCase() === card.name.toLowerCase()) {
                        if (deckCard.faction) {
                            if (deckCard.faction.toLowerCase() === card.faction.toLowerCase()) {
                                found = true
                            } 
                        } else {
                            found = true
                        }
                    }

                    if (found) {
                        deckCard.upgrade_map = upgrade.name
                        deckCard.players = upgrade.number_of_players
                        deckCard.standard_only = card.standard_only
                    }
                })
            })
        })

        this.setState({deck: deck});
    }

    render() {
        if (this.state.deck.length > 0) {
            return (
                <table className='center'>
                    <tbody>
                        <tr key='-1'>
                            <td><b>Name</b></td>
                            <td><b>Map</b></td>
                        </tr>
                        {this.state.deck.map((card, i) => {
                            var mapName = ""
                            var players = ""
                            if (card.upgrade_map) {
                                mapName = card.upgrade_map
                                players = " (" + card.players + ")"
                            }
                            var standardDescription = ""
                            if (card.standard_only) {
                                standardDescription = " (Standard only)"
                            }
                            
                            return (
                                <tr key={i}>
                                    {/*<td><img src={card.image_url} alt={card.image_name}/></td>*/}
                                    <td>{toTitleCase(card.name)}</td>
                                    <td>{toTitleCase(mapName)}{players}{standardDescription}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            );
        }

        return (
            <div className='center'>
                <h1>Import your deck</h1>
                <textarea className='textarea' value={this.state.json} onChange={this.textChange} />
                <div>
                    <button onClick={this.importDeck}>Import</button>
                </div>
            </div>
        ); 
    }
}

export default Home;