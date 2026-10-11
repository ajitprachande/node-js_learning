import { nanoid } from 'nanoid';

import { shortenPostRequestBodySchema } from '../validations/request.validation.js';
import { db } from '../db/index.js';
import { urlsTable } from '../models/index.js';

import { createUrl, getUserUrls, getTargetUrl, deleteShortcode } from '../services/url.service.js';
import { error } from 'node:console';



export const urlShorten = async (req, res) => {
    // const userId = req.user?.id;
    // console.log("Request body:", req.body);

    // if (!userId) {
    //     return res.status(401).json({
    //         message: `You must be loged in to access this resource`,
    //         success: false
    //     });
    // }
    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            error: validationResult.error.format(),
            success: false
        });
    }
    const { url, shortCode: code } = validationResult.data;

    console.log("Validated data:", validationResult.data);

    const shortCode = code ?? nanoid(7);

    // console.log(shortCode);

    // const [result] = await db.insert(urlsTable).values({
    //     shortCode,
    //     targetUrl: url,
    //     userId: req.user.id,
    // }).returning({
    //     id: urlsTable.id,
    //     shortCode: urlsTable.shortCode,
    //     targetUrl: urlsTable.targetUrl,
    // });

    const userId = req.user.id;

    const result = await createUrl(url, shortCode, userId);

    if (result.error) {
        return res.status(409).json({
            message: result.error,
            success: false
        });
    }

    return res.status(201).json({
        id: result.id,
        shortCode: result.shortCode,
        targetUrl: result.targetUrl
    })
}


export const getAllUrl = async (req, res) => {

    const userId = req.user.id;

    const result = await getUserUrls(userId);

    if (result.error) {
        return res.status(400).json({
            message: result.error,
            success: false
        });
    }

    return res.status(200).json({
        message: "All urls",
        result
    });
}


export const redirectToTargetUrl = async (req, res) => {
    const code = req.params.shortCode;

    const result = await getTargetUrl(code);

    if (result.error) {
        return res.status(404).json({
            error: `${result.error}`,
            success: false
        });
    }

    // return res.status(200).json({
    //     message: `Target Url:-`,
    //     result,
    // });

    return res.redirect(result.targetUrl);
}

export const DeleteShortcode = async (req, res) => {
    //shortCode id
    const urlId = req.params.urlId;
    const userId  = req.user.id;
    const result = await deleteShortcode(urlId, userId);

    if (result.error) {
        return res.status(404).json({
            error: result.error,
            success: false
        });
    }
    console.log(result);
    

    return res.status(200).json({
        message: `ShortCode Deleted.`,
        success: true,
        id: result.id,
        code: result.code
    });
}

