const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport-config');
const db = require('./config/database');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const nMiddleWare  = require('./middlewares/notificationMiddleware.js');
const app = express();
const port = 8001;
const dotenv = require('dotenv');
dotenv.config();


app.use(express.urlencoded());

passportLocal(passport);

app.use(expressLayouts);
app.use(express.static('./assets/'));

app.use(session({
    secret:process.env.key,
    saveUninitialized: true,
    resave: true
}));

app.use(flash());
app.use(nMiddleWare.setFlash);


app.set('layout extractStyles',true);

app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./routes'));

// app.get('/', async (req, res) => {
  
//     // const options = {
//     //     method: 'GET',
//     //     url: 'http://139.144.5.186:2358/languages',
//     //     headers: {
//     //         'X-Auth-Token':'mySecretTokenDelhiCity',
//     //     }
//     //   };
      
//     //   axios.request(options).then(function (response) {
//     //       console.log(response.data);
//     //       let languages = response.data;
//     //       let result = languages;
//     //       res.send(result);
//     //   }).catch(function (error) {
//     //       console.error(error);
//     //   });


// });

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`Server running on port http://localhost:${port}`);
    }
);    


// function async useless(){
//     const options = {
//         method: 'POST',
//         url: 'http://139.144.5.186:2358/submissions',
//         params: {base64_encoded: 'true', fields: '*'},
//         headers: {
//           'content-type': 'application/json',
//           'Content-Type': 'application/json',
//           'X-Auth-Token':'mySecretTokenDelhiCity',
          
//         },
//         data: '{"language_id":52,"source_code":"I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQad    gbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=","stdin":"SnVkZ2Uw"}'
//       };
      
//       let response = await axios.request(options);
//       if(response){
//           console.log(response.data.token);
//           setTimeout(async () => {
//               let token = response.data.token;
//               let url = `http://139.144.5.186:2358/submissions/${token}`;
//               const getOption = {
//                   method:'GET',
//                   url:url,
//                   params:{base64_encoded: 'true', fields: '*'},
//                   headers: {
//                   'Content-Type': 'application/json',
//                   'X-Auth-Token':'mySecretTokenDelhiCity',
//                   }
//               }
//               let getResponse = await axios.request(getOption);
//               if(getResponse){
//                   console.log(getResponse);
//                   let output = atob(getResponse.data.stdout);
//                   res.send(output);
      
//               }else{
//                   console.log("error");
//                   let errorMessage = getResponse.data.status;
                 
//                   res.send(errorMessage);
//               }
//           }, 6000);
          
      
//       }else{
//           console.log("error");
//       }
// }