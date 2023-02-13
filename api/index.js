
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const axios = require('axios')

const cargarDB = async () => {
  console.log("Cargando datos de la API")
  const exist = await Country.count();
  if(!exist){
    console.log("Creando DB nueva")
      axios.get('https://restcountries.com/v3/all')
      .then(respuesta => {
          respuesta.data.forEach(async (e) => {
              let cap = "None";
              if(Array.isArray(e.capital)){
                  cap = e.capital.pop();
              }

              await Country.create({
                  ID: e.cca3,
                  name: e.name.common,
                  urlImg: e.flags[1],
                  continent: e.region,
                  capital: cap,
                  subregion: !e.subregion ? 'Antarctic' : e.subregion,
                  area: e.area,
                  poblacion: e.population
              })
          })
          console.log("Cargado todo de 0");
      })
      .catch (e => {
          console.log(e);
      })
  }
  else{
      console.log("Base ya cargada")
  }
}

// Syncing all the models at once
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('Escuchando puerto: ' + 3001); // eslint-disable-line no-console
    cargarDB()    
  });
});
