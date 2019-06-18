package utilities;

import static spark.Spark.before;
import static spark.Spark.options;

public class RestConfiguration {
	
	/**
	 * Initialize the CORS of the app for allowing external requests
	 */
	public static void initializeCors() {
		options("/*",
				(request, response) ->{

					String accessControlRequestHeaders = request
							.headers("Access-Control-Request-Headers");
					if (accessControlRequestHeaders != null) {
						response.header("Access-Control-Allow-Headers",
								accessControlRequestHeaders);
					}

					String accessControlRequestMethod = request
							.headers("Access-Control-Request-Method");
					if (accessControlRequestMethod != null) {
						response.header("Access-Control-Allow-Methods",
								accessControlRequestMethod);
					}

					return "OK";
				});

		before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
	}
	
	/**
	 * Gets the port in which the main app will run
	 * @return Port number
	 */
	public static int getHerokuAssignedPort(int portNumber) {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        System.out.println("Running in port: " + portNumber);
        return portNumber;
    }
}
