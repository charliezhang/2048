# echo "ALTER TABLE scores ADD COLUMN contact TEXT;" | sqlite3 $1
echo "ALTER TABLE scores ADD COLUMN ip TEXT;" | sqlite3 $1
