import Navbar from "./navbar.component";
import Drag from "./drag.component";
import Upscale from "./upscale.component";
import Steps from "./steps.component";
import Feature from "./feature.component";
import StartNow from "./start-now.component";
import Review from "./review.component";
import Footer from "./footer.component";

export default function Home() {
  return (
    <>
      <Navbar />
      <Drag />
      <Upscale />
      <Steps />
      <Feature />
      <StartNow />
      <Review />
      <Footer />
    </>
  );
}
