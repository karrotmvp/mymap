export default () => ({
    service_env: process.env.SERVICE_ENV,
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
    },
    daangn: {
        oapiuri: process.env.OAPIURI,
        openapiuri: process.env.OPENAPIURI,
        poiuri: process.env.POIURI,
        scope: process.env.SCOPE,
        app_id: process.env.APP_ID,
        app_secret: process.env.APP_SECRET,
        api_key: process.env.API_KEY,
    },
    jwt: {
        secret: process.env.SECRET
    },
    log: {
        debug: process.env.DEBUG
    },
    mixpanel: {
        token: process.env.MIXPANEL_TOKEN,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    security: {
        apikey1: process.env.APIKEY1,
        apikey2: process.env.APIKEY2
    },
    slack: {
        webhook: process.env.SLACK_WEBHOOK
    }
})