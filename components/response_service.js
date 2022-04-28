

const sendSuccessResponse = (req, res, response) => {
    const status = 200;
    res.status(status).send({ ...response, status });
};
const sendErrorResponse = (req, res, error) => {
    response=parseErrorResponse(error)
    
    const { status } = response;
    res.status(status).send(response);
    
};
function parseErrorResponse(errors) {
    let { status = 500, message: error_message, error: error_detail } = errors;

    return { ...errors, status, errors: [error_detail], messages: [error_message] };
  }
module.exports = {
    sendSuccessResponse,
    sendErrorResponse
}