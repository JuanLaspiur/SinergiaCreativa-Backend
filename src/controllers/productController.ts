import { Request, Response } from 'express';
import * as ProductService  from '../services/productServices';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await ProductService.getProductById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: `Product not found with id: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error fetching product with id: ${id}` });
  }
};

export const createNewProduct = async (req: Request, res: Response): Promise<void> => {
  const productData = req.body;
  try {
    const newProduct = await ProductService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

export const updateExistingProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const productData = req.body;
  try {
    const updatedProduct = await ProductService.updateProduct(id, productData);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: `Product not found with id: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error updating product with id: ${id}` });
  }
};

export const deleteExistingProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductService.deleteProduct(id);
    if (deletedProduct) {
      res.status(200).json({ message: `Product with id: ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: `Product not found with id: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error deleting product with id: ${id}` });
  }
};
