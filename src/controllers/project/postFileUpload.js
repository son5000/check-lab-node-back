import multer from "multer";
import FormData from "form-data";
import fetch from "node-fetch";

// 메모리 저장 방식의 multer 인스턴스
const upload = multer({ storage: multer.memoryStorage() });

// 미들웨어 + 핸들러 결합
export const postFileUpload = [
  // 1. multer 처리 (files라는 key로 다중 파일 받기)
  upload.array("files"),

  // 2. 실질적인 처리 함수
  async (req, res) => {
    try {
      const { metadata } = req.body;
      const files = req.files;

      if (!metadata || !files?.length) {
        return res.status(400).json({ message: "metadata 또는 파일 누락" });
      }

      const form = new FormData();

      // 파일 추가
      for (const file of files) {
        form.append("files", file.buffer, {
          filename: file.originalname,
          contentType: file.mimetype,
        });
      }

      // 메타데이터 JSON 문자열 추가
      form.append("metadata", metadata);

      // Python 서버로 전송
      const response = await fetch("http://your-python-server:8000/upload-ud", {
        method: "POST",
        body: form,
        headers: form.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Python 서버 오류: ${response.statusText}`);
      }

      const result = await response.json();

      return res.status(200).json({
        message: "Python 서버 전송 완료",
        pythonResponse: result,
      });
    } catch (err) {
      console.error("❌ 전송 실패:", err);
      return res.status(500).json({ message: "Python 서버 전송 실패" });
    }
  },
];
