import mixpanel from 'mixpanel-browser';


// Track MixPanel events normally
export const trackMixPanelNormal = (userId, eventName) => {

    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, 
        {debug: true}); 

    
  mixpanel.identify(userId);
  mixpanel.track(`${eventName}`,
    {"area": "mixpanelApi"});
}
  
export default trackMixPanelNormal;