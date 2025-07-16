import db from "../../../db/index.js";
import bcrypt from "bcrypt";

export default async function userLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "이메일과 비밀번호를 입력해 주세요." });
  }

  try {
    const [rows] = await db.execute("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    console.log(rows);
    if (rows.length < 1) {
      return res
        .status(400)
        .json({ success: false, message: "존재하지 않는 이메일입니다." });
    }

    const user = rows[0];

    const pwMatch = await bcrypt.compare(password, user.password_hash);

    if (!pwMatch) {
      return res
        .status(400)
        .json({ success: false, message: "비밀전호가 일치하지 않습니다." });
    }

    if (pwMatch) {
      await db.execute("UPDATE user SET last_login = NOW() WHERE id = ?", [
        user.id,
      ]);
    }

    return res.status(200).json({
      success: true,
      message: "로그인에 성공했습니다.",
      user: {
        id: user.id,
        name: user.user_name,
        lastLogin: user.last_login ?? null,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "서버로부터 오류가 발생했습니다." });
  }
}
