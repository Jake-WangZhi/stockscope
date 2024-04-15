import { useUserInfoMutation } from "@/hooks/useUserMutation";
import { Button } from "@mui/material";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

type Props = {
  session: Session | null;
};

export const SignInButton = ({ session }: Props) => {
  const [isMutationCalled, setIsMutationCalled] = useState(false);

  const handleSignIn = useCallback(() => signIn("google"), []);
  const handleSignOut = useCallback(() => signOut(), []);

  const putUserInfoMutation = useUserInfoMutation({
    method: "PUT",
    onSuccess: () => {
      console.log("Success to upsert user");
    },
    onError: () => {
      console.log("Failed to upsert user");
    },
  });

  useEffect(() => {
    if (session?.user?.name && session?.user?.email && !isMutationCalled) {
      putUserInfoMutation.mutate({
        name: session.user?.name,
        email: session.user?.email,
      });
      setIsMutationCalled(true);
    }
  }, [
    isMutationCalled,
    putUserInfoMutation,
    session?.user?.email,
    session?.user?.name,
  ]);

  return (
    <>
      {session ? (
        <Button variant="text" onClick={handleSignOut}>
          Sign Out
        </Button>
      ) : (
        <Button variant="text" onClick={handleSignIn}>
          Sign In
        </Button>
      )}
    </>
  );
};
