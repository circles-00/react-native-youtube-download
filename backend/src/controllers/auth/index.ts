import AuthService from "../../services/auth/AuthService";
import AuthController from "./AuthController";
import ValidationService from "../../services/validation/ValidationService";
import {db} from "../../db/db";

const validationService = new ValidationService()
const authService = new AuthService(validationService, db.users)

const authController = new AuthController(authService)

export default authController
