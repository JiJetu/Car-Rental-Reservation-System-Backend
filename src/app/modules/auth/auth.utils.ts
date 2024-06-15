import bcrypt from 'bcrypt';

export const isPasswordMatch = async (
    requestPassword: string,
    hashedPassword: string
  ) => {
    const isMatched = await bcrypt.compare(requestPassword, hashedPassword);

    return isMatched;
  };