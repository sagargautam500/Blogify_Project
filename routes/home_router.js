const express=require('express');
const { getHomePage,getSearch } = require('../controller/home_controller');

const homeRouter=express.Router();

homeRouter.get('/',getHomePage);
homeRouter.get('/search',getSearch);

module.exports=homeRouter;