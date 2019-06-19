package utilities;

import java.sql.SQLException;

import com.j256.ormlite.jdbc.JdbcConnectionSource;
import com.j256.ormlite.support.ConnectionSource;

/**
 * Database credentials and basic configuration
 * @author Gabriel Pinto
 */
public class DatabaseConfiguration {

	private static String name = "";

	private static String user = "";

	private static String password = "";

	private static String port = "";

	private static String server = "";


	/**
	 * Creates the connection of the remote database
	 * @param connectionSource Object that represents the connection source
	 */
	public static ConnectionSource initializeDB() {
		ConnectionSource connectionSource;
		try {
			connectionSource = new JdbcConnectionSource("jdbc:mysql://" + server + ":" + port + "/" + name );
			((JdbcConnectionSource)connectionSource).setUsername(user);
			((JdbcConnectionSource)connectionSource).setPassword(password);
			return connectionSource;
		} catch (SQLException e) {
			e.printStackTrace();
			e.getCause();
			e.getErrorCode();
			return null;
		}
	}
}
