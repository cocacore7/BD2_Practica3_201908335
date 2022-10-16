const cassandra = require('cassandra-driver');
let authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra','cassandra');
let contactPoints =['localhost'];
let localDataCenter = 'datacenter1';
let client = new cassandra.Client({contactPoints: contactPoints, authProvider: authProvider, localDataCenter: localDataCenter, keyspace:'practica'});

async function main() {
    reporte2('1979-1980','Zaragoza')
}

async function reporte2(temporada, equipo2) {
    try {
        console.log()
        console.log("---------------------------------- REPORTE 2 ----------------------------------------")
        let rep2 = 'SELECT * FROM practica.rep2 WHERE temporada=? AND equipo2=?';
        const result = await client.execute(rep2,[temporada,equipo2])
        result.rows.forEach(row => {
            console.log("Partido visitante: "+row.temporada+", "+row.jornada+", "+row.equipo1+", "+row.equipo2+", "+row.goles1+", "+row.goles2);
        })
    } finally {
        await client.shutdown();
    }
}

main()
