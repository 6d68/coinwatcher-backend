import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-central-1' });

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}
const dynamoDb = new AWS.DynamoDB.DocumentClient(options);

export function put(params) {
  return dynamoDb.put(params).promise();
}

export function query(params) {
  return dynamoDb.query(params).promise();
}

export function scan(params) {
  return dynamoDb.scan(params).promise();
}

export function batchGet(params) {
  return dynamoDb.batchGet(params).promise();
}

export function batchWrite(params) {
  return dynamoDb.batchWrite(params).promise();
}