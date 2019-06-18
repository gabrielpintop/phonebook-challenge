package services;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.support.ConnectionSource;
import com.j256.ormlite.table.TableUtils;
import models.Contact;

import static spark.Spark.get;
import static spark.Spark.port;

import java.sql.SQLException;
import java.util.List;

import utilities.DatabaseConfiguration;
import utilities.RestConfiguration;


public class GetContacts {

	private static ConnectionSource connectionSource;
	
	private static Dao<Contact, String> contactDao;

	public static void main(String[] args) {
		
		// Defines the port to use
		port(RestConfiguration.getHerokuAssignedPort(4568));
		
		// Initialize the cors
		RestConfiguration.initializeCors();
		
		try {
			// Configures the database connection
			connectionSource = DatabaseConfiguration.initializeDB();
			
			// Creates a new DAO
			contactDao = DaoManager.createDao(connectionSource, Contact.class);
			
			// Creates the table CONTACT if it doesn't exist
			TableUtils.createTableIfNotExists(connectionSource, Contact.class);
			
			// Search for all the contacts in the database
			get("/api/getContacts", "application/json", (req, res) -> {
				if(!connectionSource.isOpen("")) {
					connectionSource = DatabaseConfiguration.initializeDB();
				}
				try {
					List<Contact> contacts = contactDao.queryForAll();
					String json = new Gson().toJson(contacts);
					res.body(json);
					res.status(200);
				} catch (SQLException e) {
					res.status(404);
					JsonObject jsonObject = new JsonObject();
					jsonObject.addProperty("errorMessage", "There was a problem getting the contacts.");
					jsonObject.addProperty("error", e.getMessage());
				} 
				return res.body();
			});
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
		
	}
	
}
