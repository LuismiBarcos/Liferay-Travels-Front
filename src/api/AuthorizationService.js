export default {
    createBasicAuthorizationToken
}

/**
 * Create token to basic authentication
 * @param {String} username
 * @param {String} password
 * @returns {String} Token create in base64 to Basic authentication
 */
function createBasicAuthorizationToken(username, password) {
    return window.btoa(username + ':' + password);
}