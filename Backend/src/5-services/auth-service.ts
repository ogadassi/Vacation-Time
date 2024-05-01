import { OkPacketParams } from "mysql2";
import { UserModel } from "../3-models/user-model";
import { dal } from "../2-utils/dal";
import { cyber } from "../2-utils/cyber";
import { CredentialsModel } from "../3-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";
import { RoleModel } from "../3-models/role-model";

class AuthService {
  public async register(user: UserModel): Promise<string> {
    user.validateInsert();

    const isTaken = await this.isEmailTaken(user.email);
    if (isTaken) throw new ValidationError("Email already taken.");

    user.roleId = RoleModel.User;
    user.firstName =
      user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
    user.lastName =
      user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
    user.password = cyber.hashPassword(user.password);

    const sql = `INSERT INTO users(firstName, lastName, email, password, roleId)
            VALUES(?,?,?,?,?)`;
    const info: OkPacketParams = await dal.execute(sql, [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.roleId,
    ]);
    user.id = info.insertId;
    const token = cyber.getNewToken(user);
    return token;
  }

  public async login(credentials: CredentialsModel): Promise<string> {
    credentials.validate();

    credentials.password = cyber.hashPassword(credentials.password);

    const sql = `SELECT * FROM users 
            WHERE email = ? AND password = ?`;
    const users = await dal.execute(sql, [
      credentials.email,
      credentials.password,
    ]);

    const user = users[0];
    if (!user) throw new UnauthorizedError("Incorrect email or password.");
    const token = cyber.getNewToken(user);
    return token;
  }

  private async isEmailTaken(email: string): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT * FROM users WHERE email = ?) AS isTaken`;
    const result = await dal.execute(sql, [email]);
    const isTaken = result[0].isTaken;
    return isTaken === 1;
  }
}

export const authService = new AuthService();
