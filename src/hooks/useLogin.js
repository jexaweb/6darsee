export const useLogin = () => {
  const login = (email, password) => {
    console.log(email, password);
  };
  return { login };
};
