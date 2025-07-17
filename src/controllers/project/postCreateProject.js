import db from "../../../db/index.js";
import { v4 as uuidv4 } from "uuid";

export async function postCreateProject(req, res) {
  try {
    const {
      project_name,
      contract_name,
      period_start,
      period_end,
      contractor,
      purpose,
      user_id,
    } = req.body;

    if (
      !project_name ||
      !contract_name ||
      !period_start ||
      !period_end ||
      !contractor ||
      !purpose ||
      !user_id
    ) {
      return res.status(400).json({ message: "모든 항목을 입력해 주세요." });
    }

    const id = uuidv4();

    const sql = `
      INSERT INTO project (
        id, project_name, contract_name, period_start,
        period_end, contractor, purpose, user_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.execute(sql, [
      id,
      project_name,
      contract_name,
      period_start,
      period_end,
      contractor,
      purpose,
      user_id,
    ]);

    res.status(201).json({
      success: true,
      message: "프로젝트가 성공적으로 생성되었습니다.",
    });
  } catch (err) {
    console.error("❌ createProject 오류:", err);
    res
      .status(500)
      .json({ success: false, message: "서버 오류: 프로젝트 생성 실패" });
  }
}
