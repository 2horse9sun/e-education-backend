require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const TagRouter = require('./routes/TagRouter');
const SectionRouter = require('./routes/SectionRouter');
const LessonRouter = require('./routes/LessonRouter');
const ReviewRouter = require('./routes/ReviewRouter');
const UserRouter = require('./routes/UserRouter');
const S3Router = require('./routes/S3Router');
const PREFIX = "/api";
app.use(`${PREFIX}/tag`, TagRouter);
app.use(`${PREFIX}/section`, SectionRouter);
app.use(`${PREFIX}/lesson`, LessonRouter);
app.use(`${PREFIX}/review`, ReviewRouter);
app.use(`${PREFIX}/user`, UserRouter);
app.use(`${PREFIX}/s3`, S3Router);


module.exports = app;
