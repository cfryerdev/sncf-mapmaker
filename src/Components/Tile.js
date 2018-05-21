import React from 'react';
import styled from 'styled-components';
import EventWrapper from '../Utilities/EventWrapper';

export default class Tile extends React.Component {
  constructor(state, props) {
    super(state, props);
    this.state = {
      tileType: this.props.tileType,
      rowId: this.props.rowId,
      tileId: this.props.tileId
    }
  }
  
  setTileType = (callback) => {
    // This is silly aad hacky but i dont care, its just to
    // save me time while building maps lol
    switch (this.state.tileType)
    {
      case '':
        this.setState({ tileType: 'start'}, this.updateMap);
        return;
      case 'start':
        this.setState({ tileType: 'town'}, this.updateMap);
        return;
      case 'town':
        this.setState({ tileType: 'city'}, this.updateMap);
        return;
      case 'city':
        this.setState({ tileType: 'capital'}, this.updateMap);
        return;
      case 'capital':
        this.setState({ tileType: 'mountain'}, this.updateMap);
        return;
      case 'mountain':
        this.setState({ tileType: 'null'}, this.updateMap);
        return;
      case 'null':
        this.setState({ tileType: ''}, this.updateMap);
        return;
    }
  }

    showTileType = () => {
      switch (this.state.tileType)
      {
        case '':
          return '';
        case 'start':
          return 'START';
        case 'town':
          return 'TOWN';
        case 'city':
          return 'CITY';
        case 'capital':
          return 'CAP';
        case 'mountain':
          return 'MTN';
        case 'null':
          return 'null';
          return;
      }
    }

  updateMap = () => {
    EventWrapper.emit('UPDATE', { ... this.state });
  }

  render() {
    const { tileType } = this.props;
    return (
          <div className={'hexagon ' + this.state.tileType } onClick={this.setTileType}>
            <div className="hexagontent" 
              style={{ fontSize: 10, textTransform: 'uppercase' }} >
              {this.showTileType()}
            </div>
          </div>
    ); 
  }
}
