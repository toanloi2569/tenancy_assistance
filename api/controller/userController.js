var New = require('../schema/new')

exports.houseSearch = function(req, res, next) {
    minPrice = (req.params.minPrice == undefined) ? 0 : req.params.minPrice;
    maxPrice = (req.params.maxPrice == undefined) ? 1000000000 : req.params.maxPrice;
    minSquare = (req.params.minSquare == undefined) ? 0 : req.params.minSquare;
    district = (req.params.district == undefined) ? '/*/' : `/${req.params.district}/`;
    ward = (req.params.ward == undefined) ? '/*/' : `/${req.params.ward}/`;
    // console.log(minPrice);
    

    New.find({
        "price": {$in: [minPrice, maxPrice]},
        "square": {$gt: minSquare},
        "district": {$regex : district},
        "ward" : {$regex: ward},
    })
        .sort([["price"]])
        .exec(function (err, houses) {
            if (err) {return nexr(err);}
            // render
            console.log(houses);
            
        })
}