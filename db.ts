export type User = {
  username: string;
  password: string;
};

export type UserAddress = {
  username: string;
  address: string;
};

// Pretend this is a database instead of hard-coded
const users: User[] = [
  {
    username: "admin",
    password: "password",
  },
  {
    username: "user2",
    password: "password2",
  },
  { username: "user1", password: "password1" },
];

const userAddresses: UserAddress[] = [
  { username: "admin", address: "123 Main St" },
  { username: "admin", address: "456 Elm St" },
  { username: "admin", address: "789 Oak St" },
  { username: "user2", address: "321 Maple Ave" },
  { username: "user2", address: "654 Pine Rd" },
];

/** Returns all users in the database  */
export async function getAllUsers(): Promise<User[]> {
  return Promise.resolve(users);
}

export async function getUser(
  username: string
): Promise<User | null | undefined> {
  // Simulate a user lookup
  const user = users.find((user) => user.username === username);
  return Promise.resolve(user);
}

export async function getAddressHistoryForUser(
  username: string
): Promise<UserAddress[]> {
  // Simulate a database lookup for user addresses
  return Promise.resolve(
    userAddresses.filter((address) => address.username === username)
  );
}
