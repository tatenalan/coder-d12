class ServiceException extends Error {
    constructor(error, message){
        super();
        this.error = error;
        this.name = 'ServiceException';
        this.message = message;
    }
}
  module.exports = ServiceException