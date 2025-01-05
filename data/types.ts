export type UserData = {
  email: string;
  password: string;
  isSigningUp: boolean
};

export type DecodedToken = {
  email: string;
  exp: number;
  userId: number
}

export type Book = {
  author: string;
  borrowed: boolean;
  current_borrower_id: number;
  description: string;
  id: number;
  image_name: string;
  isbn: string;
  last_borrowed_at: string;
  name: string;
}
