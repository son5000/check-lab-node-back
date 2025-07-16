import db from "../../../db/index.js";

export async function getProjectList(req, res) {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: "userId가 없습니다." });

    const sql =
      "SELECT * FROM project WHERE user_id = ? ORDER BY created_at DESC";
    const [rows] = await db.execute(sql, [userId]);

    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ getProjectList 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
}
