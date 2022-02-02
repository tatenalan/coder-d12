class PermissionException extends Error {
    constructor(error, message){
        super();
        this.error = error;
        this.name = 'PermissionException';
        this.message = message;
    }
}
  module.exports = PermissionException