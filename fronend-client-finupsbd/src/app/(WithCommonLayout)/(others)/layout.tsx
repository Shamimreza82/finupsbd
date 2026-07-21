import MenuSidebar from "./menu-sidebar";

const OtherPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 lg:px-14 lg:py-16 xl:px-14">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="col-span-1">
            <MenuSidebar />
          </div>
          <div className="lg:col-span-3 xl:pl-12">{children}</div>
        </div>
      </div>
    </>
  );
};

export default OtherPageLayout;
