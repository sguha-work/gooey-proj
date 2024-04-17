import Navbar from "../utilities/navbar.component";
import Drag from "../utilities/drag.component";
import Upscale from "../utilities/upscale.component";
import Steps from "../utilities/steps.component";
import Feature from "../utilities/feature.component";
import StartNow from "../utilities/start-now.component";
import Review from "../utilities/review.component";
import Footer from "../utilities/footer.component";
import ResultCard from "../utilities/result-card.component";

export default function Home() {
  return (
    <>
      <Navbar />
      <Drag />
      <ResultCard></ResultCard>
      <Upscale />
      <Steps />
      <Feature />
      {/* <StartNow /> */}
      {/* <Review /> */}
      <Footer />
    </>
  );
}
