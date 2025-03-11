// src/types/index.ts
export interface User {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  type?: string;
  // Add other user properties as needed
}

export interface Group {
  id: string;
  name: string;
  description: string;
  category: string;
  // Add other group properties as needed
}


