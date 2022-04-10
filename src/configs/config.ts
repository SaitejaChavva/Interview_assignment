/****************************
 Configuration File (Development Server)
 ****************************/
 export const config = {
    db: 'mongodb://localhost:27017/admin',//99 DB server
    
    // db: 'mongodb://username:password@10.2.99.11/cambridge_dev',//99 DB server
    mongoDBOptions: {
        reconnectTries: 5,
        reconnectInterval: 1000,
        keepAlive: 1,
        connectTimeoutMS: 30000,
        // useNewUrlParser: true,
        useFindAndModify: false,
        native_parser: true,
        poolSize: 5,
        user: 'cambridge_staging',
        pass: 'cambridge_staging'
        // user: 'cambridge_dev',
        // pass: 'cambridge_dev'
    },

    sessionSecret: 'indNIC2305',
    securityToken: 'indNIC2305',
    securityRefreshToken: 'indNIC2305refresh',

    baseApiUrl: '/api',
    host: "localhost",
    // host: "10.2.99.23:5024",
    serverPort: '5024',
    tokenExpiry: 361440, // Note: in seconds! (1 day)
    rootUrl: 'http://localhost:5024/api', 

    // rootUrl: 'http://localhost:5024/api',
    // rootUrl: 'http://10.2.99.23:5024/api',
    frontUrl: 'http://cambridge.node.indianic.com',
    // frontUrl: 'http://10.2.99.23:5022',
    frontUrlAngular: 'http://cambridge.node.indianic.com',

    defaultEmailId: 'meanstack2017@gmail.com',
    apiUrl: 'http://localhost:5024',
    // apiUrl: 'http://10.2.99.23:5024',

    perPage: 20,
    adPerPage: 4,

    s3upload: true,
    localImagePath: "/public/upload/images/",
    s3ImagePath: "http://d27q3mnknorizt.cloudfront.net/",

    dontAllowPreviouslyUsedPassword: true,
    storePreviouslyUsedPasswords: true,

    forceToUpdatePassword: true,
    updatePasswordPeriod: 4, // In months

    allowedFailAttemptsOfLogin: 5,
    isBlockAfterFailedAttempt: true,
    timeDurationOfBlockingAfterWrongAttempts: 15, // In minutes

    tokenExpirationTime: 540, // minutes
    forgotTokenExpireTime: 60, // minutes
    verificationTokenExpireTime: 60, // minutes

    extendTokenTime: true,
    useRefreshToken: true,

    isHTTPAuthForSwagger: false,
    HTTPAuthUser: "root",
    HTTPAuthPassword: "root"
};
