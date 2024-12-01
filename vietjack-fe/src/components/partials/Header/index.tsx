"use client";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

import Button from "@/components/core/Button";
import Popover, { AppPopoverRef } from "@/components/core/Popover";
import useAuth from "@/stores/useAuth";

const authPath = ["/login", "/sign-up"];

const Header = () => {
  const { accessToken, userAuth, signOut } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  const popoverRef = useRef<AppPopoverRef>(null);

  return (
    <header className="h-[75px] flex items-center mx-[18px]">
      <div className="max-w-[1200px] w-full mx-auto flex items-center justify-between">
        <div className="w-full">
          <Link
            href={"/"}
            className="text-red-600 font-bold text-[32px] italic"
          >
            <Image
              src="/img/vietjack-logo.svg"
              width={64}
              height={64}
              alt="Picture of the author"
            />
          </Link>
        </div>
        <div>
          {!accessToken ? (
            <>
              {!authPath.includes(pathName) && (
                <div>
                  <Button
                    onClick={() => router.push("/login")}
                    className="w-[200px]"
                  >
                    Đăng nhập
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Popover
              onClickOutside={() => popoverRef.current?.close()}
              ref={popoverRef}
              render={() => (
                <div className="bg-white shadow-[rgba(149,157,165,.2)_0px_8px_24px] px-4 py-2 rounded">
                  <button
                    className="hover:bg-black/5 px-5 py-1 rounded"
                    onClick={signOut}
                  >
                    <p>Đăng xuất</p>
                  </button>
                </div>
              )}
            >
              <div
                className="flex items-center cursor-pointer gap-2"
                onClick={() => popoverRef.current?.open()}
              >
                <CircleUserRound strokeWidth={1.2} />
                <div className="text-nowrap">{userAuth?.fullName}</div>
              </div>
            </Popover>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
