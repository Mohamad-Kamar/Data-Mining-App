import * as AWS from 'aws-sdk';

const region = 'us-east-1';

AWS.config.update({
    region,
    accessKeyId: process.env.REACT_APP_DYNAMO_DB_KEY_ID,
    secretAccessKey: process.env.REACT_APP_DYNAMO_DB_SECRET_ACCESS_KEY
});

export const dynamoDocClient = new AWS.DynamoDB.DocumentClient();
