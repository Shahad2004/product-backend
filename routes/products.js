import express from "express";
const router = express.Router();


let products =[
{ id: 1, name: "Laptop", price: 1200 },
{ id: 2, name: "Phone", price: 800 }
];


// localhost:3001/api/products get all products
router.get("/",(req,res)=>{
    res.json(products);

});

//Get a single product by ID (localhost:3001/api/products/:id)
router.get('/:id',(req, res) =>{
const product = products.find(p => p.id === parseInt(req.params.id));
product ? res.json(product) : res.status(404).send('Product not found');
});


//Post a new product (localhost:3001/api/products)
router.post('/', (req,res) => {
 const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
 };
 products.push(newProduct);
 res.json(newProduct)
});

//update product by ID (localhost:3001/api/products/:id)
router.put('/:id',(req,res) => {
const product = products.find(p => p.id ===parseInt(req.params.id));
if (!product) return res.status(404).send('Product not found');

product.name = req.body.name;
product.price = req.body.price;
res.json(product);
});

//Delete product by ID (localhost:3001/api/products/:id)
router.delete('/:id',(req,res) => {
const index = products.findIndex(p => p.id === parseInt(req.params.id)); //parseInt(req.params.id) converts the ID from a string to a number
if (index === -1) return res.status(404).send("Product not found");


const deletedProduct = products.splice(index, 1);
  res.json(deletedProduct);
});

export default router;