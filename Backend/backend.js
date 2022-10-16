let cassandra = require('cassandra-driver');

let authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra','cassandra');
let contactPoints =['localhost'];
let localDataCenter = 'datacenter1';

let client = new cassandra.Client({contactPoints: contactPoints, authProvider: authProvider, localDataCenter: localDataCenter, keyspace:'practica'});

let rep1 = 'SELECT * FROM practica.rep1 WHERE temporada=? AND equipo1=?';
let q1 = client.execute(rep1,['1979-1980','Zaragoza']).then(result =>{
    result.forEach(row => {
        console.log("Partido local: "+row.temporada+", "+row.jornada+", "+row.equipo1+", "+row.equipo2+", "+row.goles1+", "+row.goles2);}).catch((err)=>{console.log('Error Partido',err);
    });
});

let rep2 = 'SELECT * FROM practica.rep2 WHERE temporada=? AND equipo2=?';
let q2 = client.execute(rep2,['1979-1980','Zaragoza']).then(result =>{
    result.forEach(row => {
        console.log("Partido visitante: "+row.temporada+", "+row.jornada+", "+row.equipo1+", "+row.equipo2+", "+row.goles1+", "+row.goles2);}).catch((err)=>{console.log('Error Partido',err);
    });
});

//Revisar
let rep3 = 'SELECT * FROM practica.rep3 WHERE temporada=? AND equipo1=? AND equipo2=?';
let q3 = client.execute(rep3,['1979-1980','Zaragoza','Zaragoza']).then(result =>{
    result.forEach(row => {
        console.log("Marcador final: "+row.temporada+", "+row.jornada+", "+row.equipo1+", "+row.equipo2+", "+row.goles1+", "+row.goles2);}).catch((err)=>{console.log('Error Marcador Final',err);
    });
});

//Pendiente
let rep4 = 'SELECT * FROM practica.rep4 WHERE temporada=? AND equipo1=? AND equipo2=?';
let q4 = client.execute(rep4,['1979-1980','Zaragoza','Zaragoza']).then(result =>{
    result.forEach(row => {
        console.log(row.temporada, row.jornada, row.equipo1, row.equipo2, row.goles1, row.goles2);}).catch((err)=>{console.log('Error Marcador Final',err);
    });
});

let rep5 = 'SELECT Equipo2 FROM practica.rep5 WHERE Temporada=? AND Jornada=? AND Equipo1=?';
let q5 = client.execute(rep5,['1979-1980',1,'Zaragoza']).then(result =>{
    result.forEach(row => {
        console.log("Equipo rival: "+row.equipo2);}).catch((err)=>{console.log('Error Marcador Final',err);
    });
});

let rep6 = 'SELECT sum(Goles1) FROM practica.rep6 WHERE temporada=? AND equipo1=?';
let q6 = client.execute(rep6,['1979-1980','Zaragoza']).then(result =>{
    result.forEach(row => {
        console.log(row.temporada, row.jornada, row.equipo1, row.equipo2, row.goles1, row.goles2);}).catch((err)=>{console.log('Error Marcador Final',err);
    });
});

Promise.allSettled([q1,q2,q3,q4,q5,q6]).finally(()=> client.shutdown());
