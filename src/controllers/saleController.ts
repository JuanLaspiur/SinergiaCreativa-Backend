import { Request, Response } from 'express';
import * as SaleService from '@src/services/saleServices';

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
