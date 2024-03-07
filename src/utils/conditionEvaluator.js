function evaluateCondition(questionValue, condition, filterValue) {
    switch (condition) {
        case 'equals': return questionValue == filterValue;
        case 'does_not_equal': return questionValue != filterValue;
        case 'greater_than': return new Date(questionValue) > new Date(filterValue);
        case 'less_than': return new Date(questionValue) < new Date(filterValue);
        default: return false;
    }
}

module.exports = { evaluateCondition };