const brandTable = require('../models/brand.model');
const productTable = require('../models/product.model');

const { eq } = require('drizzle-orm')

const db = require('../db');
// const { error } = require('node:console');

exports.getbrands = async function (req, res) {
    const brands = await db.select().from(brandTable)
    res.status(200).json(brands);
};

exports.getBrandById = async function (req, res) {
    const brandId = req.params.id;

    if (!brandId) {
        return res.select(401).json({
            message: `Brand with ID ${brandId} does not exists.`
        })
    }

    const [brand] = await db
        .select()
        .from(brandTable)
        .where(table => eq(table.id, brandId))
        .limit(1)

    return res.status(200).json({ brand });
}

exports.createbrand = async function (req, res) {
    const { brandName, supportEmail } = req.body;

    // if (!brandName || !brandName == '')
    //     res.status(400).json({ error: `Brand Name required.` })

    // if (!supportEmail || supportEmail == '')
    //     res.status(400).json({ error: `Support email required.` })

    //insert:
    const [result] = await db.insert(brandTable).values({
        brandName,
        supportEmail
    }).returning({ id: brandTable.id });

    return res.status(201).json({
        message: "Brand Created sucesssfull",
        success: true,
        id: result.id
    })
}

exports.getProductsByBrand = async function (req, res) {
    const brandId = req.params.id; 

    const products = await db.select().from(productTable).where(eq(productTable.brandId, brandId))

    return res.status(200).json({products})
}

