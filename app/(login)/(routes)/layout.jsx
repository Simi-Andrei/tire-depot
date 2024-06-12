import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const AppLayout = ({ children }) => {
  return (
    <div className="flex">
      <Header />
      <div className="flex flex-col w-full">
        <div className="border-b h-12">Topbar</div>
        <main className="text-sm tracking-wide p-2 flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
