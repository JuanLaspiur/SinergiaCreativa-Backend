import { IUser } from '../models/User';
import User from '../models/User';
import { comparePasswords, hashPassword  } from '../helpers/passwordHelper';
import jwt from 'jsonwebtoken';


export class UserService {

  async register(name: string, email: string, password: string): Promise<IUser | { message: string, error:number }> {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return { message: 'El correo electrónico ya está registrado.', error:1 };
    }
    const hashedPassword = await hashPassword(password); 
    const newUser = new User({ name, email, password: hashedPassword });
   
    await newUser.save();
    return newUser;
  }

  async getAllUsers(): Promise<IUser[]> {
    return User.find();
  }


  async login(email: string, password: string): Promise<any> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await comparePasswords(user.password, password);
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    return { user, token };
  }

  async updateExpectedMonthlyIncome(userId: string, expectedMonthlyIncome: number): Promise<any> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      user.expectedMonthlyIncome = expectedMonthlyIncome;

      await user.save();
      return user;
    } catch (error) {
      throw new Error(`Error al actualizar la expectativa mensual: ${(error as Error).message}`);
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<IUser | { message: string, error: number }> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return { message: 'Usuario no encontrado', error: 1 };
      }

      const isPasswordValid = await comparePasswords(user.password, currentPassword);
      if (!isPasswordValid) {
        return { message: 'Contraseña actual incorrecta', error: 2 };
      }

      const hashedPassword = await hashPassword(newPassword);
      user.password = hashedPassword;

      await user.save();
      return user;
    } catch (error) {
      throw new Error(`Error al cambiar la contraseña: ${(error as Error).message}`);
    }
  }
  async deleteUser(userId: string): Promise<{ message: string, error: number }> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return { message: 'Usuario no encontrado', error: 1 };
      }
  
      await User.deleteOne({ _id: userId }); 
      return { message: 'Usuario eliminado exitosamente', error: 0 };
    } catch (error) {
      throw new Error(`Error al eliminar el usuario: ${(error as Error).message}`);
    }
  }
  

}
