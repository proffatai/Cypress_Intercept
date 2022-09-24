Cypress intercept is a way of mocking server responses. Assuming an endpoint that is needed to carry out some action is yet to be ready for use or the endpoint is just returning some error data, we can mock / create the response of the server via cypress intercept.

We can create a fixture file with some json data in it, and then run the request expecting the system to return the user defined response that we created inside the fixture file.

Intercept allows testers / devs to mock or fake the actual response from the server by providing some data which will serve as the expected response for the server.

Spying: Basically what we trying to do is to access the network but we are not messing with the response gotten from the server. We are only spying or geting the real response from the server and we are not messing with the response


Stubing / Mocking: This is when we are actually mocking / providing dummy data that acts as the actual response from the server. 