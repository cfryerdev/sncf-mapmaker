import React, { Fragment } from 'react';
import Tile from './Tile';
import EventWrapper from '../Utilities/EventWrapper';

import gamemap from '../Data/default.json';

const token;

export default class Board extends React.Component {
  constructor(state, props) {
    super(state, props);
    this.state = {
      data: gamemap.tiles,
      isLoad: false
    }
  }

  componentDidMount() {
    token = EventWrapper.addListener('UPDATE', model => {
      try {
        var newData = this.state.data;
        newData[model.rowId][model.tileId] = model.tileType;
        this.setState({data: newData});
      }
      catch(err) {
        console.error(err.message);
      }
    });
  }

  componentWillUnmount() {
    token.remove();
  }

  loadMapDialog = () => {
    try {
      var jsonData = this.state.sentData;
      this.setState({ data: JSON.parse(jsonData) });
    }
    catch(err) {
      alert('Error loading, see console.');
      console.error(err.message);
    }
  }

  handleChange = (event) => {
    var jsonData = event.target.value;
    this.setState({sentData: jsonData});
  }

  render() {
    const { tileType } = this.props;
    return (
        <Fragment>

          <textarea rows="8" style={{ width: '500px' }} onChange={this.handleChange} />
          <div>
            <button style={{padding: '5px 10px', marginBottom: 10 }} onClick={this.loadMapDialog}>
              Load ...
            </button>
          </div>

          <div style={{padding: 5, marginBottom: 10, fontSize: 12 }}>
            <strong>States: </strong> 
             "" -> "town" -> "city" -> "capital" -> "mountain" -> "null"
          </div>

          <div className="honeycomb">
            { 
              (this.state.data && this.state.data.map) &&
                this.state.data.map(function (row, ri) {
                  return <div className="ibws-fix" key={ri}>
                    {
                      row.map(function (tile, ti) {
                        return <Tile key={ti} rowId={ri} tileId={ti} tileType={tile}/>
                      })
                    }
                  </div>
                })
            }
          </div>
          <div style={{ width: '500px' }}>
            <strong>Map Data:</strong>
            <br />
            {JSON.stringify(this.state.data, null, 0) }
          </div>
        </Fragment>
    ); 
  }
}