import React, { memo, useLayoutEffect, useRef, useState } from 'react'
import { Subject_Generate_QR$, Subject_ReGenerate_QR$ } from '../../subjects/generate-qr.behavior-subject';
import { Subject_ImageUploaded$ } from '../../subjects/image.behavior-subject';
import FileUploadComponent from './file-upload.component';
import { Subject_ExistingQRFileUploaded$, Subject_FileUploaded$ } from '../../subjects/file.behavior-subject';
import { Subject_ShowModal$ } from '../../subjects/modal.behavior-subject';
function Component() {
    const moreContactFieldsDOM = useRef(null);
    const promptTextAreaDOM = useRef(null);
    const qrCodeDataDOM = useRef(null);
    const emailDOM = useRef(null);
    const genderDOM = useRef(null);
    const addressDOM = useRef(null);
    const nameDOM = useRef(null);
    const phoneDOM = useRef(null);
    const photoURL = useRef(null);
    const [type, setType] = useState(1);
    const mediaSource = useRef("");
    const fileSource = useRef("");
    const existingQR = useRef("");
    const setFormType = (type) => {
        setType(type);
    }
    const showHideMoreContactField = () => {
        if (moreContactFieldsDOM.current.style.display == 'none') {
            moreContactFieldsDOM.current.style.display = 'block';
        } else {
            moreContactFieldsDOM.current.style.display = 'none';
        }
    }
    const submit = (event) => {
        event.preventDefault();
        const promptText = promptTextAreaDOM && promptTextAreaDOM.current && promptTextAreaDOM.current.value ? promptTextAreaDOM.current.value : "";
        const qrCodeData = qrCodeDataDOM && qrCodeDataDOM.current && qrCodeDataDOM.current.value ? qrCodeDataDOM.current.value : "";
        let payload;
        switch (type) {
            case 1:
                payload = {
                    "qr_code_data": qrCodeData,
                    "image_prompt": (mediaSource.current != "") ? mediaSource.current : null,
                    "text_prompt": promptText,
                }
                break;
            case 2:
                payload = {
                    "qr_code_data": qrCodeData,
                    "qr_code_input_image": (existingQR != "") ? existingQR : null,
                    "qr_code_vcard": {
                        "tel": "+919830612244",
                        "impp": null,
                        "kind": null,
                        "note": "",
                        "role": "Intern",
                        "urls": [
                            "gooey.ai"
                        ],
                        "email": (emailDOM && emailDOM.current && emailDOM.current.value.trim() != "") ? emailDOM.current.value.trim() : "",
                        "gender": (genderDOM && genderDOM.current && genderDOM.current.value.trim() != "") ? genderDOM.current.value.trim() : "",
                        "address": (addressDOM && addressDOM.current && addressDOM.current.value.trim() != "") ? addressDOM.current.value.trim() : "",
                        "language": null,
                        "logo_url": null,
                        "timezone": null,
                        "job_title": null,
                        "photo_url": (photoURL && photoURL.current && photoURL.current.value.trim() != "") ? photoURL.current.value.trim() : "",
                        "given_name": null,
                        "family_name": null,
                        "format_name": (nameDOM && nameDOM.current && nameDOM.current.value.trim() != "") ? nameDOM.current.value.trim() : "",
                        "birthday_day": null,
                        "calendar_url": null,
                        "middle_names": null,
                        "organization": null,
                        "birthday_year": null,
                        "birthday_month": null,
                        "honorific_prefixes": null,
                        "honorific_suffixes": null,
                        "comma_separated_categories": null
                    },
                    "image_prompt": (midiaSource.current != "") ? midiaSource.current : null,
                    "qr_code_file": (midiaSource.current != "") ? midiaSource.current : null,
                    "use_url_shortener": true,
                    "text_prompt": promptText,
                    "negative_prompt": "ugly, disfigured, low quality, blurry, nsfw, text, words",
                    "image_prompt_controlnet_models": [
                        "sd_controlnet_canny",
                        "sd_controlnet_depth",
                        "sd_controlnet_tile"
                    ],
                    "image_prompt_strength": 0.3,
                    "image_prompt_scale": 1,
                    "image_prompt_pos_x": 0.5,
                    "image_prompt_pos_y": 0.5,
                    "selected_model": "dream_shaper",
                    "selected_controlnet_model": [
                        "sd_controlnet_brightness",
                        "sd_controlnet_tile"
                    ],
                    "output_width": 512,
                    "output_height": 512,
                    "guidance_scale": 9,
                    "controlnet_conditioning_scale": [
                        0.45,
                        0.35
                    ],
                    "num_outputs": 1,
                    "quality": 70,
                    "scheduler": "euler_ancestral",
                    "seed": 1628099939,
                    "obj_scale": 0.65,
                    "obj_pos_x": 0.5,
                    "obj_pos_y": 0.5
                };
                break;
            case 3:

                break;
            case 4:
                payload = {
                    "qr_code_input_image": (existingQR.current != "") ? existingQR.current : null,
                    "text_prompt": promptText,
                    "image_prompt": (mediaSource.current != "") ? mediaSource.current : null,
                }
                break;
        }
        payload && Subject_Generate_QR$.next(payload);
        Subject_ShowModal$.next(true);
    }
    useLayoutEffect(() => {
        Subject_ReGenerate_QR$.subscribe((data) => {
            data && submit();
        });
        Subject_ImageUploaded$.asObservable().subscribe((data) => {
            if (data) {
                mediaSource.current = data.mediaSource;
            }
        });
        Subject_FileUploaded$.asObservable().subscribe((data) => {
            if (data) {
                fileSource.current = data.mediaSource;
            }
        });
        Subject_ExistingQRFileUploaded$.asObservable().subscribe((data) => {
            if (data) {
                existingQR.current = data.mediaSource;
            }
        });
    }, []);
    return (
        <div className="px-4 md:w-6/12 w-full">

            <div className="col-lg-7 col-12">
                <div className="gui-input gui-input-textarea">
                    <label>
                        <span className="gui-html-container gui-md-container">
                            <h4>👩‍💻 Prompt</h4>
                            <p>
                                Describe the subject/scene of the QR Code.
                                <br />
                                Choose clear prompts and distinguishable visuals to ensure optimal
                                readability.
                            </p>
                        </span>
                    </label>
                    <div>
                        <textarea
                            ref={promptTextAreaDOM}
                            name="text_prompt"
                            placeholder="Bright sunshine coming through the cracks of a wet, cave wall of big rocks"
                            style={{ maxHeight: "90vh" }}
                            rows={2}
                            defaultValue={
                                ""
                            }
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className={"btn btn-theme btn-primary replicate-nav" + (type == 1 ? 'active' : '')}
                    value="yes"
                    name="tab-__qr_code_source-qr_code_data"
                    onClick={setFormType.bind({}, 1)}
                >
                    <span className="gui-html-container gui-md-container">
                        <p>🔗 URL or Text</p>
                    </span>
                </button>
                <button
                    type="submit"
                    className={"btn btn-theme btn-primary replicate-nav" + (type == 2 ? 'active' : '')}
                    value="yes"
                    name="tab-__qr_code_source-qr_code_vcard"
                    onClick={setFormType.bind({}, 2)}
                >
                    <span className="gui-html-container gui-md-container">
                        <p>📇 Contact Card</p>
                    </span>
                </button>
                <button
                    type="submit"
                    className={"btn btn-theme btn-primary replicate-nav" + (type == 3 ? 'active' : '')}
                    value="yes"
                    name="tab-__qr_code_source-qr_code_file"
                    onClick={setFormType.bind({}, 3)}
                >
                    <span className="gui-html-container gui-md-container">
                        <p>📄 Upload File</p>
                    </span>
                </button>
                <button
                    type="submit"
                    className={"btn btn-theme btn-primary replicate-nav" + (type == 4 ? 'active' : '')}
                    value="yes"
                    name="tab-__qr_code_source-qr_code_input_image"
                    onClick={setFormType.bind({}, 4)}
                >
                    <span className="gui-html-container gui-md-container">
                        <p>🏁 Existing QR Code</p>
                    </span>
                </button>
                {type == 1 && (
                    <>
                        <div className="gui-input gui-input-textarea">
                            <label>
                                <span className="gui-html-container gui-md-container">
                                    <p>Enter your URL/Text below.</p>
                                </span>
                            </label>
                            <div>
                                <textarea
                                    ref={qrCodeDataDOM}
                                    name="qr_code_data"
                                    placeholder="https://www.google.com/"
                                    style={{ maxHeight: "90vh" }}
                                    rows={2}
                                    defaultValue={"https://www.google.com/"}
                                />
                            </div>
                        </div>
                    </>
                )}
                {type == 2 && (
                    <>
                        <div className="gui-input gui-input-text">
                            <label htmlFor="input:__vcard_data__email:undefined">
                                <span className="gui-html-container gui-md-container">
                                    <p>Email</p>
                                </span>
                            </label>
                            <input
                                ref={emailDOM}
                                id="input:__vcard_data__email:undefined"
                                name="__vcard_data__email"
                                type="text"
                                placeholder="dev@gmail.com"
                                defaultValue=""
                            />
                        </div>
                        <div className="gui-input gui-input-text">
                            <label htmlFor="input:__vcard_data__format_name:undefined">
                                <span className="gui-html-container gui-md-container">
                                    <p>Name*</p>
                                </span>
                            </label>
                            <input
                                ref={nameDOM}
                                id="input:__vcard_data__format_name:undefined"
                                name="__vcard_data__format_name"
                                type="text"
                                placeholder="Supreme Overlord Alex Metzger, PhD"
                                defaultValue="Sahasrangshu Guha"
                            />
                        </div>
                        <div className="gui-input gui-input-text">
                            <label htmlFor="input:__vcard_data__tel:undefined">
                                <span className="gui-html-container gui-md-container">
                                    <p>Phone Number</p>
                                </span>
                            </label>
                            <input
                                ref={phoneDOM}
                                id="input:__vcard_data__tel:undefined"
                                name="__vcard_data__tel"
                                type="text"
                                placeholder="+1 (420) 669-6969"
                            />
                        </div>
                        <div className="gui-input gui-input-text">
                            <label htmlFor="input:__vcard_data__photo_url:undefined">
                                <span className="gui-html-container gui-md-container">
                                    <p>Photo URL</p>
                                </span>
                            </label>
                            <input
                                ref={photoURL}
                                id="input:__vcard_data__photo_url:undefined"
                                name="__vcard_data__photo_url"
                                type="text"
                                placeholder="https://www.xyz.com/images/image.png"
                                defaultValue=""
                            />
                        </div>
                        <div className="gui-expander accordion">
                            <div onClick={showHideMoreContactField} className="gui-expander-header accordion-header accordion-button collapsed">
                                <span className="gui-html-container gui-md-container">
                                    <p>More Contact Fields</p>
                                </span>
                            </div>
                            <div ref={moreContactFieldsDOM} className="gui-expander-body" style={{ display: "none" }}>
                                <div className="gui-input gui-input-text">
                                    <label htmlFor="input:__vcard_data__gender:undefined">
                                        <span className="gui-html-container gui-md-container">
                                            <p>Gender</p>
                                        </span>
                                    </label>
                                    <input
                                        ref={genderDOM}
                                        id="input:__vcard_data__gender:undefined"
                                        name="__vcard_data__gender"
                                        type="text"
                                        placeholder="F"
                                        defaultValue=""
                                    />
                                </div>
                                <div className="gui-input gui-input-textarea">
                                    <label>
                                        <span className="gui-html-container gui-md-container">
                                            <p>Notes</p>
                                        </span>
                                    </label>
                                    <div>
                                        <textarea
                                            name="__vcard_data__note"
                                            placeholder="- awesome person
                                                    - loves pizza
                                                    - plays tons of chess
                                                    - absolutely a genius"
                                            rows={2}
                                            style={{ maxHeight: "90vh" }}
                                            defaultValue={""}
                                        />
                                    </div>
                                </div>
                                <div className="gui-input gui-input-textarea">
                                    <label>
                                        <span className="gui-html-container gui-md-container">
                                            <p>Address</p>
                                        </span>
                                    </label>
                                    <div>
                                        <textarea
                                            ref={addressDOM}
                                            name="__vcard_data__address"
                                            placeholder="123 Main St, San Francisco, CA 94105"
                                            rows={2}
                                            style={{ maxHeight: "90vh" }}
                                            defaultValue={""}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>

                )}
                {type == 3 && (
                    <>
                        <FileUploadComponent type="file"></FileUploadComponent>
                    </>
                )}
                {type == 4 && (
                    <>
                        <FileUploadComponent type="qr"></FileUploadComponent>
                    </>
                )}
                <div className="gui-input gui-input-checkbox">
                    <input
                        type="checkbox"
                        id="input:use_url_shortener:undefined"
                        name="use_url_shortener"
                        defaultChecked=""
                    />
                    <label htmlFor="input:use_url_shortener:undefined">
                        <span className="gui-html-container gui-md-container">
                            <p>🔗 Shorten URL</p>
                        </span>
                    </label>
                </div>
                <span className="text-muted gui-html-container gui-md-container">
                    <p>
                        A shortened URL enables the QR code to be more beautiful and less
                        "QR-codey" with fewer blocky pixels.
                    </p>
                </span>
                <FileUploadComponent type="img"></FileUploadComponent>
                <div className="row">
                    <div className="col-lg-4 col-4 d-flex justify-content-end align-items-center">
                        <button
                            type="submit"
                            className="btn btn-theme btn-primary "
                            value="yes"
                            name="--submit-1"
                            onClick={submit}
                        >
                            <span className="gui-html-container gui-md-container">
                                <p>🏃 Submit</p>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
const QrPromptFormComponent = memo(Component);
export default QrPromptFormComponent;