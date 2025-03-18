import { Request, Response } from 'express';
import * as CommissionService from '../services/commissionServices';


export const createCommission = async (req: Request, res: Response) => {
  try {
    const commission = await CommissionService.createCommission(req.body);
    res.status(201).json(commission);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllCommissions = async (req: Request, res: Response) => {
  try {
    const commissions = await CommissionService.getAllCommissions();
    res.status(200).json(commissions);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};


export const getCommissionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const commission = await CommissionService.getCommissionById(id);
    if (commission) {
      res.status(200).json(commission);
    } else {
      res.status(404).json({ message: 'Comisión no encontrada' });
    }
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};


export const updateCommission = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const commission = await CommissionService.updateCommission(id, req.body);
    if (commission) {
      res.status(200).json(commission);
    } else {
      res.status(404).json({ message: 'Comisión no encontrada' });
    }
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteCommission = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const commission = await CommissionService.deleteCommission(id);
    if (commission) {
      res.status(200).json({ message: 'Comisión eliminada' });
    } else {
      res.status(404).json({ message: 'Comisión no encontrada' });
    }
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
