import Navbar from "../utilities/navbar.component";
import Drag from "../utilities/drag.component";
import Footer from "../utilities/footer.component";
import { useLayoutEffect, useState } from "react";
import { Subject_Generate_QR$, Subject_Generate_QR_Success$ } from "../../subjects/generate-qr.behavior-subject";
import { generateQR } from "../../services/qr.service";
import { createContext } from "react";
import Modal from "../utilities/modal.component";
import { Subject_ShowModal$ } from "../../subjects/modal.behavior-subject";
export default function Home() {
  const OutputContext = createContext();
  const [output, setOutput] = useState("");
  useLayoutEffect(() => {
    Subject_Generate_QR$.subscribe((data) => {
      data && generateQR(data);
    });
    Subject_Generate_QR_Success$.subscribe((data) => {console.log("response data",data);
      Subject_ShowModal$.next(false);
      if(data&&data.data&&data.data.detail&&data.data.detail.error) {
        alert(data.data.detail.error);
      } else {
        if (data && data.data) {
          setOutput(data.data);
        }
      }
    });
  }, []);
  return (
    <>
      <Modal></Modal>
      <Navbar />
      <Drag output={output} />
      {/* <ResultCard /> */}
      <Footer />

    </>
  );
}
