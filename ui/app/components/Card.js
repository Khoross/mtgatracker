import React, { Component } from 'react';
import {colorToClass} from '../helpers';

class Card extends Component {
  render() {
    return (
      <div className={colorToClass(this.props.color)}>
        <div className="card-text">
          <div className="card-text-limit">
            <div className="cardcount">
              {`${this.props.count}x`}
            </div>
            <div className="cardname">
              {this.props.name}
            </div>
          </div>
          <span className="cost">
            {
              this.props.cost.map((cost, idx) => 
                // Hardcoded assumption that all split costs are of the form (X/Y)
                // This is dubious, but I can't see any other way to do it
                // using index as key - this is a static property of the card, so not an issue
                cost.includes('/') ?
                  <span className="mi-split mi-shadow mi-split-color" key={idx}>
                    <i className={`mi mi-${cost[1].toLowerCase()}`}/>
                    <i className={`mi mi-${cost[3].toLowerCase()}`}/>
                  </span> :
                  <i className={`mi mi-mana mi-shadow mi-${cost.toLowerCase()}`} key={idx}/>
              )
            }
          </span>
        </div>
      </div>
    );
  }
}

export default Card