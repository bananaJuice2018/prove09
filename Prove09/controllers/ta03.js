// TA03 controller

const Product = require('../models/product');
var searchQuery = "";
var page = 1;
var lastPage = 0;

// handle ta03/ 
exports.getProducts = (req, res, next) => {
    page = 1;
    searchQuery = "";
    searchProducts(res);
};

// handle ta03/search
exports.getSearchProducts = (req, res, next) => {
    page = 1;
    searchQuery = req.query.query;
    searchProducts(res);
};

// handle ta03/first
exports.getFirstProducts = (req, res, next) => {
    page = 1;
    searchProducts(res);
};

// handle ta03/prev
exports.getPrevProducts = (req, res, next) => {
    if(page > 1) {
        page -= 1;
    }
    searchProducts(res);
};

// handle ta03/next
exports.getNextProducts = (req, res, next) => {
    if(page < lastPage) {
        page += 1;
    }
    searchProducts(res);
};

// handle ta03/last
exports.getLastProducts = (req, res, next) => {
    page = lastPage;
    searchProducts(res);
};

const searchProducts = (res) => {
    console.log("PAGE", page);
    console.log("QUERY", searchQuery);
    const query = searchQuery.toLowerCase();
    if(query == "") {
        Product.fetchAll(page, (filteredProducts, totalPages) => {
            console.log("TOTAL PAGES", totalPages);
            lastPage = totalPages;
            res.render('pages/ta03', {
                title: 'Team Activity 03',
                path: '/ta03',
                products: filteredProducts,
                query: searchQuery,
                page: page,
                lastPage: totalPages
            });
        });
    } else {
        Product.search(page, query, (filteredProducts, totalPages) => {
            console.log("TOTAL PAGES", totalPages);
            lastPage = totalPages;
            res.render('pages/ta03', {
                title: 'Team Activity 03',
                path: '/ta03',
                products: filteredProducts,
                query: searchQuery,
                page: page,
                lastPage: totalPages
            });
        });
    }

}