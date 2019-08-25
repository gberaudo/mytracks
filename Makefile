GPG_KEYS := CF8E9976 8F8B408A632A5AEC


.PHONY: secrets.md.gpg
secrets.md.gpg:
	gpg --keyserver pgp.mit.edu --keyserver-options timeout=20 --recv-keys $(GPG_KEYS) || true
	gpg --yes --output $@ --encrypt $(addprefix --recipient ,$(GPG_KEYS)) secrets.md

.PHONY: secrets.md
secrets.md:
	gpg --yes --output $@ --decrypt secrets.md.gpg

stops: data/transports.utf8.geojson

transport-tiles:
	rm -f data/transports.geojson data/raw_transports.geojson
	ogr2ogr -f GeoJSON data/raw_transports.geojson data/bus_stops.vrt
	ogr2ogr -f GeoJSON \
		-sql "SELECT Nummer as id, Name as name, Verkehrsmittel as type FROM Betriebspunkt WHERE Betriebspunkttyp in ('Haltestelle', 'Haltestelle_und_Bedienpunkt')" \
		-t_srs EPSG:4326 \
		data/transports.geojson data/raw_transports.geojson
	iconv -f ISO_8859-15 -t UTF8 data/transports.geojson > data/transports.utf8.geojson
	rm -rf ui/src/tiles
	tippecanoe --buffer 100 --no-tile-compression --exclude=name --output-to-directory=ui/src/tiles data/transports.utf8.geojson

compactoux:
	#ogr2ogr -f GeoJSON -t_srs EPSG:3857 data/transports.utf8.3857.geojson data/transports.utf8.geojson
	node ./encoder.js data/transports.utf8.geojson ui/src/compactoux


data/switzerland-padded.osm.pbf:
	wget http://planet.osm.ch/switzerland-padded.osm.pbf -O data/switzerland-padded.osm.pbf

osm: data/switzerland-padded.osm.pbf


psql:
	PGPASSWORD=ae52345345 psql -h localhost -p 15432 -U www-data mytracks
