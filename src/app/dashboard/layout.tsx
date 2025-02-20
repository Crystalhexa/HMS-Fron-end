import Sidebar from "@/components/global/sidebar";

type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

const Layout = async ({ params: { workspaceId }, children }: Props) => {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar  pathName={""} />
      <div className="w-full p-6 remove-scrollbar   overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default Layout;
