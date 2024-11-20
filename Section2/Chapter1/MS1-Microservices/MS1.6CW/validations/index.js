function validateFlightQueryParams(query){
    const errors =[];
    if(!query.origin){
        errors.push("origin is required")
    }
    if(!query.destination){
        errors.push("destination is required")
    }
    return errors;
}

module.exports = {validateFlightQueryParams}