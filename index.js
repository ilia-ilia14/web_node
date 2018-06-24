const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

// Init App
var app = express();

  app.use(express.static(path.join(__dirname, 'public')));

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.get('/', (req, res) => res.render('pages/index'));
    app.get('/getrate', function (req, res) {
     var result = calculateRate(req.query.postType, req.query.weight);
        res.render('pages/getrate', { result: result, postType: req.query.postType, weight: req.query.weight });
    });

    app.get('/home', (req, res) => res.render('pages/form'));

 app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

 function calculateRate(type, weight) {
     if(type === 'stamped') {
        if(weight == 1) return 0.50;
        if(weight == 2) return 0.75;
        if(weight == 3) return 0.92;
        if(weight == 3.5) { return 1.13; } else { return 0; }
      }
         else if(type === 'metered') {
         if(weight == 1) return 0.47;
         if(weight == 2) return 0.68;
         if(weight == 3) return 0.89;
         if(weight == 3.5) { return 1.10; }
         else return 0;
     }else if(type === 'flat') {
       var base = 1.00;
       var adder = 0.21;
       var price = (adder * weight) + base;
         return price;
     }else if(type === 'retail') {
        if([1, 2, 3, 4].includes(weight)) {
          return 3.50
        }
        if([5, 6, 7, 8].includes(weight)) {
          return 3.75;
        }
        if(weight > 13){ return 0; }
        else {
            var base = 3.75;
            var adder = 0.35;
            var price = (adder * (weight- 8)) + base;
            return price;
        }
     }

 }