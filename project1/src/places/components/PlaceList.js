import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

const PlaceList = props =>{

    if (props.items.length === 0)     //idea is to output the list of places so we are cheing that if ew already have places list data
      {
        return (<div className ="place-list center">
          <Card>
            <h2>No places found maybe create one ?</h2>
            <button> Share place </button>
          </Card>

          </div>
        );
      }
      else return <ul className="place-list">
          {props.items.map(place=> <PlaceItem
            key={place.id}
            id={place.id}
            image={place.imageUrl}
            title={place.title}
            description ={place.description}
            address={place.address}
            creatorId={place.creator}
            cordinates= {place.location}/>)}
      </ul>
};
export default PlaceList;
