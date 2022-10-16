let cassandra = require('cassandra-driver');

let authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra','cassandra');
let contactPoints =['localhost'];
let localDataCenter = 'datacenter1';

let client = new cassandra.Client({contactPoints: contactPoints, authProvider: authProvider, localDataCenter: localDataCenter, keyspace:'practica'});

let rep1 = 'SELECT * FROM practica.rep1 WHERE temporada=? AND equipo1=?';
let q1 = client.execute(rep1,['1979-1980','Zaragoza']).then(result =>{
    console.log("---------------------------------- REPORTE 1 ----------------------------------------")
    result.rows.forEach(row => {
        console.log("Partido local: "+row.temporada+", "+row.jornada+", "+row.equipo1+", "+row.equipo2+", "+row.goles1+", "+row.goles2);}).catch((err)=>{console.log('Error Partido',err);
    });
});

let rep2 = 'SELECT * FROM practica.rep2 WHERE temporada=? AND equipo2=?';
let q2 = client.execute(rep2,['1979-1980','Zaragoza']).then(result =>{
    console.log()
    console.log("---------------------------------- REPORTE 2 ----------------------------------------")
    result.rows.forEach(row => {
        console.log("Partido visitante: "+row.temporada+", "+row.jornada+", "+row.equipo1+", "+row.equipo2+", "+row.goles1+", "+row.goles2);}).catch((err)=>{console.log('Error Partido',err);
    });
});

//Revisar
let rep3 = 'SELECT * FROM practica.rep3 WHERE temporada=? AND equipo1 IN (?, ?) AND equipo2 IN (?, ?)';
let q3 = client.execute(rep3,['1979-1980','Betis','Rayo Vallecano','Betis','Rayo Vallecano']).then(result =>{
    console.log()
    console.log("---------------------------------- REPORTE 3 ----------------------------------------")
    result.rows.forEach(row => {
        console.log("Marcador final: "+row.temporada+", "+row.jornada+", "+row.equipo1+", "+row.equipo2+", "+row.goles1+", "+row.goles2);}).catch((err)=>{console.log('Error Marcador Final',err);
    });
});

//Pendiente
let rep4 = 'SELECT * FROM practica.rep4 WHERE temporada=? AND equipo1=? AND equipo2=?';
let q4 = client.execute(rep4,['1979-1980','Betis','Rayo Vallecano']).then(result =>{
    console.log()
    console.log("---------------------------------- REPORTE 4 ----------------------------------------")
    result.rows.forEach(row => {
        console.log("Victoria mas alta: "+row.temporada+", "+row.jornada+", "+row.equipo1+", "+row.equipo2+", "+row.goles1+", "+row.goles2);}).catch((err)=>{console.log('Error Marcador Final',err);
    });
});


let rep5 = 'SELECT temporada, jornada, equipo2 FROM practica.rep5 WHERE temporada=? AND jornada=? AND equipo1=?';
let q5 = client.execute(rep5,['1979-1980',1,'Betis'],{ prepare : true }).then(result =>{
    console.log()
    console.log("---------------------------------- REPORTE 5 ----------------------------------------")
    result.rows.forEach(row => {
        console.log("Equipo rival: "+row.temporada+", "+row.jornada+", "+row.equipo2);}).catch((err)=>{console.log('Error Marcador Final',err);
    });
});


let rep6 = 'SELECT temporada, jornada, equipo1, sum(Goles1), sum(Goles2) FROM practica.rep6 WHERE temporada=? AND equipo1=?';
let q6 = client.execute(rep6,['1979-1980','Betis']).then(result =>{
    console.log()
    console.log("---------------------------------- REPORTE 6 ----------------------------------------")
    console.log()
    result.rows.forEach(row => {
        console.log("Goles a favor y en contra: "+row.temporada+", "+row.jornada+", "+", "+row.equipo1+", "+row['system.sum(goles1)']+", "+row['system.sum(goles2)']);}).catch((err)=>{console.log('Error Marcador Final',err);
    });
});


Promise.allSettled([q1,q2,q3,q4,q5,q6]).finally(()=> client.shutdown());
