import SideNavbar from "@/components/admin/SideNavbar";
import { Inter } from "next/font/google";
import { cn } from "../../lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "min-h-screen w-full text-black md:flex  ",
        inter.className,
        {
          "debug-screens": process.env.NODE_ENV === "development",
        }
      )}
    >
      <Tabs defaultValue="dash" className="mt-4  md:hidden ">
        <TabsList className="mx-5">
          <TabsTrigger value="dash">
            <Link className="text-xs" href="/admin">
              Dashboard
            </Link>
          </TabsTrigger>
          <TabsTrigger value="users">
            <Link className="text-xs" href="/admin/users">
              Users
            </Link>
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Link className="text-xs" href="/admin/orders">
              Orders
            </Link>
          </TabsTrigger>
          <TabsTrigger value="setting">
            <Link className="text-xs" href="/admin/settings">
              Settings
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="hidden md:block">
        <SideNavbar />
      </div>
      <main className="p-8 w-full">
        {/* <Sidebar />
        <Header></Header>
        <PageWrapper>
      </PageWrapper> */}
        {children}
      </main>
    </div>
  );
}