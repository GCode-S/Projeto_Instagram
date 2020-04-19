const express = require('express');
const multer = require('multer');

const PostController = require('./controllers/Post');
const LikeController = require('./controllers/Likes');

const uploadConfig = require('./config/upload');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

routes.post('/posts/:id/like', LikeController.store)


routes.delete('/posts/:id/delete', PostController.destroy)


module.exports = routes;