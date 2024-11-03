import OutputImage from './../../assets/Output.png';
function OutputComponent({ image, regenarateImage }) {
    const downloadImage = () => {
        if (image != "") {
            var a = document.createElement('a');
            a.href = image;
            a.download = image;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert("Generate image first");
        }
    }
    return (
        <div className="px-4 md:w-6/12 w-full">
            <div className="border border-slate-300 rounded-lg">
                <div className="py-3 px-5 rounded-t-lg bg-slate-100">
                    {image != "" && (
                        <img
                            src={image}
                            alt="Uploaded Image"
                            className="w-18px h-18px"
                        />
                    ) || (
                            <img
                                src={OutputImage}
                                alt="Uploaded Image"
                                className="w-18px h-18px output"
                            />
                        )}
                    <div
                        className="btn btn-theme btn-secondary download-button"
                        type="submit"
                        value="yes"
                        name="0ba404ba5facd3b8c712578b32e1d49b"
                    >
                        <div>
                            <span className="gui-html-container gui-md-container" onClick={downloadImage}>
                                <p>
                                    <i className="fa fa-download" aria-hidden="true" /> Download
                                </p>
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-theme btn-tertiary button-regenarate"
                        value="yes"
                        name="088a976e573f775a4c3e172872b4cca8"
                        onClick={regenarateImage}
                    >
                        <span className="gui-html-container gui-md-container">
                            <p>
                                <i className="fa fa-recycle" aria-hidden="true" /> Regenerate
                            </p>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OutputComponent