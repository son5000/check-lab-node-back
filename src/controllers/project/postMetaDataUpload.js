import db from "../../../db/index.js";

export async function postMetaDataUpload(req, res) {
  try {
    const { project_id, user_id, files } = req.body;

    if (!project_id || !user_id || !Array.isArray(files)) {
      return res.status(400).json({ message: "잘못된 요청입니다." });
    }

    // 각 파일마다 DB insert
    for (const file of files) {
      const { fileName, facility_type, location, facility_name } = file;

      const query = `
        INSERT INTO diagnosis_report (
          id,
          project_id,
          user_id,
          facility_type,
          location,
          facility_name
        ) VALUES (
          UUID(), ?, ?, ?, ?, ?
        );
      `;

      await db.execute(query, [
        project_id,
        user_id,
        facility_type,
        location,
        facility_name,
      ]);
    }

    return res.status(200).json({ message: "메타데이터 저장 완료" });
  } catch (err) {
    console.error("❌ 메타데이터 저장 실패:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
}
