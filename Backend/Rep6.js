const cassandra = require('cassandra-driver');
let authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra','cassandra');
let contactPoints =['localhost'];
let localDataCenter = 'datacenter1';
let client = new cassandra.Client({contactPoints: contactPoints, authProvider: authProvider, localDataCenter: localDataCenter, keyspace:'practica'});

async function main() {
    reporte6('1979-1980','Betis')
}

async function reporte6(temporada, equipo) {
    try {
        console.log()
        console.log("---------------------------------- REPORTE 6 ----------------------------------------")
        let rep6_1 = 'SELECT sum(Goles1), sum(Goles2) FROM practica.rep6_1 WHERE temporada=? AND equipo1=?';
        let rep6_2 = 'SELECT sum(Goles1), sum(Goles2) FROM practica.rep6_2 WHERE temporada=? AND equipo2=?';
        const result1 = await client.execute(rep6_1,[temporada,equipo])
        let goles_favor = 0
        let goles_contra = 0
        result1.rows.forEach(row => {
            goles_favor+=row['system.sum(goles1)']
            goles_contra+=row['system.sum(goles2)']
        })
        const result2 = await client.execute(rep6_2,[temporada,equipo])
        result2.rows.forEach(row => {
            goles_favor+=row['system.sum(goles2)']
            goles_contra+=row['system.sum(goles1)']
        })
        console.log("Goles a favor y en contra: "+temporada+", "+equipo+", "+goles_favor+", "+goles_contra);
        console.log()
        console.log()
        console.log()
    } finally {
        await client.shutdown();
    }
}

main()
