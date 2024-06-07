const express = require('express');
const app = express();
require("dotenv").config();
const path = require('path');
const cookieParser = require('cookie-parser');
const remainder=require("./controller/remainder");
const report=require('./controller/report');

const PORT = 9005; 
// const cors = require('cors');
// const { config } = require('dotenv');
// config({ path: `.env` });
app.use(cookieParser()); 
const web = require("./routes/web");
app.use(express.urlencoded({extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
app.use("/", web);


app.listen(PORT, () => {
console.log(`server is running at port '${PORT}'`);
});