import { mockUsers } from '../data/mockData';
import type { AuthResponse } from '../types';

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = btoa(`${user.id}:${Date.now()}`);

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    };
  },

  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
  }
};
