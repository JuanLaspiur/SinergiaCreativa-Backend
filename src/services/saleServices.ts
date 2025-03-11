import Sale, { ISale } from '@src/models/Sale';

/**
 * Crea una nueva venta.
 * @param saleData - Datos de la venta.
 * @returns La venta creada.
 */
export const createSale = async (saleData: ISale): Promise<ISale> => {
  try {
    const sale = new Sale(saleData);
    await sale.save();
    return sale;
  } catch (error) {
    throw new Error('Error al crear la venta: ' + (error as Error).message);
  }
};

/**
 * Obtiene todas las ventas.
 * @returns Una lista de ventas.
 */
export const getAllSales = async (): Promise<ISale[]> => {
  try {
    return await Sale.find().populate('product').populate('userId');
  } catch (error) {
    throw new Error('Error al obtener las ventas: ' + (error as Error).message);
  }
};

/**
 * Obtiene una venta por su ID.
 * @param id - ID de la venta.
 * @returns La venta encontrada o null.
 */
export const getSaleById = async (id: string): Promise<ISale | null> => {
  try {
    return await Sale.findById(id).populate('product').populate('userId');
  } catch (error) {
    throw new Error('Error al obtener la venta: ' + (error as Error).message);
  }
};

/**
 * Actualiza una venta por su ID.
 * @param id - ID de la venta.
 * @param saleData - Datos a actualizar.
 * @returns La venta actualizada o null.
 */
export const updateSale = async (id: string, saleData: Partial<ISale>): Promise<ISale | null> => {
  try {
    return await Sale.findByIdAndUpdate(id, saleData, { new: true });
  } catch (error) {
    throw new Error('Error al actualizar la venta: ' + (error as Error).message);
  }
};

/**
 * Elimina una venta por su ID.
 * @param id - ID de la venta.
 * @returns La venta eliminada o null.
 */
export const deleteSale = async (id: string): Promise<ISale | null> => {
  try {
    return await Sale.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error al eliminar la venta: ' + (error as Error).message);
  }
};
