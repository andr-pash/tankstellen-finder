import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

export const GasStation = (props) => 
<Card>
    <Card.Content>
        { !!props.action ?
            <Icon 
                style={{position: 'absolute', right: '15px', top: '15px', cursor: 'pointer'}} 
                name="heart" 
                color="grey" 
                onClick={props.action}/>

            : null
        }
        <Card.Header>{props.station.getName()}</Card.Header>
        <Card.Meta>{props.station.getDistance()} km</Card.Meta>
        <Card.Description>
          <strong>{props.station.getStreet()} {props.station.getHouseNumber()}</strong> <br/>
          <span>{props.station.getPostCode()} {props.station.getCity()}</span>
        </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Card.Header>{props.station.getPrice()} EUR</Card.Header>
        <div style={{...indicatorStyle, background: getColorForOpenStatus(props.station.getIsOpen())}}></div>
    </Card.Content>
</Card>

const indicatorStyle = {
    float: "right", 
    borderRadius: "50%", 
    background: "#ccc", 
    width: "10px", 
    height: "10px", 
    position: 'absolute', 
    right: '15px', 
    bottom: "15px"
}

/**
 * Helper Function to determine color of open state indicator
 * @param {number} isOpen 
 * @returns {string} color as string
 */
const getColorForOpenStatus = (isOpen) => {
    let color

    switch(isOpen) {
        case 0:
            color = 'red'
            break
        case 1:
            color = 'green'
            break
        default:
            color = 'grey'
    }

    return color
}
