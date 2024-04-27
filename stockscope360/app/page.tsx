"use client";
import { Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { SignInButton } from "@/components/SignInButton";
import { DisplayNameSection } from "@/components/DisplayNameSection";
import StockDataGrid from "@/components/StockDataGrid";
import CalendarButton from "@/components/CalenderButton";
import DefaultAndFavoriteToggle from "@/components/DefaultFavoriteToggle";
import { DateProvider } from "@/context/DateContext";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [isStockIdsChanged, setIsStockIdsChanged] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-400">
      <div className="p-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <Grid container alignItems="center">
          <Grid item xs={2}>
            {session?.user?.email && (
              <DisplayNameSection email={session.user.email} />
            )}
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              StockScope360
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "end" }}>
            <SignInButton session={session} />
          </Grid>
        </Grid>
      </div>
      <div className="relative flex place-items-center justify-between w-full">
        <div className="flex w-1/2 h-[480px] items-center justify-center bg-orange-300">
          Plot
        </div>
        <div className="flex w-1/2 h-[480px] justify-center">
          <StockDataGrid
            session={session}
            setIsStockIdsChanged={setIsStockIdsChanged}
          />
        </div>
      </div>
      <DateProvider>
        <div>
          <CalendarButton />
          {session?.user?.email && (
            <DefaultAndFavoriteToggle
              email={session.user.email}
              isStockIdsChanged={isStockIdsChanged}
              setIsStockIdsChanged={setIsStockIdsChanged}
            />
          )}
        </div>
      </DateProvider>
    </main>
  );
}
