import React from "react";
import Navbar from "./Navbar";
import Drag from "./Drag";
import Upscale from "./Upscale";
import Steps from "./Steps";
import Feature from "./Feature";
import StartNow from "./StartNow";
import Review from "./Review";
import Footer from "./Footer";

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
