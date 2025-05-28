import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
