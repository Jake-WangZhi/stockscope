import { useUser } from "@/hooks/useUser";
import { Typography } from "@mui/material";
import { UpdateDisplayNameModal } from "./UpdateDisplayNameModal";

type Props = {
  email: string;
};

export const DisplayNameSection = ({ email }: Props) => {
  const { userInfo } = useUser({
    email: email,
  });

  return (
    <>
      {userInfo && (
        <div className="flex items-center">
          <Typography variant="subtitle1" className="text-blue-800">
            {`Hi, ${
              userInfo.DisplayName
                ? userInfo.DisplayName
                : userInfo.FirstName +
                  (userInfo.LastName ? ` ${userInfo.LastName}` : "")
            }`}
          </Typography>
          <UpdateDisplayNameModal
            displayName={userInfo.DisplayName}
            email={email}
          />
        </div>
      )}
    </>
  );
};
