#LIBRERIA NODE
npm install cassandra-driver

#COMADOS CASSANDRA DOCKER
docker-compose up --build

#INGRESAR CONTAINER CASSANDRA DOCKER
docker exec -it 72792d1e82a4 cqlsh -u cassandra -p cassandra

#COPIAR ARCHIVO CSV EN CONTAINER DOCKER
docker cp "C:\Users\cocac\Documents\GitHub\BD2_Practica3_201908335\archivo_entrada_p3.csv" 72792d1e82a4:/archivo1;

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
CREATE TABLE IF NOT EXISTS rep4 (Temporada TEXT, Jornada INT, Equipo1 TEXT, Equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Equipo1,Equipo2),Jornada));
CREATE TABLE IF NOT EXISTS rep5 (Temporada TEXT, Jornada INT, Equipo1 TEXT, Equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Jornada,Equipo1),Equipo2));
CREATE TABLE IF NOT EXISTS rep6 (Temporada TEXT, Jornada INT, Equipo1 TEXT, Equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Equipo1),Jornada));

#CARGA MASIVA PARA TABLAS
COPY practica.rep1 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH DELIMITER = ';' AND HEADER = TRUE;
COPY practica.rep2 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH DELIMITER = ';' AND HEADER = TRUE;
COPY practica.rep3 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH DELIMITER = ';' AND HEADER = TRUE;
COPY practica.rep4 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH DELIMITER = ';' AND HEADER = TRUE;
COPY practica.rep5 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH DELIMITER = ';' AND HEADER = TRUE;
COPY practica.rep6 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH DELIMITER = ';' AND HEADER = TRUE;
