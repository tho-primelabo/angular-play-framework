package controllers;

import models.User;
import play.data.Form;
import play.data.validation.Constraints;
import play.data.validation.Constraints.Required;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * This controller contains an action to handle HTTP requests to the
 * application's home page.
 */
public class HomeController extends Controller {

	/**
	 * An action that renders an HTML page with a welcome message. The
	 * configuration in the <code>routes</code> file means that this method will
	 * be called when the application receives a <code>GET</code> request with a
	 * path of <code>/</code>.
	 */
	public Result index() {
		return ok("Your new application is ready.");
	}
	public Result getUsers() {
        //java.util.List<models.User> tasks = new play.db.ebean.Model.Finder(String.class, models.User.class).all();
        return ok(play.libs.Json.toJson(User.all()));
    }
	public Result signup() {
		Form<SignUp> signUpForm = Form.form(SignUp.class).bindFromRequest();
		// System.out.println("signup here !!!!!!!!!!!!!!!!!!!!!!!!!");
		if (signUpForm.hasErrors()) {
			// System.out.println("error !!!!!!!!!!!!!!!!!!!!!!!!!");
			return badRequest(signUpForm.errorsAsJson());
		}
		SignUp newUser = signUpForm.get();
		User existingUser = User.findByEmail(newUser.email);
		if (existingUser != null) {
			return badRequest(buildJsonResponse("error", "User exists"));
		} else {
			User user = new User();
			user.setEmail(newUser.email);
			user.setPassword(newUser.password);
			user.save();
			session().clear();
			session("username", newUser.email);
			// return ok();
			return ok(buildJsonResponse("success", "User created successfully"));
		}
	}

	public Result login() {
		Form<Login> loginForm = Form.form(Login.class).bindFromRequest();
		System.out.println("login here !!!!!!!!!!!!!!!!!!!!!!!!!");
		if (loginForm.hasErrors()) {
			return badRequest(loginForm.errorsAsJson());
		}
		Login loggingInUser = loginForm.get();
		User user = User.findByEmailAndPassword(loggingInUser.email,
				loggingInUser.password);
		if (user == null) {
			return badRequest(buildJsonResponse("error",
					"Incorrect email or password"));
		} else {
			session().clear();
			session("username", loggingInUser.email);

			ObjectNode wrapper = Json.newObject();
			ObjectNode msg = Json.newObject();
			msg.put("message", "Logged in successfully");
			msg.put("user", loggingInUser.email);
			wrapper.put("success", msg);
			return ok(wrapper);
		}
	}

	public Result logout() {
		session().clear();
		return ok(buildJsonResponse("success", "Logged out successfully"));
	}

	public Result isAuthenticated() {
		if (session().get("username") == null) {
			return unauthorized();
		} else {
			ObjectNode wrapper = Json.newObject();
			ObjectNode msg = Json.newObject();
			msg.put("message", "User is logged in already");
			msg.put("user", session().get("username"));
			wrapper.put("success", msg);
			return ok(wrapper);
		}
	}

	public static class Login extends UserForm {
		@Constraints.Required
		public String password;
	}

	public static class UserForm {
		@Constraints.Required
		@Constraints.Email
		public String email;
	}

	public static class SignUp extends UserForm {
		@Required
		@Constraints.MinLength(6)
		public String password;
	}

	private static ObjectNode buildJsonResponse(String type, String message) {
		ObjectNode wrapper = Json.newObject();
		ObjectNode msg = Json.newObject();
		msg.put("message", message);
		wrapper.put(type, msg);
		return wrapper;
	}
}
