module.exports = function(app) {
    app.get('/', function(req, res){
        res.render('index.ejs');
    });
    app.get('/data', function(req, res){
        res.render('data.ejs');
    });
    app.get('/order', function(req, res){
        res.render('order.ejs');
    });
    app.get('/categories', function(req, res){
        res.render('categories.ejs');
    });
    app.get('/about', function(req, res){
        res.render('about.ejs');
    });
    app.get('/contacts', function(req, res){
        res.render('contacts.ejs');
    });
    app.get('/ru', function(req, res){
        res.render('index_ru.ejs');
    });
    app.get('/eng', function(req, res){
        res.render('index_eng.ejs');
    });

    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: ''
    });

    app.get('/search',function(req,res){
        connection.query('USE ' + `spyur`);
        connection.query('SELECT organization from organizations where organization like "%'+req.query.key+'%"', function(err, rows, fields) {
            if (err) throw err;
            var data=[];
            for(i=0;i<rows.length;i++)
            {
                data.push(rows[i].organization);
            }
            res.end(JSON.stringify(data));
        });
    });
    app.get('/login', function(req, res){
        res.render('login.ejs', {message:req.flash('loginMessage')});
    });


    app.post('/insert', function(req, res) {

        connection.query('USE ' + `spyur`);
        let queryString =  `INSERT INTO organizations (organization, type, category, country_code, city, street, phone, email, webpage) VALUES ('${req.body.organization}', '${req.body.type}', '${req.body.category}', '${req.body.country_code}', '${req.body.city}', '${req.body.street}', '${req.body.phone}', '${req.body.email}', '${req.body.webpage}')`;

       
        connection.query(queryString, function (err, result) {
          //  console.log(result);
            if (err) {
                res.send('no such organizations');
            }
            if(result===undefined){
                res.send('no such organizations');
            }
            else
            
                res.render('index.ejs');
        });
    });
    app.get('/entertainment', function(req, res){
        connection.query('USE ' + `spyur`);
        let queryString =  `SELECT * FROM organizations WHERE category = 'Ժամանց'`;
        connection.query(queryString, function (err, result) {
            console.log(result);
            if (err) {
                res.send('no such organizations');
            }
            if(result===undefined){
                res.send('no such organizations');
            }
            else
                res.render('entertainment.ejs',{ result:result});
        });
    });
    app.get('/restaurant', function(req, res){
        connection.query('USE ' + `spyur`);
        let queryString =  `SELECT * FROM organizations WHERE category = 'Ռեստորան'`;
        connection.query(queryString, function (err, result) {
            console.log(result);
            if (err) {
                res.send('no such organizations');
            }
            if(result===undefined){
                res.send('no such organizations');
            }
            else
                res.render('restaurant.ejs',{ result:result});
        });
    });
    app.get('/bank', function(req, res){
        connection.query('USE ' + `spyur`);
        let queryString =  `SELECT * FROM organizations WHERE category = 'Բանկ'`;
        connection.query(queryString, function (err, result) {
            if (err) {
                res.send('no such organizations');
            }
            if(result===undefined){
                res.send('no such organizations');
            }
            else
                res.render('bank.ejs',{ result:result});
        });
    });
    app.get('/realty', function(req, res){
        connection.query('USE ' + `spyur`);
        let queryString =  `SELECT * FROM organizations WHERE category = 'Անշարժ գույք'`;
        connection.query(queryString, function (err, result) {
            if (err) {
                res.send('no such organizations');
            }
            if(result===undefined){
                res.send('no such organizations');
            }
            else
                res.render('realty.ejs',{ result:result});
        });
    });
    app.get('/hotel', function(req, res){
        connection.query('USE ' + `spyur`);
        let queryString =  `SELECT * FROM organizations WHERE category = 'Հյուրանոց'`;
        connection.query(queryString, function (err, result) {
            if (err) {
                res.send('no such organizations');
            }
            if(result===undefined){
                res.send('no such organizations');
            }
            else
                res.render('hotel.ejs',{ result:result});
        });
    });
    app.get('/sport', function(req, res){
        connection.query('USE ' + `spyur`);
        let queryString =  `SELECT * FROM organizations WHERE category = 'Սպորտ'`;
        connection.query(queryString, function (err, result) {
            console.log(result);
            if (err) {
                res.send('no such organizations');
            }
            if(result===undefined){
                res.send('no such organizations');
            }
            else
                res.render('sport.ejs',{ result:result});
        });
    });
 };
