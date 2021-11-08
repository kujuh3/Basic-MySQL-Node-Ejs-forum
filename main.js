const express = require("express");
const app = express();
const fetcher = require("./models/fetchers");
const bodyParser = require("body-parser");

const portti = 3007;


function maara(arr, key){
    //array määriä varten
    let array = [];
    arr.forEach((x)=>{
       
    //jos määriä varten tehdyssä arrayssä on keytä vastaava arvo niin nostetaan määrää +1
     if(array.some((val)=>{ return val[key] == x[key] })){
        array.forEach((k)=>{
         if(k[key] === x[key]){ 
           k["count"]++
         }
      })
     }else{
       //jos ei niin tehdään uusi objekti nykyisen iteraation key arvolla ja asetetaan määräksi 1
       let a = {}
       a[key] = x[key]
       a["count"] = 1
       array.push(a);
     }
  })
  return array
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended" : true }));
app.use(express.static("./public"));

app.set("views", "./views");
app.set("view engine", "ejs");

//tallennetaan uusi keskustelu
app.post("/tallenna/", (req, res) => {

    fetcher.lisaaKeskustelu(req.body, (err) => {

        if (err) throw err;

        res.redirect("/");

    });    

});

app.post("/tallennakommentti/", (req, res) => {

    //haetaan keskustelun id, jonka perusteella tallennetaan kommentti oikealle idlle
    let id = req.body.keskusteluid;

    fetcher.viimeisin(req.body, (err) => {
    fetcher.tallennakommentti(req.body, (err) => {

        if (err) throw err;
        //samalla idn perusteella palataan takaisin oikeaan keskusteluun
        res.redirect("/keskustelu/" + id);
    });
    });  
});

//tietyn keskustelun selaus
app.get("/keskustelu/:id", (req, res) => {

    let id = req.params.id;
    //haetaan keskustelu ja sen kommentit
    fetcher.haeKeskustelu(id, (err, data) => {
        fetcher.haeKommentti(id, (err, kommentit) => {
        if (err) throw err;

        //samalla funktiolla järjestetään kommentit, vaihtamalla vain + miinuksen tilalle
        //Eli vanhin ensin
        let arr = kommentit.sort(function(a,b){
            return new Date(b.date) + new Date(a.date);
        });

        res.render("keskustelu", { "sisalto" : data[0], "kommentit" : arr, "id" : id});
        })
    });
});

//ohjataan uuden keskustelun tekemistä varten
app.get("/uusi/", (req, res) => {
    res.render("uusi");
});


app.get("/", (req, res) => {
    //haetaan kaikki keskustelut ja kommentit
    fetcher.haeKaikki((err, data) => {
        fetcher.haeKommentit((err, kommentit) => {
        if (err) throw err;
        //maara funktiolla lasketaan mille keskustelulle kukin kommentti kuuluu
        let vastaukset = maara(kommentit, "keskusteluid");
        
        //array muuttujaan sort funktion avulla laitetaan postaukset
        //kommentin jättöpäivän perusteella järjestykseen
        let arr = data.sort(function(a,b){
            return new Date(b.viimeisin) - new Date(a.viimeisin);
        });

        res.render("index", { "keskustelut" : arr, "vastaukset" : vastaukset });

    })});

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi portiin: ${portti}`);

});