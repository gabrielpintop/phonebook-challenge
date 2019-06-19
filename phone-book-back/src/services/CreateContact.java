package services;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.support.ConnectionSource;
import models.Contact;
import static spark.Spark.post;
import static spark.Spark.port;
import java.sql.SQLException;
import utilities.DatabaseConfiguration;
import utilities.RestConfiguration;


/**
 * Service that allows the creation of a new contact in the database
 * @author Gabriel Pinto
 */
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

				// Verifies if the connection is active
				if(!connectionSource.isOpen("CONTACT")) {
					createConnection();
				}

				JsonParser parser = new JsonParser();
				JsonObject jsonObject = parser.parse(req.body()).getAsJsonObject();
				res.status(404);

				// Validates that the first name, last name and phone are present on the body of the request
				if(jsonObject.has("firstName") && jsonObject.has("lastName") && jsonObject.has("phone")) {
					try {
						String firstName = jsonObject.get("firstName").getAsString();
						String lastName = jsonObject.get("lastName").getAsString();
						Long phone = jsonObject.get("phone").getAsLong();

						// Creates and saves a new contact
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

						// The phone number must be unique
						if(e.getSQLState().equals("23000")) {
							errorMessage += " The number is already saved.";
						} else {
							// In case of having another SQL error, the connection is restarted
							connectionSource.close();
							createConnection();
						}
						jsonObject.addProperty("errorMessage", errorMessage);
						jsonObject.addProperty("error", "DB: " + e.getMessage());
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
		}
		catch (SQLException e) {
			e.printStackTrace();
		}

	}

	/**
	 * Creates the connection with the database and initializes the DAO
	 * @throws SQLException
	 */
	private static void createConnection() throws SQLException {
		// Configures the database connection
		connectionSource = DatabaseConfiguration.initializeDB();

		// Creates a new DAO
		contactDao = DaoManager.createDao(connectionSource, Contact.class);
	}

}
