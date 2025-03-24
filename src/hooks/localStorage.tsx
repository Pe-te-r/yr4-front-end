import useLocalStorageState from "use-local-storage-state";

const STORAGE_KEY = "user";

interface UserStorageType {
  token: string;
  userId: string;
  role: string;
}

export function useUserStorage() {
  const [user, setUser] = useLocalStorageState<UserStorageType | null>(
    STORAGE_KEY,
    { defaultValue: null }
  );

  const saveUser = (token: string, userId: string, role: string) => {
    setUser({ token, userId, role });
  };

  const updateToken = (newToken: string) => {
    setUser((prev) => (prev ? { ...prev, token: newToken } : null));
  };

  const updateRole = (newRole: string) => {
    setUser((prev) => (prev ? { ...prev, role: newRole } : null));
  };

  const getUser = () => user;

  const isAuthenticated = !!user?.token;

  const deleteUser = () => {
    setUser(null);
  };

  return { 
    user, 
    saveUser, 
    updateToken, 
    updateRole,
    getUser, 
    deleteUser,
    isAuthenticated
  };
}