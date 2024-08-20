const Wishlist = require('../models/Wishlist');

exports.addProductToWishlist = (req, res) => {
  const wishlist = new Wishlist(req.body);
  wishlist.save((err, wishlist) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to save product to wishlist',
      });
    }
    res.json(wishlist);
  });
};

exports.getWishlistByUserId = (req, res) => {
  Wishlist.find({ user: req.profile._id })
    .populate('products', 'name price')
    .exec((err, wishlist) => {
      if (err) {
        return res.status(400).json({
          error: 'No wishlist found for this user',
        });
      }
      res.json(wishlist);
    });
};

exports.removeProductFromWishlist = (req, res) => {
  Wishlist.findOneAndRemove({ _id: req.params.wishlistId }, (err, wishlist) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to remove product from wishlist',
      });
    }
    res.json({
      message: 'Product removed from wishlist successfully',
    });
  });
};
