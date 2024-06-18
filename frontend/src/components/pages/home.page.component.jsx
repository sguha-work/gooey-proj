import { createRef, useEffect, useState } from "react";
import Upload from "../utilities/upload.component";
import Result from "../utilities/result.component";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const resultRef = createRef();

  useEffect(() => {
    if (uploadedFile) {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [uploadedFile, resultRef]);

  return (
    <>
      <Upload onUploadSuccess={setUploadedFile} />
      {uploadedFile && (
        <div ref={resultRef}>
          <Result originalImage={uploadedFile} />
        </div>
      )}
    </>
  );
}
