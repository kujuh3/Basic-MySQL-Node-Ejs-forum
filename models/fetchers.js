const mysql = require("mysql");

const yhteys = mysql.createConnection({
                                        "host" : "localhost",
                                        "user" : "root",
                                        "password" : "",
                                        "database" : "keskustelupalsta"
                                      });

yhteys.connect((err) => {

    if (!err) {

        console.log("Yhteys tietokantapalvelimeen avattu!");

    } else {

        throw err;

    }

});                                      


module.exports = {

    //haetaan kaikki keskustelut
    haeKaikki : (callback) => {

        let sql = "SELECT * FROM keskustelut";

        yhteys.query(sql, (err, data) => {

            callback(err, data);

        });

    },
    
    //haetaan kaikki kommentit laskemista varten
    haeKommentit : (callback) => {

        let sql = "SELECT * FROM viestit";

        yhteys.query(sql, (err, data) => {

            callback(err, data);

        });

    },

    //haetaan keskustelu idn perusteella
    haeKeskustelu : (id, callback) => {

        let sql = "SELECT * FROM keskustelut WHERE id = ?";

        yhteys.query(sql, [id], (err, data) => {

            callback(err, data);

        });

    },

    //haetaan keskustelun idtä vastaavat kommentit
    haeKommentti : (id, callback) => {

        let sql = "SELECT * FROM viestit WHERE keskusteluid = ?";

        yhteys.query(sql, [id], (err, data) => {

            callback(err, data);

        });

    },

    //lisätään kommentti tietokantaan
    tallennakommentti : (tiedot, callback) => {
        
        let sql = "INSERT INTO viestit (`id`, `keskusteluid`, `viesti`, `nimimerkki`, `date`) VALUES (NULL, ?, ?, ?, sysdate())";

        yhteys.query(sql, [tiedot.keskusteluid, tiedot.kommenttiinput, tiedot.nimimerkki], (err) => {

            callback(err);            

        });

    },

    //kun tallennetaan kommenttia niin tallennetaan viimeisimmän kommentin aikaleima
    viimeisin : (tiedot, callback) => {
        
        let sql = "UPDATE keskustelut SET viimeisin = sysdate() WHERE id = ?";

        yhteys.query(sql, [tiedot.keskusteluid], (err) => {

            callback(err);            

        });
    },

    //lisätään uusi keskustelu, jos nimimerkki jätetty tyhjäksi niin tallennetaan anonyymi
    lisaaKeskustelu : (tiedot, callback) => {
        if(tiedot.nimimerkki == "") {
            let sql = "INSERT INTO keskustelut (`id`, `otsikko`, `sisalto`, `kirjoittaja`, `aikaleima`) VALUES (NULL, ?, ?, 'Anonyymi', sysdate())";

        yhteys.query(sql, [tiedot.otsikko, tiedot.sisalto, tiedot.nimimerkki], (err) => {

            callback(err);            

        });
        } else {
        let sql = "INSERT INTO keskustelut (`id`, `otsikko`, `sisalto`, `kirjoittaja`, `aikaleima`) VALUES (NULL, ?, ?, ?, sysdate())";

        yhteys.query(sql, [tiedot.otsikko, tiedot.sisalto, tiedot.nimimerkki], (err) => {

            callback(err);            

        });
    }
    }



};