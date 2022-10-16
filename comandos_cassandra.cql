#LIBRERIA NODE
npm install cassandra-driver

#COMADOS CASSANDRA DOCKER
docker-compose up --build

#INGRESAR CONTAINER CASSANDRA DOCKER
docker exec -it 5fc69d851d2e cqlsh -u cassandra -p cassandra

#COPIAR ARCHIVO CSV EN CONTAINER DOCKER
docker cp "C:\Users\cocac\Desktop\Practica3\archivo_entrada_p3.csv" 5fc69d851d2e:/archivo1;
docker cp "C:\Users\cocac\Desktop\Practica3\archivo_entrada_p3_2.csv" 5fc69d851d2e:/archivo;

#VER KEYSPACES
DESC KEYSPACES;

#Para obtener más información de la tabla que acabamos de crear simplemente ejecutamos:
DESC SCHEMA;

#CREAR KEYSPACE
CREATE KEYSPACE practica WITH REPLICATION = {'class' : 'SimpleStrategy','replication_factor' : 1};

#SELECCIONAR KEYSPACE
USE practica;

#CREACION DE TABLAS
CREATE TABLE IF NOT EXISTS rep1 (Temporada TEXT, Jornada INT, Equipo1 TEXT, Equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Equipo1),Temporada));
CREATE TABLE IF NOT EXISTS rep2 (Temporada TEXT, Jornada INT, Equipo1 TEXT, equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Equipo2),Temporada));
CREATE TABLE IF NOT EXISTS rep3 (Temporada TEXT, Jornada INT, Equipo1 TEXT, equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Equipo1,Equipo2),Temporada));
CREATE TABLE IF NOT EXISTS rep4 (Temporada TEXT, Jornada INT, Equipo1 TEXT, equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Equipo1,Equipo2),Temporada));
CREATE TABLE IF NOT EXISTS rep5 (Temporada TEXT, Jornada INT, Equipo1 TEXT, equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Jornada,Equipo1),Temporada));
CREATE TABLE IF NOT EXISTS rep6 (Temporada TEXT, Jornada INT, Equipo1 TEXT, equipo2 TEXT, Goles1 INT, Goles2 INT, PRIMARY KEY ((Temporada,Equipo1),Temporada));

#CARGA MASIVA PARA TABLAS
COPY practica.rep1 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH HEADER = TRUE;
COPY practica.rep2 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH HEADER = TRUE;
COPY practica.rep3 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH HEADER = TRUE;
COPY practica.rep4 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH HEADER = TRUE;
COPY practica.rep5 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH HEADER = TRUE;
COPY practica.rep6 (Temporada, Jornada, Equipo1, Equipo2, Goles1, Goles2) FROM '/archivo1' WITH HEADER = TRUE;
