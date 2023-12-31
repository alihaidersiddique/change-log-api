import prisma from '../db'

// Get All
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

    res.json({ data: user.products })
}

// Get one
export const getOneProduct = async (req, res) => {
    const productId = req.params.id // getting requested product id from parameter

    const product = await prisma.product.findFirst({
        where: {
            id: productId,
            belongsToId: req.user.id
        }
    })

    res.json({ data: product })
}

// create product
export const createProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        })
        res.json({ data: product })
    } catch (e) {
        next(e)
    }
}

// update product 
export const updateProduct = async (req, res) => {
    const updatedProduct = await prisma.product.update({
        where: {
            id: req.params.id,
            belongsToId: req.user.id
        },
        data: {
            name: req.body.name
        }
    })

    res.json({ data: updatedProduct })
}

// delete product
export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id: req.params.id,
            belongsToId: req.user.id
        }
    })

    res.json({ data: deleted })
}

