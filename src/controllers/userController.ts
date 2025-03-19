import { Request, Response } from 'express';
import { UserService } from '../services/userServices';

const userService = new UserService();

export class UserController {

 
  static async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      const newUser = await userService.register(name, email, password);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario', error });
    }
  }

 
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
  }


  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const { user, token } = await userService.login(email, password);
      res.status(200).json({ message: 'Login exitoso', user, token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  static async updateExpectedMonthlyIncome(req: Request, res: Response): Promise<void> {
    const { userId, expectedMonthlyIncome } = req.body;

    try {
      const updatedUser = await userService.updateExpectedMonthlyIncome(userId, expectedMonthlyIncome);
      res.status(200).json({ message: 'Expectativa mensual actualizada', updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la expectativa mensual', error });
    }
  }
  static async changePassword(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;  
    const { currentPassword, newPassword } = req.body;
  
    try {
      const result = await userService.changePassword(userId, currentPassword, newPassword);

      if ((result as { error: number }).error) {
        res.status(400).json({ message: (result as { message: string }).message });
      } else {
        res.status(200).json({ message: 'Contraseña actualizada correctamente', user: result });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al cambiar la contraseña', error });
    }
  }
  

  static async deleteUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;

    try {
      const result = await userService.deleteUser(userId);
      if (result.error) {
        res.status(400).json({ message: result.message });
      } else {
        res.status(200).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
  }

}
