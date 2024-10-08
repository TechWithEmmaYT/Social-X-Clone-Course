export const generateBaseUsername = (name: string, email?: string) => {
  let baseUsername = "";
  if (name) {
    baseUsername = name.split(" ")?.[0]?.toLowerCase();
  } else if (email) {
    baseUsername = email.split(" ")?.[0]?.toLowerCase();
  } else {
    baseUsername = `user`;
  }

  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `${baseUsername}${randomNumber}`;
};
