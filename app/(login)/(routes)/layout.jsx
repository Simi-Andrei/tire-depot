import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Topbar from "@/components/topbar/Topbar";

const AppLayout = ({ children }) => {
  return (
    <div className="flex">
      <Header />
      <div className="flex flex-col w-full">
        <Topbar />
        <main className="text-sm tracking-wide p-2 flex-1 bg-neutral-50">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
