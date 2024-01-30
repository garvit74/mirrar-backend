import chai,{ expect } from 'chai';  // Using Expect style

import chaiHttp from "chai-http";
import mongoose from "mongoose";
import app from "../index.js";
import Product from "../models/product.js";
import connectDB from "../config/database.js";
import delay from 'delay';


expect(chaiHttp);

describe("E-commerce API", () => {
  before(() => {
    connectDB();
  });


  beforeEach(async () => {
    await Product.deleteMany({});
  });

  describe("Product CRUD Operations", () => {
    it("should create a new product", async () => {
      await delay(5000)
      const res = await chai
        .request(app)
        .post("/api/products")
        .send({
          name: "Product 1",
          description: "Description 1",
          price: 20,
          variants: [
            {
              name: "Variant 1",
              sku: "SKU123",
              additionalCost: 5,
              stockCount: 10,
            },
          ],
        });

      expect(res).to.have.status(201);
      expect(res.body).to.be.a("object");
      expect(res.body).to.have.property("_id");
    });

    it("should get all products", async () => {
      await Product.create({
        name: "Product 2",
        description: "Description 2",
        price: 30,
        variants: [
          {
            name: "Variant 2",
            sku: "SKU456",
            additionalCost: 7,
            stockCount: 15,
          },
        ],
      });

      const res = await chai.request(app).get("/api/products");

      expect(res).to.have.status(200);
      expect(res.body).to.be.a("array");
      expect(res.body).to.have.lengthOf(1);
    });

    it("should update a product", async () => {
      const product = await Product.create({
        name: "Product 3",
        description: "Description 3",
        price: 40,
        variants: [
          {
            name: "Variant 3",
            sku: "SKU789",
            additionalCost: 8,
            stockCount: 20,
          },
        ],
      });

      const res = await expect()
        .request(app)
        .put(`/api/products/${product._id}`)
        .send({ price: 50 });

      expect(res).to.have.status(200);
      expect(res.body).to.be.a("object");
      expect(res.body.price).to.equal(50);
    });

    it("should delete a product", async () => {
      const product = await Product.create({
        name: "Product 4",
        description: "Description 4",
        price: 60,
        variants: [
          {
            name: "Variant 4",
            sku: "SKU101",
            additionalCost: 10,
            stockCount: 25,
          },
        ],
      });

      const res = await chai
        .request(app)
        .delete(`/api/products/${product._id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal({
        message: "Product deleted successfully",
      });
    });

    it("should retrieve a specific product by ID", async () => {
      const product = await Product.create({
        name: "Product 5",
        description: "Description 5",
        price: 70,
        variants: [
          {
            name: "Variant 5",
            sku: "SKU202",
            additionalCost: 12,
            stockCount: 30,
          },
        ],
      });

      const res = await chai.request(app).get(`/api/products/${product._id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.a("object");
      expect(res.body._id).to.equal(product._id.toString());
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});

export {}; // Add this line to avoid potential issues with TypeScript
