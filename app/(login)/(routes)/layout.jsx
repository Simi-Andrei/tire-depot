import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="text-sm tracking-wide p-2 flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
