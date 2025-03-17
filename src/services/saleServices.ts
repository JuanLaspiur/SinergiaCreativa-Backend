import Sale, { ISale } from '../models/Sale';
import { Types } from 'mongoose';

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

/**
 * Obtiene las ventas de un usuario del día.
 * @param userId - ID del usuario.
 * @returns Una lista de ventas del día.
 */
export const getUserDailySales = async (userId: string) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sales = await Sale.find({
      userId: new Types.ObjectId(userId),
      date: { $gte: today },
    });

    return { success: true, data: sales };
  } catch (error) {
    return { success: false, message: 'Error al obtener las ventas del día', error };
  }
};

/**
 * Obtiene las ventas de un usuario del mes.
 * @param userId - ID del usuario.
 * @returns Una lista de ventas del mes.
 */
export const getUserMonthlySales = async (userId: string) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const sales = await Sale.find({
      userId: new Types.ObjectId(userId),
      date: { $gte: startOfMonth },
    }).populate('product');

    return { success: true, data: sales };
  } catch (error) {
    return { success: false, message: 'Error al obtener las ventas del mes', error };
  }
};

export const getSalesByUserId = async (userId: string): Promise<{ success: boolean; message: string; data?: ISale[]; error?: string }> => {
  try {
    const sales = await Sale.find({ userId: new Types.ObjectId(userId) }).populate('product').populate('userId');
    
    if (!sales || sales.length === 0) {
      return { success: false, message: 'Ventas no encontradas', error: 'No se encontraron ventas para el usuario' };
    }

    return { success: true, message: 'Ventas obtenidas correctamente', data: sales };
  } catch (error) {
    return { success: false, message: 'Error al obtener las ventas del usuario', error: (error as Error).message };
  }
};


