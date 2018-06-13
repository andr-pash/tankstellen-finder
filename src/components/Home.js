import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Header, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { GasStation } from 'components/GasStation'
import { promisifyListCall } from 'utils/promisify'
import { userStore } from '../stores/userStore';

const Apiomat = window.Apiomat
Apiomat.Datastore.configureWithCredentials(new Apiomat.User('testUser', 'test123'))

export class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      gasStations: [],
      loading: true
    }

    this.user = userStore.user
  }

  componentDidMount() {
    this.loadGasStations()
  }

  /**
   * latitude and longitude available via: Coordinates.latitude, Coordinates.longitude
   * @returns {Coordinates} the current location of the device
   */
  async getLocation() {
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(position => resolve(position.coords))
    })
  }

  /**
   * Add a gasStation to the list of favorites
   * @param {Apiomat.Tankstelle} gasStation 
   */
  async addFavorite(gasStation) {
    /** do your logic here */
    Countly.q.push(['add_event',{key: "added Favorite" }]);
    this.user.postFavorites(gasStation, {
      onOk: () => console.log('added favorite', gasStation),
      onError: (err) => console.error(err)
    })
  }

  async loadGasStations() {
    /** get the list of gasStations here, on success call the provided
     * function with the returned list.
     * e.g. onOk: (gasStations) => successAction(gasStations)
     */
    const successAction = (gasStations) => {
      this.setState({ gasStations, loading: false })      
    }

    /** show spinner */
    this.setState({ loading: true })

    /** Do your logic here */

    const loc = await this.getLocation()
    const distance = 110
    const query = `geoLocation within [${loc.latitude}, ${loc.longitude}, ${distance}]`

    Apiomat.Tankstelle.getTankstelles(query, {
      onOk: (gasStations) => successAction(gasStations),
      onError: (err) => console.error(err)
    })


  }

  render() {
    return (
      this.state.loading ?
        <Dimmer active>
          <Loader />
        </Dimmer>
        :
        <div>
          <Segment>
            <Header as='h1'>Home</Header>
            <Card.Group centered>
              {this.state.gasStations.map((station, i) => <GasStation key={i} station={station} action={this.addFavorite.bind(this, station)} />)}
            </Card.Group>
            <Link to="favorites">Go to Favorites</Link>
          </Segment>
        </div>
    )
  }
}
