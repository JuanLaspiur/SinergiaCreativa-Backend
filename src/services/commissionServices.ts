import { Commission, ICommission  } from "@src/models/Commission";

export const createCommission = async (commissionData: ICommission): Promise<ICommission> => {
  try {
    const commission = new Commission(commissionData);
    await commission.save();
    return commission;
  } catch (error:any) {
    throw new Error('Error al crear la comisión: ' + error.message);
  }
};


export const getAllCommissions = async (): Promise<ICommission[]> => {
  try {
    return await Commission.find();
  } catch (error:any) {
    throw new Error('Error al obtener las comisiones: ' + error.message);
  }
};


export const getCommissionById = async (id: string): Promise<ICommission | null> => {
  try {
    return await Commission.findById(id);
  } catch (error:any) {
    throw new Error('Error al obtener la comisión: ' + error.message);
  }
};


export const updateCommission = async (id: string, commissionData: ICommission): Promise<ICommission | null> => {
  try {
    return await Commission.findByIdAndUpdate(id, commissionData, { new: true });
  } catch (error:any) {
    throw new Error('Error al actualizar la comisión: ' + error.message);
  }
};


export const deleteCommission = async (id: string): Promise<ICommission | null> => {
  try {
    return await Commission.findByIdAndDelete(id);
  } catch (error:any) {
    throw new Error('Error al eliminar la comisión: ' + error.message);
  }
};
