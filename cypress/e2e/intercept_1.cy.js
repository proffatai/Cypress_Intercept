describe('Working with Intercepts', () => {
  
  it('Basic Spying', () => {
    cy.visit('https://jsonplaceholder.typicode.com/')
    
    // we used an alias to save the intercept. We want to intercept the network when the users request is hit
    cy.intercept('/users').as('Hold') //this would intercept the baseUrl+thePathParameter,
      //it would spy->https://jsonplaceholder.typicode.com/users whenever the response is available after the request has been sent

    //this is the page we want to intercept
    cy.get(':nth-child(5) > tbody > :nth-child(6) > :nth-child(1)').click() // this would open https://jsonplaceholder.typicode.com/users
    
    //we use @ to reference alias: We have already created our intercept on line 7 to have the url https://jsonplaceholder.typicode.com/users
    //Now since we have clicked on the users path on lind 10, our intercept will become active and it spies the network and stores the response
    //inside the alias that we can view as shown below

    cy.wait('@Hold').then(res=>{ //lets wait for the spyed response. res will hold the response
      cy.log(JSON.stringify(res)) //we are now displaying the response
      expect(res.response.body).to.have.length(10) // I have previously gone to check the length of the response body and I found out it is 10
    })
  })

  it('Basic Mocking', () => {
    cy.visit('https://jsonplaceholder.typicode.com/')
    
    //We expect the server to return the data we entered when the GET users request(https://jsonplaceholder.typicode.com/users) is hit
    cy.intercept('GET','/users',{message:"Hello world", sex:"male"}).as('Hold') //we are mocking the response of the server.
    // Meaning the expected response of the server is the third argument we passed: {message:"Hello world", sex:"male"}

    //let's now actually click on the users path
    cy.get(':nth-child(5) > tbody > :nth-child(6) > :nth-child(1)').click() // this would open https://jsonplaceholder.typicode.com/users

    cy.wait('@Hold') // we are calling the alias that we created
  })


  it.only('Basic Mocking with fixtures', () => {
    cy.visit('https://jsonplaceholder.typicode.com/')
    
    //We expect the server to return the data we entered when the GET users request(https://jsonplaceholder.typicode.com/users) is hit
    cy.intercept('GET','/users',{fixture:"example.json"}).as('Hold') //we are mocking the response of the server. 
    // Meaning the expected response of the server is the content of the fixture (example.json)
    //we can decide to remove / ignore the keys such as method and path by providing only the values with no {} as shown in the it() above
    
    cy.get(':nth-child(5) > tbody > :nth-child(6) > :nth-child(1)').click() // this would open https://jsonplaceholder.typicode.com/users

    cy.wait('@Hold').then(res=>{ //lets wait for the spyed response. res will hold the response
      expect(res.response.body).to.have.property('name', "Using fixtures to represent data") 
      expect(res.response.statusCode).to.eq(200) 
    })
  })
})