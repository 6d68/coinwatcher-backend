import * as dynamoDb from './libs/dynamodb';
import { success, failure } from './libs/response';

export async function main(event, context, callback) {

  var request = require('request')

  const params = {
    TableName: 'currencies',
  };

  try {
    const result = await dynamoDb.scan(params);
    callback(null, success(result.Items));
  }
  catch (e) {
    console.log(e)
    callback(null, failure("Something went wrong :-("));
  }
};
