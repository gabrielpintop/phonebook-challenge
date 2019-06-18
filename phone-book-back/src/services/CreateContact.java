package services;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.support.ConnectionSource;
import com.j256.ormlite.table.TableUtils;
import models.Contact;

import static spark.Spark.post;
import static spark.Spark.port;

import java.sql.SQLException;
import java.util.List;

import utilities.DatabaseConfiguration;
import utilities.RestConfiguration;


public class CreateContact {

	private static ConnectionSource connectionSource;
	
	private static Dao<Contact, String> contactDao;

	public static void main(String[] args) {
		
		// Defines the port to use
		port(RestConfiguration.getHerokuAssignedPort(4569));
		
		// Initialize the cors
		RestConfiguration.initializeCors();
		
		try {
			createConnection();
			
			// Creates a new contact in the database
			post("/api/createContact", "application/json", (req, res) -> {
				if(!connectionSource.isOpen("CONTACT")) {
					createConnection();
				}
				
				JsonParser parser = new JsonParser();
				JsonObject jsonObject = parser.parse(req.body()).getAsJsonObject();
				res.status(404);
				
				if(jsonObject.has("firstName") && jsonObject.has("lastName") && jsonObject.has("phone")) {
					try {
						String firstName = jsonObject.get("firstName").getAsString();
						String lastName = jsonObject.get("lastName").getAsString();
						Long phone = jsonObject.get("phone").getAsLong();
						
						Contact newContact = new Contact();
						newContact.setFirstName(firstName);
						newContact.setLastName(lastName);
						newContact.setPhone(phone);
						
						contactDao.create(newContact);
						jsonObject = new JsonObject();
						res.status(200);
						jsonObject.addProperty("message", "The contact was successfully created.");
						
					} catch (SQLException e) {
						jsonObject = new JsonObject();
						String errorMessage = "There was an error saving the contact.";
						if(e.getSQLState().equals("23000")) {
							errorMessage += " The number is already saved.";
						}
						jsonObject.addProperty("errorMessage", errorMessage);
						jsonObject.addProperty("error", e.getMessage());					
					} catch (Exception e) {
						jsonObject = new JsonObject();
						jsonObject.addProperty("errorMessage", "The value of the attributes is not valid.");
						jsonObject.addProperty("error", e.getMessage());
					}
				} else {
					jsonObject = new JsonObject();
					jsonObject.addProperty("errorMessage", "Please check the attributes.");
					jsonObject.addProperty("error", "Missing attributes");
				}
				
				res.body(jsonObject.toString());
				return res.body();
			});
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	private static void createConnection() throws SQLException {
		// Configures the database connection
		connectionSource = DatabaseConfiguration.initializeDB();

		// Creates a new DAO
		contactDao = DaoManager.createDao(connectionSource, Contact.class);
	}
	
}
