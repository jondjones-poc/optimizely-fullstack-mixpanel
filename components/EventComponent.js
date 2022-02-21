import React from 'react';
import * as optimizelyReactSDK from '@optimizely/react-sdk';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/Product.module.scss';

// Get DataFile
const optimizely = optimizelyReactSDK.createInstance({
    sdkKey: process.env.NEXT_PUBLIC_OPTI_TOKEN,
})

class TheComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  onEvent = () => {

    console.log('TheComponent:onEvent', this.props.itemId)

    optimizely.track(
      'user-clicked-button', 
      uuidv4(),
      {
        property: this.props.itemId
      }
      );
  }

  render() {

    return (
        <button onClick={this.onEvent} className={`snipcart-add-item ${styles.product__button}`}>
         Enquire Now
        </button>
    )}
}

const EventComponent = optimizelyReactSDK.withOptimizely(TheComponent);

export default EventComponent;