import bcrypt from "bcrypt";
import db from "../../db/index.js";
import { v4 as uuidv4 } from "uuid";
import { USERS } from "./mock.js";

const seedUsers = async () => {
  for (const user of USERS) {
    const { email, password, user_name, role } = user;
    const id = uuidv4();
    try {
      const [exists] = await db.execute("SELECT * FROM user WHERE email = ?", [
        email,
      ]);
      if (exists.length > 0) {
        console.log(`이미 존재하는 email ${email}`);
        continue;
      }
      const password_hash = await bcrypt.hash(password, 10);

      await db.execute(
        `INSERT INTO user(id, email, password_hash, user_name, created_at, role)
            VALUES(?, ?, ?, ?, NOW(), ?)`,
        [id, email, password_hash, user_name, role]
      );

      console.log(`등록 성공: ${email}`);
    } catch (error) {
      console.error(`등록 실패: ${email}`, error);
    }
  }
};

seedUsers();
