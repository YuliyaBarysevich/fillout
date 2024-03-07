# Fillout

## Description

This project implements a Node.js server using Express to fetch and filter form responses from an external API. It provides an endpoint that allows clients to retrieve form submissions based on custom filtering criteria, including question ID, condition (equals, does not equal, greater than, less than), and value.

## Technologies Used

- **Node.js**
- **Express.js**
- **Axios**

## Contact

Yuliya Barysevich - <barysevich.yuliya@gmail.com>

Project Link: - [https://fillout-778eb75e969a.herokuapp.com/](https://fillout-778eb75e969a.herokuapp.com/)

## Installation

1. Clone the repository

```sh
git clone https://github.com/YuliyaBarysevich/fillout.git
```

2. Install NPM packages

```sh
npm install
```

3. Create a .env file in the root directory and add your API key

```sh
API_KEY=your_api_key_here
```

4. Start the server

```sh
npm start
```

## Usage  

The server provides an endpoint for fetching and filtering form responses. Here's how to use it:

### Fetching Filtered Responses

Make a GET request to the endpoint with the desired query parameters.

Endpoint:

```javascript
GET /:formId/filteredResponses
```

Query Parameters:

- **limit** (optional): Maximum number of responses to retrieve per request.
- **afterDate** (optional): Filter responses submitted after this date.
- **beforeDate** (optional): Filter responses submitted before this date.
- **offset** (optional): Starting position from which to fetch the responses.
- **status** (optional): Fetch in_progress for unfinished submissions.
- **includeEditLink** (optional): Include a link to edit the submission.
- **sort** (optional): Sort order, can be asc or desc.
- **filters** (required): JSON stringified array of filter conditions.

## Test Cases

1. Fetch all responses for form `cLZojxk94ous` where the name equals "Johnny" and the number of employees is greater than 1.

><https://fillout-778eb75e969a.herokuapp.com/cLZojxk94ous/filteredResponses?filters=%5B%7B%22id%22%3A%22bE2Bo4cGUv49cjnqZ4UnkW%22%2C%22condition%22%3A%22equals%22%2C%22value%22%3A%22Johnny%22%7D%2C%7B%22id%22%3A%22fFnyxwWa3KV6nBdfBDCHEA%22%2C%22condition%22%3A%22greater_than%22%2C%22value%22%3A1%7D%5D>

2. Fetch all responses for form `cLZojxk94ous` where the name equals "Dev" and the date for the yearly check-in that is greater than "2024-06-01".

><https://fillout-778eb75e969a.herokuapp.com/cLZojxk94ous/filteredResponses?limit=100&afterDate=2024-01-01T00:00:00.000Z&filters=%5B%7B%22id%22%3A%22bE2Bo4cGUv49cjnqZ4UnkW%22%2C%22condition%22%3A%22equals%22%2C%22value%22%3A%22Dev%22%7D%2C%7B%22id%22%3A%22dSRAe3hygqVwTpPK69p5td%22%2C%22condition%22%3A%22greater_than%22%2C%22value%22%3A%222024-06-01%22%7D%5D>
