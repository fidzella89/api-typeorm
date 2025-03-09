import bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { AppDataSource } from "../typeorm/typeorm.config";
import { User } from "../entities/User";

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async createUser(userData: Partial<User>): Promise<{ message: string; user: User }> {
    // Check if email already exists
    const existingUser = await this.userRepository.findOne({ where: { email: userData.email } });
    if (existingUser) {
        throw new Error(`The Email "${userData.email}" is already registered.`);
    }

    if (userData.password) {
        userData.passwordHash = await bcrypt.hash(userData.password, 10);
    }

    const newUser = this.userRepository.create(userData);

    const savedUser = await this.userRepository.save(newUser);
    
    return { message: "User added successfully", user: savedUser };
  }
  
  async updateUser(id: string, userData: Partial<User>): Promise<{ message: string; user: User } | null> {
    const user = await this.getUserById(id); 
    if (!user) {
        throw new Error("User not found.");
    }

    if (userData.email) {
        const existingUser = await this.userRepository.findOne({ where: { email: userData.email } });
        if (existingUser && existingUser.id !== id) {
            throw new Error(`The Email "${userData.email}" is already taken.`);
        }
    }

    if (userData.password) {
        userData.passwordHash = await bcrypt.hash(userData.password, 10);
        delete userData.password;
    }

    this.userRepository.merge(user, userData);
    const updatedUser = await this.userRepository.save(user);

    return { message: "User updated successfully", user: updatedUser };
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const result = await this.userRepository.delete(id);
  
    if (result.affected === 0) {
      throw new Error("User not found or already deleted.");
    }
  
    return { message: "User deleted successfully" };
  }  
}
