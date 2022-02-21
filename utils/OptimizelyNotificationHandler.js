import mixpanel from 'mixpanel-browser';
mixpanel.init(process.env.NEXT_MIXPANEL_TOKEN, {debug: true}); 

export const onActivate = (activateObject) => {         
        
    console.log('onActivate', activateObject)   
    
    try {
        mixpanel.track("experimentActive");
    } catch (error) {
        throw("onActivate", error);
    }
}

export const onDecision = (decisionObject) => {

    console.log('onDecision', decisionObject);

    const featureKey = "display_welcome_message";

    try {
        const configData =  {
            key: decisionObject.decisionInfo.featureEnabled,
            featureEnabled: decisionObject.decisionInfo.featureEnabled,
            source: decisionObject.decisionInfo.source,
            userId: decisionObject.userId
        }

        mixpanel.track(
            featureKey,
            configData
        );

        mixpanel.people.set(configData);

    } catch (error) {
        throw("onDecision error", error);
    }
  }
  
  export const onTrack = (trackObject) => {

    console.log('onTrack', onTrack)   

    mixpanel.track(
        trackObject,
        {"area": "notificationHandler"}
    );

    mixpanel.people.set({ "HasBeenBucketedIntoExperiment": true });
  }

