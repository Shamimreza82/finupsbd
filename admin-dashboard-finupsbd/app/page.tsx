
import LoginForm from "@/components/auth/login";
import Footer from "@/components/Home-Page/Footer";
import Navber from "@/components/Home-Page/Navber";



export default function Home() {
  return (
    <div>
      <Navber/>
      <LoginForm/>
      <Footer/>
    </div>
  );
}
