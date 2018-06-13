import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Card, Header, Segment } from 'semantic-ui-react'
import { GasStation } from 'components/GasStation'
import { userStore } from '../stores/userStore';
import { promisifyListCall } from '../utils/promisify';

export class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gasStations: []
    }

    this.user = userStore.user
  }

  componentDidMount() {
    this.loadFavorites()
  }

  /**
   * loads the list of favorites
   */
  async loadFavorites() {

    /** call the successAction on successful load of the favorited gasStations */
    const successAction = (gasStations) => {
      this.setState({ gasStations })
    }

    /** do your logic here */
  }

  render() {
    return (
        <div>
          <Segment>
            <Header as='h1'>Favorites</Header>
            <Card.Group centered>
                {this.state.gasStations.map((station, i) => <GasStation key={i} station={station}/>)}
            </Card.Group>
            <Link to="/">Go to Home</Link>
          </Segment>
        </div>
      )
}
}
