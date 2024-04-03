const axios = require('axios')

module.exports = {
    getData: async (req, res) => {
        try {

            const allowedKeys = ['category', 'limit'];
            const invalidKeys = Object.keys(req.query).filter(key => !allowedKeys.includes(key));

            const category = req.query.category
            const limit = parseInt(req.query.limit)
            
            if (invalidKeys.length > 0) {
                return res.status(400).json({ 
                    error: 'Invalid query parameters. Only "category" and "limit" are allowed.' 
                });
            }

            if (limit && isNaN(limit)) {
                return res.status(400).json({
                    message: "Invalid limit"
                })
            }

            await axios({
                method: "GET",
                url: "https://api.publicapis.org/entries"
            }).then((response) => {
                const data = response.data.entries
                if (category && limit) {
                    const categoryData = data.filter((item) => item.Category === category)
                    const limitedData = categoryData.slice(0, limit);
                    res.status(200).json({
                        data: limitedData
                    })
                } else if (category) {
                    const categoryData = data.filter((item) => item.Category === category)
                    res.status(200).json({
                        data: categoryData
                    })
                } else if (limit) {
                    const limitedData = data.slice(0, limit);
                    res.status(200).json({
                        data: limitedData
                    })
                } else {
                    res.status(200).json({
                        data: data
                    })
                }
            }).catch((error) => {
                res.status(400).json({
                    message: "Failed to retrieve data"
                })
            })

        } catch (error) {
            res.status(400).json({
                message: "Failed to retrieve data"
            })
        }
    }
}