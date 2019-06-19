package services;

import com.google.gson.JsonObject;
import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.support.ConnectionSource;
import models.Contact;
import static spark.Spark.delete;
import static spark.Spark.port;
import java.sql.SQLException;
import utilities.DatabaseConfiguration;
import utilities.RestConfiguration;

/**
 * Service that allows to delete an existing contact of the database
 * @author Gabriel Pinto
 */
public class DeleteContact {

	private static ConnectionSource connectionSource;

	private static Dao<Contact, String> contactDao;

	public static void main(String[] args) {

		// Defines the port to use
		port(RestConfiguration.getHerokuAssignedPort(4570));

		// Initialize the cors
		RestConfiguration.initializeCors();
		try {
			createConnection();

			// Deletes a contact by id
			delete("/api/deleteContact/:id", "application/json", (req, res) -> {
				JsonObject jsonObject = new JsonObject();
				try {

					// Verifies if the connection is active
					if(!connectionSource.isOpen("CONTACT")) {
						createConnection();
					}

					String id = req.params(":id");
					// Tries to delete the contact with the provided id
					int deleted = contactDao.deleteById(id);

					// Verifies if a contact was deleted
					if(deleted == 1) {
						jsonObject.addProperty("message", "The contact was deleted.");
						res.status(200);
					} else {
						res.status(404);
						jsonObject.addProperty("errorMessage", "The contact doesn't exist");
						jsonObject.addProperty("error", "Not existing contact with id: " + id);
					}

				} catch (SQLException e) {
					res.status(404);
					jsonObject.addProperty("errorMessage", "There was a problem deleting the contact.");
					jsonObject.addProperty("error", "DB: " + e.getMessage());
					// In case of having a SQL error, the connection is restarted
					connectionSource.close();
					createConnection();
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
