/*jslint node: true */
'use strict';

module.exports = function() {
    /**
     * Holds the list of services.
     *
     * @type {Object}
     */
    var services = {};

    /**
     * Check whether a service exists.
     *
     * @param  {String}  id The service name.
     *
     * @return {Boolean} Returns true if the service exists, otherwise returns false.
     */
    this.has = function(id) {
        return services.hasOwnProperty(id);
    };

    /**
     * Set a service definition.
     *
     * @param {String} id The service identifier.
     * @param {Object} service The service object to set.
     */
    this.set = function(id, service) {

        // Replace the specified service
        services[id] = service;

        return this;
    };

    /**
     * Get a service.
     *
     * @param {String} id The service identifier.
     *
     * @return {Object} Returns the service object.
     */
    this.get = function(id) {

        var service = services[id];
      
        return service;
    };
};