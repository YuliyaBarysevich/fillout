const express = require('express');
const router = express.Router();
const { fetchFormResponses } = require('../services/formService');
const { evaluateCondition } = require('../utils/conditionEvaluator');

router.get('/', (req, res) => {
    res.send(`
        <h1>Hello, my name is Yuliya Barysevich.</h1>
        <p>Welcome to my interview project!</p>
        <p>To test the custom form responses filtering feature, use the endpoint:</p>
        <code>/[formId]/filteredResponses</code>
        <p>with appropriate query parameters, such as:</p>
        <code>/cLZojxk94ous/filteredResponses?&filters=...</code>
        <p>For example:</p>
        <code>https://fillout-778eb75e969a.herokuapp.com/cLZojxk94ous/filteredResponses?filters=%5B%7B%22id%22%3A%22bE2Bo4cGUv49cjnqZ4UnkW%22%2C%22condition%22%3A%22equals%22%2C%22value%22%3A%22Dev%22%7D%2C%7B%22id%22%3A%22dSRAe3hygqVwTpPK69p5td%22%2C%22condition%22%3A%22greater_than%22%2C%22value%22%3A%222024-06-01%22%7D%5D</code>
    `);
});
  
router.get('/:formId/filteredResponses', async (req, res) => {
    const { formId } = req.params;
    const queryParams = {
        limit: req.query.limit,
        afterDate: req.query.afterDate,
        beforeDate: req.query.beforeDate,
        offset: req.query.offset,
        status: req.query.status,
        includeEditLink: req.query.includeEditLink,
        sort: req.query.sort,
    };

    let filters = [];
    if (req.query.filters) {
        try {
            filters = JSON.parse(req.query.filters);
        } catch (error) {
            return res.status(400).send('Invalid filters parameter format');
        }
    }

    try {
        const rawData = await fetchFormResponses(formId, queryParams);
        const filteredData = rawData.responses.filter(response => 
            filters.every(filter => {
                const question = response.questions.find(q => q.id === filter.id);
                if (!question) return false;
                return evaluateCondition(question.value, filter.condition, filter.value);
            })
        );

        const responseData = {
            ...rawData,
            responses: filteredData,
            totalResponses: filteredData.length,
            pageCount: Math.ceil(filteredData.length / (queryParams.limit || 150))
        };

        res.json(responseData);
    } catch (error) {
        console.error('Error fetching form responses:', error);
        res.status(500).send('Failed to fetch form responses');
    }
});

  
module.exports = router;