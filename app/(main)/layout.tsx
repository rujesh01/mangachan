import { AppSidebar } from "@/components/GLOBAL/app-sidebar";
import Navbar from "@/components/GLOBAL/navbar/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <div className="flex w-full flex-col flex-1 min-h-screen">
          <Navbar />
          <main className="p-3">
            <div className="">{children}</div>
          </main>
        </div>
    </SidebarProvider>
  );
}
