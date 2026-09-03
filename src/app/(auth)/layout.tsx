import { DarkmodeToggle } from "@/components/common/darkmode-toggle";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative">
      <div className="absolute top-4 right-4">
        <DarkmodeToggle />
      </div>
    </div>
  );
}

//Menit 9:14
