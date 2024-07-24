type SignupResponseType = { acknowledged: boolean; insertedId: string };

type PostSignupType = (username: string) => Promise<SignupResponseType>;

export const postSignup: PostSignupType = async (username) => {
  const response = await fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({ username }),
  });
  return await response.json();
};
