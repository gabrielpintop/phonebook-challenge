The project was made with Java 1.8 and all the dependencies are included in it with the intention of having a fast implementation. Spark is used for creating the request, and ORMLite is used for working with the database.

# Running the app
1) Install Java 1.8 if you don't have it
2) Install [Eclipse](https://www.eclipse.org/)
3) Import the project in Eclipse using the option "Existing projects into Workspace"
4) Change the database credentials in "src/utilities/DatabaseConfiguration.java". The one I used was mySQL. If is a new database, make sure to run GetContacts.java first, for creating the CONTACT table
5) Go to "src/services/" folder and run the service you want to test using "Run As - Java Application". Each services runs on a different port and they run as following:

- GetContacts: GET - http://localhost:4568/api/getContacts
- GetContactsByQuery: GET - http://localhost:4567/api/getContactsByQuery/:query
- CreateContact: POST - http://localhost:4569/api/createContact 
- DeleteContact: DELETE - http://localhost:4570/api/deleteContact/:id

# Deployment
1) Install [ANT](https://ant.apache.org)
2) Compile each service and create a Jar file for each. For making these, go to "services-jars" folder and execute in a CMD "ant clean compile jar -DserviceName={JavaServiceName}"
3) A jar should be generated
4) Create an account in heroku, install heroku cli and configure your account
5) Run in a CMD "heroku plugins:install java"
6) Create a new heroku app for the service with "heroku create --no-remote {serviceAppName}"
7) Run "heroku deploy:jar {JavaServiceName}.jar --app {serviceAppName}
8) The service should deploy and now you can access to it with the generated link
