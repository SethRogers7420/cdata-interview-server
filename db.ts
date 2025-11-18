export type User = {
  userId: number;
  tenantId: number;
  username: string;
  password: string;
};

export type UserAddress = {
  userId: number;
  address: string;
};

// Pretend this is a database instead of hard-coded
const users: User[] = [
  {
    userId: 1,
    tenantId: 1,
    username: "admin",
    password: "password",
  },
  {
    userId: 2,
    tenantId: 2,
    username: "user2",
    password: "password2",
  },
  {
    userId: 3,
    tenantId: 1,
    username: "user1",
    password: "password1",
  },
];

const userAddresses: UserAddress[] = [
  { userId: 1, address: "123 Main St" },
  { userId: 1, address: "456 Elm St" },
  { userId: 1, address: "789 Oak St" },
  { userId: 2, address: "321 Maple Ave" },
  { userId: 2, address: "654 Pine Rd" },
];

export async function runQuery(sql: string): Promise<any> {
  // Simulate a database query
  if (sql.includes("FROM users")) {
    return Promise.resolve(users[0]);
  }
}

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
  userId: number
): Promise<UserAddress[]> {
  // Simulate a database lookup for user addresses
  return Promise.resolve(
    userAddresses.filter((address) => address.userId === userId)
  );
}
