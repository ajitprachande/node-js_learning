// const { PRODUCTS } = require('../models/OLDproducts.js');
const productTable = require('../models/product.model');
const brandTable = require('../models/brand.model');
const { sql } = require('drizzle-orm');
const { eq } = require('drizzle-orm');

const db = require('../db');


exports.getAllProducts = async function (req, res) {
    const products = await db.select().from(productTable)
    res.status(200).json(products);
}

exports.searchProducts = async function (req, res) {
    try {

        //search product by query parameter:

        const name = req.query.name;

        console.log(name);
        
        
        const price = Number(req.query.price);

        if (name) {
            const products = await db.select()
                .from(productTable)
                .where(
                    sql`to_tsvector('english', ${productTable.name})  @@ plainto_tsquery('english', ${name})`

                );
            return res.status(200).json(products);
        }

        if (req.query.price !== undefined) {

            if (Number.isNaN(price)) {
                return res.status(400).json({
                    message: `price must be valid number`
                });
            }
            const products = await db
                .select()
                .from(productTable)
                .where(
                    eq(productTable.price, price)
                );
            return res.status(200).json(products);
        }
        return res.status(400).json({
            message: "Please provide name or price"
        });
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            message: `Internal server error`
        })
    }
}

exports.getProductById = async function (req, res) {
    const productId = req.params.id

    const product = await db
        .select()
        .from(productTable)
        .where(table => eq(table.id, productId))
        .leftJoin(brandTable, eq(productTable.brandId, brandTable.id))
        .limit(1);

    if (!product) {
        return res.status(401).json({
            message: "Product not found.",
            success: false
        })
    }
    res.status(200).json({ product })
}

exports.createeProduct = async function (req, res) {
    const { name, price, description, brandId } = req.body;


    if (!name || name == '')
        return res.status(400).json({ error: `Product name required.` })

    if (!price || price == '')
        return res.status(400).json({ error: `Product price required.` })

    //insert
    const [result] = await db.insert(productTable).values({
        name,
        price,
        description,
        brandId
    }).returning({
        id: productTable.id,
    });

    return res.status(201).json({
        message: "Product created Successful.",
        success: true,
        id: result.id
    })

}

exports.deleteProductByID = async function (req, res) {
    const id = req.params.id;


    await db.delete(productTable).where(eq(productTable.id, id))
    return res.status(200).json({
        message: `Product deleted successfully`,
        success: true
    });
}
