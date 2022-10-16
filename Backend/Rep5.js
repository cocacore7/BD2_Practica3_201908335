const cassandra = require('cassandra-driver');
let authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra','cassandra');
let contactPoints =['localhost'];
let localDataCenter = 'datacenter1';
let client = new cassandra.Client({contactPoints: contactPoints, authProvider: authProvider, localDataCenter: localDataCenter, keyspace:'practica'});

async function main() {
    reporte5('1979-1980',2,'Betis')
}

async function reporte5(temporada, jornada, equipo) {
    try {
        console.log()
        console.log("---------------------------------- REPORTE 5 ----------------------------------------")
        let rep5_1 = 'SELECT temporada, jornada, equipo2 FROM practica.rep5_1 WHERE temporada=? AND jornada=? AND equipo1 = ?';
        let rep5_2 = 'SELECT temporada, jornada, equipo1 FROM practica.rep5_2 WHERE temporada=? AND jornada=? AND equipo2 = ?';
        const result1 = await client.execute(rep5_1,[temporada,jornada,equipo],{ prepare : true })
        result1.rows.forEach(row => {
            console.log("Equipo rival: "+row.temporada+", "+row.jornada+", "+row.equipo2);
        })
        const result2 = await client.execute(rep5_2,[temporada,jornada,equipo],{ prepare : true })
        result2.rows.forEach(row => {
            console.log("Equipo rival: "+row.temporada+", "+row.jornada+", "+row.equipo1);
        })
    } finally {
        await client.shutdown();
    }
}

main()
