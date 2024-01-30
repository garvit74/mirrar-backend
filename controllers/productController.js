import Product from "../models/product.js";

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      const products = await Product.find();
      res.json(products);
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { "variants.name": { $regex: query, $options: "i" } },
      ],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// const searchProducts = async (req, res) => {
//   console.log("kjscbhdk");
//   try {
//     const { query } = req.query;

//     if (!query) {
//       return res
//         .status(400)
//         .json({ error: "Query parameter 'query' is required" });
//     }

//     const products = await Product.find({
//       $or: [
//         { name: { $regex: query, $options: "i" } },
//         { description: { $regex: query, $options: "i" } },
//         { "variants.name": { $regex: query, $options: "i" } },
//       ],
//     });

//     res.json(products);
//   } catch (error) {
//     console.error("Error in searchProducts:", error.stack);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  // searchProducts,
};
