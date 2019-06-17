package services;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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
		// Configures the database connection
		connectionSource = DatabaseConfiguration.initializeDB();
		
		// Defines the port to use
		port(RestConfiguration.getHerokuAssignedPort());
		
		// Initialize the cors
		RestConfiguration.initializeCors();
		
		try {
			// Creates a new DAO
			contactDao = DaoManager.createDao(connectionSource, Contact.class);
			
			// Creates the table CONTACT if it doesn't exist
			TableUtils.createTableIfNotExists(connectionSource, Contact.class);
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		// Search for all the contacts in the database
		get("/api/getContacts", "application/json", (req, res) -> {
			try {
				List<Contact> contacts = contactDao.queryForAll();
				String json = new Gson().toJson(contacts);
				res.body(json);
				res.status(200);
			} catch (SQLException e) {
				res.status(404);
				res.body("{\"errorMessage\":\"There was a problem getting the contacts\", \"error\":\"" + e.getMessage() + "\"}");
			} 
			return res.body();
		});
		
	}
	
}
