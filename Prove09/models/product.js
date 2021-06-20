// Product model

const fs = require('fs');

// Using node-fetch
const fetch = require('node-fetch');

module.exports = class Product {
    static fetchAll(page, cb) {
        const productsUrl = 'https://pokeapi.co/api/v2/pokemon?offset=' + (page - 1) * 10 + '&limit=10';
        fetch(productsUrl)
            .then(res => res.json())
            .then(result => {
                let products = result.results;
                const lastPage = Math.ceil(result.count / 10);
                cb(products, lastPage);
            })
            .catch(err => console.log(err));
    }

    static search(page, query, cb) {
        const productsUrl = 'https://pokeapi.co/api/v2/pokemon?offset=' + (page - 1) * 10 + '&limit=10';

        fetch(productsUrl)
            .then(res => res.json())
            .then(result => {
                let products = result.results;
                // search products
                const filteredProducts = products.filter(product => {
                    // search product tags
                    let tagFound = false;
                    product.tags.forEach(tag => {
                        if (tag.toLowerCase().includes(query))
                            tagFound = true;
                    });

                    return tagFound ||
                        product.name.toLowerCase().includes(query) ||
                        product.description.toLowerCase().includes(query);
                });

                const lastPage = Math.ceil(filteredProducts.length / 10);
                cb(filteredProducts.slice((page - 1) * 10, page * 10), lastPage);
            })
            .catch(err => console.log(err));
    }
};


// // Using local products.json file
// const path = require('path');
// const p = path.join(__dirname, '..', 'data', 'products.json');

// module.exports = class Product {
//     static fetchAll(cb) {

//         fs.readFile(p, (err, fileContent) => {
//             let products;
//             if (err) {
//                 products = [];
//             } else {
//                 products = JSON.parse(fileContent);
//             }
//             cb(products);
//         });
//     }

//     static search(query, cb) {
//         fs.readFile(p, (err, fileContent) => {
//             let products;
//             if (err)
//                 products = [];
//             else
//                 products = JSON.parse(fileContent);

//             // search products
//             const filteredProducts = products.filter(product => {
//                 // search product tags
//                 let tagFound = false;
//                 product.tags.forEach(tag => {
//                     if (tag.toLowerCase().includes(query))
//                         tagFound = true;
//                 });

//                 return tagFound ||
//                     product.name.toLowerCase().includes(query) ||
//                     product.description.toLowerCase().includes(query);
//             });

//             cb(filteredProducts);
            
//         });
//     }
// };