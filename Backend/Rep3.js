const cassandra = require('cassandra-driver');
let authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra','cassandra');
let contactPoints =['localhost'];
let localDataCenter = 'datacenter1';
let client = new cassandra.Client({contactPoints: contactPoints, authProvider: authProvider, localDataCenter: localDataCenter, keyspace:'practica'});

async function main() {
    reporte3('1979-1980','Betis','Rayo Vallecano')
}

async function reporte3(temporada, equipo1, equipo2) {
    try {
        console.log()
        console.log("---------------------------------- REPORTE 3 ----------------------------------------")
        let rep3 = 'SELECT * FROM practica.rep3 WHERE temporada=? AND equipo1 = ? AND equipo2 = ?';
        const result = await client.execute(rep3,[temporada,equipo1,equipo2])
        result.rows.forEach(row => {
            console.log("Marcador final: "+row.temporada+", "+row.jornada+", "+row.equipo1+", "+row.equipo2+", "+row.goles1+", "+row.goles2);
        })
    } finally {
        await client.shutdown();
    }
}

main()
