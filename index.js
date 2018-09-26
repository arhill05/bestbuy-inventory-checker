const axios = require('axios');
const https = require('https');
const agent = new https.Agent({
  rejectUnauthorized: false
});
const skus = ['5876115'];
const apiUrl =
  'http://www.bestbuy.com/productfulfillment/c/api/2.0/storeAvailability';

doWork = async () => {
  console.log('init');
  try {
    const response = await axios.post(apiUrl, {
      zipCode: '40207',
      showOnShelf: false,
      items: [
        {
          sku: skus[0],
          condition: null,
          quantity: 1,
          reservationToken: null
        }
      ]
    });

    console.log(response);

    const locAndItems = response.ispu.items.map(item => {
      const locations = response.ispu.locations.filter(x =>
        item.locations.map(y => y.locationId).contains(x.locationId)
      );

      return locations;
    });

    console.log(locAndItems);
  } catch (err) {
    console.log(err);
  }
};

doWork2 = async () => {
  const options = {
    hostname: 'www.bestbuy.com',
    path: '/productfulfillment/c/api/2.0/storeAvailability',
    port: 443,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = {
    zipCode: '40207',
    showOnShelf: false,
    items: [
      {
        sku: skus[0],
        condition: null,
        quantity: 1,
        reservationToken: null
      }
    ]
  };

  const req = https.request(options, res => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', d => {
      process.stdout.write(d);
    });
  });

  req.on('error', e => {
    console.error(e);
  });

  req.write(JSON.stringify(data));
  req.end();
};

// doWork();
doWork2();
