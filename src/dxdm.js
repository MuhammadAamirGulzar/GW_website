/**
 * NOTE:-
 * 
 * --->>>FOR TESTING MODE
 *  IN THIS FILE
 *      Comment endpoint with value '/datainsight'
 *      Uncomment endpoint with ''
 *  IN package.json
 *      Remove the following line
 *          "homepage": "http://isb.nu.edu.pk/datainsight/",
 *      
 * --->>>FOR PRODUCTION MODE
 *  IN THIS FILE
 *      Uncomment endpoint with value '/datainsight'
 *      Comment endpoint with ''
 *  IN package.json
 *      Add the following line
 *          "homepage": "http://isb.nu.edu.pk/datainsight/",
 *      
 */

// var endpoint = '/datainsight' //should only be enabled in the production mode
var endpoint = ''          //should only be enabled in the testing mode
export default endpoint;