import { Router } from "express";
import { createProject } from "../controllers/project/createProject.js";
import { getProjectList } from "../controllers/project/getProjectList.js";

const router = Router();

router.post("/create_project", createProject);
router.get("/get_projectList", getProjectList);

export default router;
