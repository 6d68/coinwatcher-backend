import * as dynamoDb from './libs/dynamodb';
import { success, failure } from './libs/response';

export async function main(event, context, callback) {
  var request = require('request')

  let searchKeyword = ''
  if (event.queryStringParameters && event.queryStringParameters.keyword) {
    searchKeyword = event.queryStringParameters.keyword.toLowerCase();
  }
  else {
    callback(null, failure("no keyword specified"));
  }

  let params = {
    TableName: 'currencies',
    ProjectionExpression: "id, #n, symbol",
    FilterExpression: "contains(keywords, :s)",
    ExpressionAttributeNames: {
      "#n": "name"
    },
    ExpressionAttributeValues: {
      ":s": searchKeyword
    }
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
