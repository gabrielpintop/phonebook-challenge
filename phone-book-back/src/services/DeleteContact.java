package services;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.stmt.PreparedQuery;
import com.j256.ormlite.stmt.QueryBuilder;
import com.j256.ormlite.stmt.Where;
import com.j256.ormlite.support.ConnectionSource;
import com.j256.ormlite.table.TableUtils;
import models.Contact;

import static spark.Spark.delete;
import static spark.Spark.port;

import java.sql.SQLException;
import java.util.List;

import utilities.DatabaseConfiguration;
import utilities.RestConfiguration;


public class DeleteContact {

	private static ConnectionSource connectionSource;

	private static Dao<Contact, String> contactDao;

	private static boolean open = true;

	public static void main(String[] args) {

		// Defines the port to use
		port(RestConfiguration.getHerokuAssignedPort(4570));

		// Initialize the cors
		RestConfiguration.initializeCors();
		try {
			if(!connectionSource.isOpen("CONTACT")) {
				createConnection();
			}

			// Deletes a contact by id
			delete("/api/deleteContact/:id", "application/json", (req, res) -> {
				createConnection();
				JsonObject jsonObject = new JsonObject();
				try {
					open = connectionSource.isOpen("CONTACT");
					System.out.println(open);
					if(!open) {
						createConnection();
					}
					String id = req.params(":id");
					int deleted = contactDao.deleteById(id);
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
					jsonObject.addProperty("error", e.getMessage());
				}
				res.body(jsonObject.toString());

				return res.body();
			});
		}
		catch (SQLException e) {
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
