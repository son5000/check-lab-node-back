import db from "../../../db/index.js";

export async function getProject(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "프로젝트 ID가 제공되지 않았습니다.",
    });
  }

  try {
    // 1. 프로젝트 정보 조회
    const [projectRows] = await db.execute(
      "SELECT * FROM project WHERE id = ?",
      [id]
    );

    if (projectRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "해당 프로젝트를 찾을 수 없습니다.",
      });
    }

    const project = projectRows[0];

    // 2. 해당 프로젝트의 진단 보고서 목록 조회
    const [files] = await db.execute(
      "SELECT * FROM diagnosis_report WHERE project_id = ?",
      [id]
    );

    // 3. 응답 성공
    return res.status(200).json({
      success: true,
      message: "프로젝트 및 보고서 데이터를 성공적으로 불러왔습니다.",
      data: {
        project,
        files: files,
      },
    });
  } catch (error) {
    console.error("❌ 데이터 조회 실패:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다.",
    });
  }
}
