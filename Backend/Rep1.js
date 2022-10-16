const cassandra = require('cassandra-driver');
let authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra','cassandra');
let contactPoints =['localhost'];
let localDataCenter = 'datacenter1';
let client = new cassandra.Client({contactPoints: contactPoints, authProvider: authProvider, localDataCenter: localDataCenter, keyspace:'practica'});

async function main() {
    reporte1('1979-1980','Zaragoza')
}

async function reporte1(temporada, equipo1) {
    try {
        console.log("############################################# REPORTES #############################################")
        console.log("---------------------------------- REPORTE 1 ----------------------------------------")
        const rep1 = 'SELECT * FROM practica.rep1 WHERE temporada=? AND equipo1=?';
        const result = await client.execute(rep1,[temporada,equipo1])
        result.rows.forEach(row => {
            console.log("Partido local: "+row.temporada+", "+row.jornada+", "+row.equipo1+", "+row.equipo2+", "+row.goles1+", "+row.goles2);
        })
    } finally {
        await client.shutdown();
    }
}

main()
