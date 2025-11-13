const shoesDao = require('../daos/shoes');


module.exports = {
    readShoes,
    createShoes,
    deleteShoesById,
    updateShoeById
}

function readShoes() {

    const stmt = shoesDao.prepare('SELECT * from shoes');
    return stmt.all();

}

function createShoes(data) {
    const stmt = shoesDao.prepare(`
        INSERT INTO shoes(id, type, brand, size, color, price, acquired_date, sold_date, notes)
        VALUES(@id, @type, @brand, @size, @color, @price, @acquired_date, @sold_date, @notes)
        `);
    stmt.run(data);
    return data;

}

function deleteShoesById(id) {
    const stmt = shoesDao.prepare('DELETE from shoes where ID = ?');
    const info = stmt.run(id);
    return info.changes;
}

function updateShoeById(id,data) {
    const stmt = shoesDao.prepare(`
        UPDATE shoes
        SET 
        type = @type,
        brand=@brand,
        color=@color,
        price=@price,
        acquired_date=@acquired_date,
        sold_date=@sold_date,
        notes=@notes 
        where id = @id`)
    const info = stmt.run(data);
    return info.changes;
}
