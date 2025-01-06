  import Sidebar from '@/components/global/sidebar';
  
  type Props = {
    params: { workspaceId: string };
    children: React.ReactNode;
  };
  
  const Layout = async ({ params: { workspaceId }, children }: Props) => {
    // Authenticate user
   
  
  
    return (
      
        <div className="flex h-screen w-screen">
          <Sidebar activeWorkspaceId={workspaceId} />
          <div className="w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden">
           
            <div className="mt-4">{children}</div>
          </div>
        </div>
    );
  };
  
  export default Layout;
  