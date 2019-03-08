const routes = require('next-routes')() // The second set of () means that the require call returns a function, and that function will run immidiately after the require call.

routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show') // the ':' means that 'address' will be a variable which is passed to the component
    .add('/campaigns/:address/requests', '/campaigns/requests/index')
    .add('/campaigns/:address/requests/new', '/campaigns/requests/new')
module.exports = routes