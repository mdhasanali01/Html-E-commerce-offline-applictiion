function checkLogin() {
    return sessionStorage.getItem('custdata') != null;
}
function saveLoginData(id, name) {
    var data = {
        id: id,
        name: name
    };
    sessionStorage.setItem('custdata', JSON.stringify(data));
}
function getLoginData() {
    var data = sessionStorage.getItem('custdata');
    if (data) {
        return JSON.parse(data);
    } else return null;
}
function signIn(em, scb, ecb) {

    query(
        'SELECT customerid, customername FROM customers WHERE email=?',
        [em],
        r=> {
            console.log(r);
            if (r.length > 0) {
                var data = {
                    id: r.item(0).customerid,
                    name: r.item(0).customername
                };
                sessionStorage.setItem('custdata', JSON.stringify(data));
                return scb({
                    success: true, msg: 'Customer data saved'
                });

            } else {
                return scb({
                    success: false, msg: 'Not registered.'
                });
            }
        },
        err=> {
            return ecb({
                success: false, msg: err.message
            });
        }
    );
}
function register(name, phone, email, address, scb, ecb) {
    nonQuery('INSERT INTO customers (customername, phone, email,address) VALUES (?,?,?,?)',
        [name,
            phone,
            email,
            address],
        scb,
        ecb);

}