// netlify-functions/proxy.js
const axios = require('axios');

exports.handler = async function (event, context) {
  const { url, method, data, headers } = JSON.parse(event.body);

  try {
    const response = await axios({
      method: method || 'get',
      url,
      data: data || null,
      headers: headers || {},
    });

    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
