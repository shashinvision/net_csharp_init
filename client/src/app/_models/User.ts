export interface User {
  userName: string; // if i need to be optional username?: string;
  token: string;
  photoUrl?: string;
  knownAs: string;
  gender: string;
}
