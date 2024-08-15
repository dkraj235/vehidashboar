import React, { useContext, useEffect, useState } from "react";
import { SocialMediaContext } from "../../context/setttingSociaContext";

export default function SocialMedia() {
  const { socialMediaData } = useContext(SocialMediaContext);
  const [popupVisible, setPopupVisible] = useState(false);

  const [socialMediaFormData, setSocialMediaFormData] = useState({
    twitter: "",
    linkedin: "",
    instagram: "",
    facebook: "",
    android: "",
    ios: "",
  });

  useEffect(() => {
    if (socialMediaData) {
      setSocialMediaFormData(socialMediaData);
    }
  }, [socialMediaData]);

 
  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  function handleSocialMediaChange(e) {
    setSocialMediaFormData({
      ...socialMediaFormData,
      [e.target.name]: e.target.value,
    });
    console.log(socialMediaFormData);
  }

  const handleSocialMediaSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/settings/social-media`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(socialMediaFormData),
      });

      if (response.ok) {
        const updatedSocialMediaSettings = await response.json();
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <div className="container formContainer">
        <form onSubmit={handleSocialMediaSubmit} className="ml-5 py-7 rounded">
          <div className="flex flex-wrap gap-0 w-full mt-3">
            <div className="lg:w-1/2 flex flex-col">
              <label className="mb-2 text-lg" htmlFor="twitter">
                Twitter:
              </label>
              <input
                onChange={handleSocialMediaChange}
                className="w-90 rounded formInput mr-10"
                type="text"
                id="twitter"
                name="twitter"
                value={socialMediaFormData.twitter}
                placeholder="https://twitter.com/example"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col">
              <label className="mb-2 text-lg" htmlFor="linkedin">
                LinkedIn:
              </label>
              <input
                onChange={handleSocialMediaChange}
                className="w-90 rounded formInput mr-10"
                type="text"
                id="linkedin"
                name="linkedin"
                value={socialMediaFormData.linkedin}
                placeholder="https://linkedin.com/in/example"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-0 w-full mt-3">
            <div className="lg:w-1/2 flex flex-col">
              <label className="mb-2 text-lg" htmlFor="instagram">
                Instagram:
              </label>
              <input
                onChange={handleSocialMediaChange}
                className="w-90 rounded formInput mr-10"
                type="text"
                id="instagram"
                name="instagram"
                value={socialMediaFormData.instagram}
                placeholder="https://instagram.com/example"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col">
              <label className="mb-2 text-lg" htmlFor="instagram">
                FaceBook:
              </label>
              <input
                onChange={handleSocialMediaChange}
                className="w-90 rounded formInput mr-10"
                type="text"
                id="facebook"
                name="facebook"
                value={socialMediaFormData.facebook}
                placeholder="https://instagram.com/example"
              />
            </div>

            <div className="lg:w-1/2 flex flex-col mt-3">
              <label className="mb-2 text-lg" htmlFor="android">
                Android App:
              </label>
              <input
                onChange={handleSocialMediaChange}
                className="w-90 rounded formInput mr-10"
                type="text"
                id="android"
                name="android"
                value={socialMediaFormData.android}
                placeholder="https://play.google.com/store/apps/details?id=com.example"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-0 w-full mt-3">
            <div className="lg:w-1/2 flex flex-col">
              <label className="mb-2 text-lg" htmlFor="ios">
                iOS App:
              </label>
              <input
                onChange={handleSocialMediaChange}
                className="w-90 rounded formInput mr-10"
                type="text"
                id="ios"
                name="ios"
                value={socialMediaFormData.ios}
                placeholder="https://apps.apple.com/us/app/example/id1234567890"
              />
            </div>
          </div>
          <div className=" flex justify-end gap-2">
            {popupVisible && <div className="popup">Saved succesfully!</div>}
            <br /> <br />
            <button
              type="submit"
              className="w-40 bg-black hover:bg-logoClr hover:text-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Now
            </button>
          </div>
        </form>

        <div className="ml-3">
          <ul className="flex gap-3 justify-center items-center">
            <li>
              <a href={socialMediaData.facebook}>
                <i className="fa-brands fa-facebook bg-white rounded px-2 py-2"></i>
              </a>
            </li>
            <li>
              <a href={socialMediaData.instagram}>
                <i className="fa-brands fa-instagram bg-white rounded  "></i>
              </a>
            </li>
            <li>
              <a href={socialMediaData.twitter}>
                <i className="fa-brands fa-twitter bg-white rounded    "></i>
              </a>
            </li>
            {/* <li>
              <a href={socialMediaData.you}>
                <i className="fa-brands fa-youtube bg-white rounded  "></i>
              </a>
            </li> */}
            <li>
              <a href={socialMediaData.linkedin}>
                <i className="fa-brands fa-linkedin bg-white rounded  "></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
