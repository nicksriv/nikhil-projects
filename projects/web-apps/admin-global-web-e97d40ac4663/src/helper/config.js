export var firebaseConfig = {
    apiKey: 'AIzaSyBoUdiDtzQdC-m4nj9CPY5SvY7uKJGL71k',
    authDomain: 'matx-15ede.firebaseapp.com',
    databaseURL: '',
    projectId: 'matx-15ede',
    storageBucket: 'matx-15ede.appspot.com',
    messagingSenderId: '348111707030',
    appId: '1:348111707030:web:70c4ca4eb3f1dbd18e1bb7',
    measurementId: 'G-806629YLNN',
}

export const auth0Config = {
    client_id: 'XmminWIs0S8gR3gIRBydYLWbF58x81vK',
    domain: 'matx.us.auth0.com',
}

export const config = {
    isProd: process.env.NODE_ENV === 'production',
    production: {
        api_endpoint: process.env.REACT_APP_DEVELOPMENT_API_ENDPOINT || '',
        screenbuilder_api_endpoint: process.env.REACT_APP_DEVELOPMENT_SCREEN_BUILDER_API_ENDPOINT || '',
        api_base_url: (process.env.REACT_APP_DEVELOPMENT_API_ENDPOINT || '') + 'api/v1/',
        onboarding_api_base_url: (process.env.REACT_APP_DEVELOPMENT_API_ENDPOINT || '') + 'api/v1/',
        job_api_base_url: (process.env.REACT_APP_DEVELOPMENT_JOB_API_ENDPOINT || '') + 'api/v1/'
    },
    development: {
        api_endpoint: process.env.REACT_APP_DEVELOPMENT_API_ENDPOINT || '',
        screenbuilder_api_endpoint: process.env.REACT_APP_DEVELOPMENT_SCREEN_BUILDER_API_ENDPOINT || '',
        api_base_url: (process.env.REACT_APP_DEVELOPMENT_API_ENDPOINT || '') + 'api/v1/',
        onboarding_api_base_url: (process.env.REACT_APP_DEVELOPMENT_API_ENDPOINT || '') + 'api/v1/',
        job_api_base_url: (process.env.REACT_APP_DEVELOPMENT_JOB_API_ENDPOINT || '') + 'api/v1/'
    },
    imageBaseUrl: process.env.REACT_APP_CDN,
}