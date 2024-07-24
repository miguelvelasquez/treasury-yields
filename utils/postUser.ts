type UserResponseType = { username: string; _id: string };

type PostUserType = (Username: string) => Promise<UserResponseType | null>;

export const postUser: PostUserType = async (username) => {
  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({ username }),
  });
  return await response.json();
};
