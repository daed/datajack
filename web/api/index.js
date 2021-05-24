const express = require('express');
const app = express();
const port = 8000;


app.get('v1/', (req, res) => {
  res.send('Hello World!');
});

/*
    # Routes needed:
    ## user management
     - create
     - login
     - access/modify
    ## character creation
     - create
     - destroy
     - access/modify
     - set active(?)
    # Interfaces needed:
     - database
     - main site(?)
*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
