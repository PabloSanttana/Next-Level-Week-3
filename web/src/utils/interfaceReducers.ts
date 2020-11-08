export interface Store {
  auth: {
    isAuthenticated: boolean;
    user: {
      email: string;
      id: number;
      name: string;
      token: string;
    };
  };
}
