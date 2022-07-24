import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa"; 

function Footer() {
  return (
    <footer className="bg-gray-400 w-screen pt-4 mt-8 ">
      <div className="mx-auto px-4 ">
        <div className="flex flex-wrap ">
          <div className="w-full flex flex-col justify-center items-start">
            <h4 className="text-xl font-semibold">
              Follow for the next applications
            </h4>
            <h5 className="text-md mt-0 mb-2 text-gray-700">
              Follow me on these platforms.
            </h5>
            <div className="mt-1 mb-2 flex">
              <button
                className="bg-white text-blue-400 shadow-lg font-normal h-8 w-8 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                type="button"
              >
                <a
                  href="https://twitter.com/caferoglu_alp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaTwitter />
                </a>
              </button>
              <button
                className="bg-white text-blue-600 shadow-lg font-normal h-8 w-8 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                type="button"
              >
                <a
                  href="https://www.instagram.com/alp.caferoglu/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram />
                </a>
              </button>
              <button
                className="bg-white text-blue-600 shadow-lg font-normal h-8 w-8 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                type="button"
              >
                <a href="" target="_blank" rel="noreferrer">
                  <FaFacebook />
                </a>
              </button>
            </div>
          </div>
        </div>
        <hr className="my-2 border-white" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center ">
            <div className="text-sm text-gray-600 font-semibold pb-3">
              Copyright © {new Date().getFullYear()} LifeTracker by{" "}
              <a
                href="https://www.creative-tim.com"
                className="text-gray-600 hover:text-gray-900"
              >
                Hasan Alp Caferoglu
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
