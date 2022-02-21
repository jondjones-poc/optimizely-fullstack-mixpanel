import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid';

import Jumbotron from "../components/Jumbotron";
import ProductList from "../components/ProductList";

import item1Picture from "../public/item1.jpg";
import item2Picture from "../public/item2.jpg";
import item3Picture from "../public/item3.jpg";
import item4Picture from "../public/item4.jpg";

import {
  createInstance,
  OptimizelyFeature,
  OptimizelyProvider
} from '@optimizely/react-sdk';

import { onActivate, onTrack, onDecision } from '../utils/OptimizelyNotificationHandler';
import { enums } from '@optimizely/react-sdk';

import trackMixPanelNormal from '../utils/MixPanelTracking';

const optimizely = createInstance({
  sdkKey: process.env.NEXT_PUBLIC_OPTI_TOKEN
});

export default function Home() {

  const userId = uuidv4();

  // Normal Mix Panel
  trackMixPanelNormal(userId, 'Visited Homepage');

  // Setup Experiment Events To Mix Panel
  optimizely.onReady().then(() => {
    console.log('onReady');

    optimizely.notificationCenter.addNotificationListener(enums.NOTIFICATION_TYPES.ACTIVATE, onActivate);
    optimizely.notificationCenter.addNotificationListener(enums.NOTIFICATION_TYPES.TRACK, onTrack);
    optimizely.notificationCenter.addNotificationListener(enums.NOTIFICATION_TYPES.DECISION, onDecision);
  })

  return (
    <>
      <Head>
        <title>
          MyStore E-Commerce
        </title>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Jumbotron />

        <OptimizelyProvider
          optimizely={optimizely}
          user={{
            id: userId,
          }}
        >
            <OptimizelyFeature feature="display_welcome_message">
              {(enabled) => {

                if (enabled) {
                  return (
                    <div className="welcome-message">
                      <h3>
                        Welcome, these listings are enabled using optimizely Fullstack
                      </h3>

                      <ProductList products={products}/>
                    </div>
                )
              }}}
            </OptimizelyFeature>
          </OptimizelyProvider>

      </main>
   </>
  )
}

export const products = [
  {
      id: "property1",
      name: "Hollington House, Flitton Hill, Flitton",
      price: 1850000.00,
      image: item1Picture,
      description: "A large five bedroom detached property set within a plot of circa 2.5 acres offering wonderful views stretching over the centralised pond and established gardens with ample parking.",
      url: '/api/products/property1'
  },
  {
      id: "property2",
      name: "Roxton Road, Great Barford, Bedford, MK44",
      price: 1800000,
      image: item2Picture,
      description: "Set within grounds of just over 15 acres and presenting a complete lifestyle choice to the next owners, this unique detached family home occupies an elevated position overlooking the whole of the grounds.",
      url: '/api/products/property2'
  },
  {
      id: "property3",
      name: "Hemel Hempstead Road, Dagnall, Berkhamsted",
      price: 1500000,
      image: item3Picture,
      description: "Gade Plas is a detached house of around 2951 sqft, built circa 1964, set on a plot of some 2.83 acres of garden and paddock and is surrounded on all sides by fields and countryside with stunning rural views.",
      url: '/api/products/property3'
  },
  {
      id: "property4",
      name: "Road, Kensworth, Bedfordshire, LU6",
      price: 1750000,
      image: item4Picture,
      description: "Goldmoss House is a magnificent 4/5 bedroom detached residence set back within this gated development of just 4 properties with superb uninterrupted views across the countryside",
      url: '/api/products/property4'
  }
]

export const getStaticProps = async (context) => {

  return {
      props: {
          products
      }
  }
}