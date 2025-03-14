import { Request, Response } from 'express';
import * as SaleService from '../services/saleServices';

/**
 * Crear una venta.
 */
export const createSale = async (req: Request, res: Response): Promise<void> => {
  try {
    const sale = await SaleService.createSale(req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * Obtener todas las ventas.
 */
export const getAllSales = async (_req: Request, res: Response): Promise<void> => {
  try {
    const sales = await SaleService.getAllSales();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * Obtener una venta por ID.
 */
export const getSaleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const sale = await SaleService.getSaleById(req.params.id);
    if (!sale) {
      res.status(404).json({ message: 'Venta no encontrada' });
      return;
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * Actualizar una venta.
 */
export const updateSale = async (req: Request, res: Response): Promise<void> => {
  try {
    const sale = await SaleService.updateSale(req.params.id, req.body);
    if (!sale) {
      res.status(404).json({ message: 'Venta no encontrada' });
      return;
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * Eliminar una venta.
 */
export const deleteSale = async (req: Request, res: Response): Promise<void> => {
  try {
    const sale = await SaleService.deleteSale(req.params.id);
    if (!sale) {
      res.status(404).json({ message: 'Venta no encontrada' });
      return;
    }
    res.status(200).json({ message: 'Venta eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * Obtener las ventas del día de un usuario.
 */
export const getDailySales = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const result = await SaleService.getUserDailySales(userId);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Ventas del día obtenidas correctamente',
        data: result.data,
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.message,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las ventas del día',
      error: (error as Error).message,
    });
  }
};

/**
 * Obtener las ventas del mes de un usuario.
 */
export const getMonthlySales = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const result = await SaleService.getUserMonthlySales(userId);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Ventas del mes obtenidas correctamente',
        data: result.data,
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.message,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las ventas del mes',
      error: (error as Error).message,
    });
  }
};

/**
 * Obtiene todas las ventas por ID de usuario.
 * @param req - Solicitud con el parámetro `userId`.
 * @param res - Respuesta a enviar.
 */
export const getSalesByUserId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;
    const sales = await SaleService.getSalesByUserId(userId);
    
    if (!sales || sales.length === 0) {
      return res.status(404).json({ message: 'Ventas no encontradas' });
    }
    
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener las ventas del usuario', error: (error as Error).message });
  }
};