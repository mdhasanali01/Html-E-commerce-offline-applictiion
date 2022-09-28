var db = openDatabase('wdb', '1.0', 'product db', 3*1024*1024, db=> {
    console.log('db created');
});
if (!db) console.log('No database created');
function createTable(sql, cb) {
 
    db.transaction(tx=> {
        tx.executeSql(sql, [], (tx, result)=> {
            cb('Table created');
        }, (tx, err)=> {
            cb(err.message || err);
        });
    });


}
function nonQuery(sql, values, successCb, errorCb) {
    db.transaction(tx=> {
        console.log(sql);
        tx.executeSql(sql,values, (tx, result)=> {
            console.log(result);
            successCb(
                {
                    rowsAffected: result.rowsAffected, insertId: result.insertId
                }
            );
        }, (tx, err)=> {
            errorCb(err.message || err);
        });
    });
}
function query(sql, params, successCb, errorCb) {
    db.transaction(tx=> {
       
        tx.executeSql(sql,params, (tx, result)=> {
          
            successCb(
                result.rows
            );
        }, (tx, err)=> {
            errorCb(err.message || err);
        });
    });
}