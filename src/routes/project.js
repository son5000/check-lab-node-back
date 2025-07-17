import { Router } from "express";
import { postCreateProject } from "../controllers/project/postCreateProject.js";
import { getProjectList } from "../controllers/project/getProjectList.js";
import { postMetaDataUpload } from "../controllers/project/postMetaDataUpload.js";
import { postFileUpload } from "../controllers/project/postFileUpload.js";
import { getProject } from "../controllers/project/getProject.js";

const router = Router();

router.post("/create_project", postCreateProject);
router.post("/metadata_upload", postMetaDataUpload);
router.post("/file_upload", postFileUpload);
router.get("/get_projectList", getProjectList);
router.get("/:id", getProject);

export default router;
