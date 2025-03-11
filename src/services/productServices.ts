import Product, {IProduct} from "@src/models/Product";  

export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    return await Product.find();
  } catch (error) {
    throw new Error('Error fetching products');
  }
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  try {
    return await Product.findById(id);
  } catch (error) {
    throw new Error(`Error fetching product with id: ${id}`);
  }
};

export const createProduct = async (productData: IProduct): Promise<IProduct> => {
  try {
    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    throw new Error('Error creating product');
  }
};

export const updateProduct = async (id: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
  try {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  } catch (error) {
    throw new Error(`Error updating product with id: ${id}`);
  }
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Error deleting product with id: ${id}`);
  }
};
