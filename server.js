const { response } = require('express');
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;



app.get('/',(request,response)) => {
  response.send('testing');
};

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
