const express = require('express');
const cors = require('cors');

//khoitao ung dung express
const app = express();

app.use(cors());
app.use(express.json());
