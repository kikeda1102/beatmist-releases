export type ContactFormResponse = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};
