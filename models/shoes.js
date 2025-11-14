const shoesDao = require('../daos/shoes');


module.exports = {
    readShoes,
    createShoes,
    deleteShoesById,
    updateShoeById,
    searchShoes
}

function readShoes() {

    const stmt = shoesDao.prepare('SELECT * from shoes');
    return stmt.all();

}

function createShoes(data) {
    const requiredFields = ['type', 'brand', 'size', 'color', 'price', 'acquired_date'];

    // Check each required field
    for (const field of requiredFields) {
        if (!data[field]) {
            // Throw a custom error if missing
            throw new Error(`${field} is required`);
        }
    }
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
    const info = stmt.run({...data,id});
    return info.changes;
}

function searchShoes(criteria) {
    let query = 'SELECT * from shoes where 1=1';
    const params = {};

    if(criteria.brand) {
        query += ' AND brand = @brand';
        params.brand = criteria.brand;  

    }

      if(criteria.color) {
        query += ' AND color = @color';
        params.color = criteria.color;  

    }

          if(criteria.sizeGreater) {
        query += ' AND size >= @sizeGreater';
        params.sizeGreater = criteria.sizeGreater;  

    }

        if(criteria.sizeSmaller) {
        query += ' AND size <= @sizeSmaller';
        params.size = criteria.sizeSmaller;  

    }

        if(criteria.type) {
        query += ' AND type = @type';
        params.type = criteria.type;  

    }

    if (criteria.acquiredStart) {
        query += ' AND acquired_date >= @acquiredStart';
        params.acquiredStart = criteria.acquiredStart;
    }

    if (criteria.acquiredEnd) {
        query += ' AND acquired_date <= @acquiredEnd';
        params.acquiredEnd = criteria.acquiredEnd;
    }

    if (criteria.soldStart) {
        query += ' AND sold_date >= @soldStart';
        params.soldStart = criteria.soldStart;
    }

    if (criteria.soldEnd) {
        query += ' AND sold_date <= @soldEnd';
        params.soldEnd = criteria.soldEnd;
    }

     if (criteria.priceGreater) {
        query += ' AND price>= @priceGreater';
        params.priceGreater = criteria.priceGreater;
    }

    if (criteria.priceSmaller) {
        query += ' AND price <= @priceSmaller';
        params.priceSmaller = criteria.priceSmaller;
    }

    const stmt = shoesDao.prepare(query);
    return stmt.all(params);


}