#LIBRERIA NODE
npm install cassandra-driver

#COMADOS CASSANDRA DOCKER
docker-compose up --build

#COPIAR ARCHIVO CSV EN CONTAINER DOCKER
docker cp "C:\Users\cocac\Documents\GitHub\BD2_Practica3_201908335\archivo_entrada_p3.csv" 72792d1e82a4:/archivo1;

#INGRESAR CONTAINER CASSANDRA DOCKER
docker exec -it 72792d1e82a4 cqlsh -u cassandra -p cassandra

#VER KEYSPACES
DESC KEYSPACES;

#Para obtener más información de la tabla que acabamos de crear simplemente ejecutamos:
DESC SCHEMA;

#CREAR KEYSPACE
CREATE KEYSPACE practica WITH REPLICATION = {'class' : 'SimpleStrategy','replication_factor' : 1};

#SELECCIONAR KEYSPACE
USE practica;

#CREACION DE TABLAS
CREATE TABLE IF NOT EXISTS rep1 (Temporada TEXT, Jornada INT, Equipo1 TEXT, Equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Equipo1),Jornada));
CREATE TABLE IF NOT EXISTS rep2 (Temporada TEXT, Jornada INT, Equipo1 TEXT, Equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Equipo2),Jornada));
CREATE TABLE IF NOT EXISTS rep3 (Temporada TEXT, Jornada INT, Equipo1 TEXT, Equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Equipo1,Equipo2),Jornada));
CREATE TABLE IF NOT EXISTS rep4 (Temporada TEXT, Jornada INT, Equipo1 TEXT, Equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY (Temporada,Jornada));
CREATE TABLE IF NOT EXISTS rep5_1 (Temporada TEXT, Jornada INT, Equipo1 TEXT, Equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Jornada,Equipo1)));
CREATE TABLE IF NOT EXISTS rep5_2 (Temporada TEXT, Jornada INT, Equipo1 TEXT, Equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Jornada,Equipo2)));
CREATE TABLE IF NOT EXISTS rep6_1 (Temporada TEXT, Jornada INT, Equipo1 TEXT, Equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Equipo1),Jornada));
CREATE TABLE IF NOT EXISTS rep6_2 (Temporada TEXT, Jornada INT, Equipo1 TEXT, Equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Equipo2),Jornada));

#CARGA MASIVA PARA TABLAS
COPY practica.rep1 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH DELIMITER = ';' AND HEADER = TRUE;
COPY practica.rep2 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH DELIMITER = ';' AND HEADER = TRUE;
COPY practica.rep3 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH DELIMITER = ';' AND HEADER = TRUE;
COPY practica.rep4 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH DELIMITER = ';' AND HEADER = TRUE;
COPY practica.rep5_1 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH DELIMITER = ';' AND HEADER = TRUE;
COPY practica.rep5_2 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH DELIMITER = ';' AND HEADER = TRUE;
COPY practica.rep6_1 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH DELIMITER = ';' AND HEADER = TRUE;
COPY practica.rep6_2 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH DELIMITER = ';' AND HEADER = TRUE;

#EJECUTAR BACKEND CONSULTAS
node Rep1.js
node Rep2.js
node Rep3.js
node Rep4.js
node Rep5.js
node Rep6.js
