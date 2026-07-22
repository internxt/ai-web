let currentToken: string | null = null;

export const setTurnstileToken = (token: string | null) => {
  currentToken = token;
};

export const getTurnstileToken = () => currentToken;
