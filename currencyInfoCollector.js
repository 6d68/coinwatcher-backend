import * as coinmarketcap from './libs/coinmarketcap';
import * as synchronizer from './libs/synchronizer';

export async function main(event, context, callback) {

  try {
    const result = await coinmarketcap.Get()
    await synchronizer.Sync(result)
    
    callback(null, 'Successfully updated currency informations');
  }
  catch (e) {
    console.log(e);
    callback(null, 'Error updating currency informations');
  }
};
