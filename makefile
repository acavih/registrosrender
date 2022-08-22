include registros-backend/.env

dumpdir=copydb
NOW=$(shell echo date +%Y_%m_%d)

date:
  echo $(NOW)

backupRemoteDb:
  mongodump -o $(dumpdir) --uri $(URI_DB_MONGO_REMOTE)

restoreDumpToLocal:
  mongo acavih --host localhost --eval "db.dropDatabase()"
  mongorestore --nsInclude=acavih.* --host=localhost --port=27017 $(dumpdir)

remoteToLocal: backupRemoteDb restoreDumpToLocal
