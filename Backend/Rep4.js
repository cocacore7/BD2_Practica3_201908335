const cassandra = require('cassandra-driver');
let authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra','cassandra');
let contactPoints =['localhost'];
let localDataCenter = 'datacenter1';
let client = new cassandra.Client({contactPoints: contactPoints, authProvider: authProvider, localDataCenter: localDataCenter, keyspace:'practica'});

async function main() {
    reporte4('1979-1980')
}

async function reporte4(temporada) {
    try {
        console.log()
        console.log("---------------------------------- REPORTE 4 ----------------------------------------")
        let rep4 = 'SELECT temporada, jornada, equipo1, equipo2, Goles1, Goles2 FROM practica.rep4 WHERE temporada=?';
        const result = await client.execute(rep4,[temporada])
        let goles1 = []
        let goles2 = []
        result.rows.forEach(row => {
            goles1.push(parseInt(row.goles1))
            goles2.push(parseInt(row.goles2))
        });
        let local = (goles1[goles1.indexOf(Math.max.apply(Math, goles1))])
        let visitante = (goles2[goles2.indexOf(Math.max.apply(Math, goles2))])
        let locali = (goles1.indexOf(Math.max.apply(Math, goles1)))
        let visitantei = (goles2.indexOf(Math.max.apply(Math, goles2)))
        if(local>visitante){console.log("Victoria mas alta: "+result.rows[locali].temporada+", "+result.rows[locali].jornada+", "+result.rows[locali].equipo1+", "+result.rows[locali].equipo2+", "+result.rows[locali].goles1+", "+result.rows[locali].goles2)}
        else{console.log("Victoria mas alta: "+result.rows[visitantei].temporada+", "+result.rows[visitantei].jornada+", "+result.rows[visitantei].equipo1+", "+result.rows[visitantei].equipo2+", "+result.rows[visitantei].goles1+", "+result.rows[visitantei].goles2)}
    } finally {
        await client.shutdown();
    }
}

main()
