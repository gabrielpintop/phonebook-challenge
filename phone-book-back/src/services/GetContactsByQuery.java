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

import static spark.Spark.get;
import static spark.Spark.port;

import java.sql.SQLException;
import java.util.List;

import utilities.DatabaseConfiguration;
import utilities.RestConfiguration;


public class GetContactsByQuery {

	private static ConnectionSource connectionSource;

	private static Dao<Contact, String> contactDao;

	public static void main(String[] args) {

		// Defines the port to use
		port(RestConfiguration.getHerokuAssignedPort(4567));

		// Initialize the cors
		RestConfiguration.initializeCors();

		try {
			createConnection();
			// Creates the table CONTACT if it doesn't exist
			TableUtils.createTableIfNotExists(connectionSource, Contact.class);

			// Search for all the contacts in the database
			get("/api/getContactsByQuery/:query", "application/json", (req, res) -> {
				try {
					if(!connectionSource.isOpen("")) {
						createConnection();
					}
					String query = "%" + req.params(":query") + "%";
					QueryBuilder<Contact, String> queryBuilder = contactDao.queryBuilder();
					Where<Contact, String> where = queryBuilder.where();			
					where.like("lastName", query);
					where.or();
					where.like("firstName", query);
					where.or();
					where.like("phone", "'" + query + "'");
					System.out.println(where.getStatement());
					List<Contact> contacts = queryBuilder.query();
					String json = new Gson().toJson(contacts);
					res.body(json);
					res.status(200);
				} catch (SQLException e) {
					res.status(404);
					JsonObject jsonObject = new JsonObject();
					jsonObject.addProperty("errorMessage", "There was a problem getting the contacts by query.");
					jsonObject.addProperty("error", e.getMessage());
				}
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
