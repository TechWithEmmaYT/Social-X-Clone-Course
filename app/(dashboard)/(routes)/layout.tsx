import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "../_components/Sidebar";
import { CurrentUserProvider } from "@/context/currentuser-provider";
import ModalProvider from "@/context/modal-provider";
import Rightbar from "../_components/Rightbar";
import EditProfileModal from "../_components/EditProfileModal";
import { checkUserSubscription } from "@/app/actions/subcription";
import { PLAN_TYPE } from "@/constants/pricing-plans";

async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const plan = await checkUserSubscription();
  const isPro = plan === PLAN_TYPE.PRO ? true : false;

  if (!session?.user) {
    return redirect("/");
  }
  return (
    <CurrentUserProvider>
      <ModalProvider />
      <EditProfileModal />
      <div className="h-screen">
        <div
          className="container h-full mx-auto
      xl:px-30 max-w-7xl"
        >
          <div className="flex items-start justify-center h-full">
            {/* <Sidebar /> */}
            <div
              className="shrink-0 flex-[0.10] lg:flex-[0.28] 
          relative"
            >
              <Sidebar {...{ isPro }} />
            </div>
            <div className="flex flex-row h-screen flex-1 gap-0">
              {/* <Mainbar /> */}
              <main
                className="!bg-background lg:max-w-[600px] relative h-full
            flex-1 flex lg:flex-[0.95]"
              >
                <hr className="w-[1px] fixed h-screen bg-[#eee] dark:bg-[rgb(47,51,54)]" />
                <div className="w-full"> {children}</div>
              </main>
              <div className="relative hidden lg:flex shrink-0 h-screen">
                <hr className="w-[1px] fixed h-screen bg-[#eee] dark:bg-[rgb(47,51,54)]" />
                <div className="w-full pl-8">
                  <Rightbar {...{ isPro }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CurrentUserProvider>
  );
}

export default MainLayout;
