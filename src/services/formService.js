const axios = require('axios');

async function fetchFormResponses(formId, queryParams) {
    try {
      const apiUrl = `https://api.fillout.com/v1/api/forms/${formId}/submissions`;
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${process.env.API_KEY}`,
          'Accept': 'application/json'
        },
        params: queryParams
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching form responses:', error);
      throw error; 
    }
}

module.exports = { fetchFormResponses };