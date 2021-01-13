import {Router} from "express";
import {buildVideoInfo, downloadVideo, setResponseHeaders, validatePostRequest} from "../middleware";

const router = Router();

// @route POST /api/download
// @desc  Download Youtube video to requested format
// eg. POST {url:'https://www.youtube.com/watch?v=tDdL5urWvH4', format:'mp3'}
router.post('/', validatePostRequest, buildVideoInfo, setResponseHeaders, downloadVideo);

export default router;
