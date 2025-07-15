import profileIcon from "../assets/images/profileIcon.svg";
import emailIcon from "../assets/images/ic_round-email.svg";
import gmail from "../assets/images/gmail.svg";
import whatsup from "../assets/images/whatsImg.svg";
import facebook from "../assets/images/facebook.svg";
import Instagram from "../assets/images/instgram.svg";
import message from "../assets/images/message.svg";
import googlPlay from "../assets/images/googlPlay.svg";
googlPlay.svg;
import { useRef } from "react";
import { useEffect } from "react";
import DividerWithText from "../components/dividerWithText/DividerWithText";
const ContactUs = () => {
  const contact = useRef();
  useEffect(() => {
    contact.current.scrollIntoView();
  }, []);
  return (
    <div className="pt-20 bg-[#F7F7FF] pb-8" ref={contact}>
      <div className="container flex gap-40">
        <div>
          <h1 className="font-normal text-[#2F2E41] text-[1.5rem] leading-9 mb-3">
            تواصل معنا
          </h1>
          <p className="text-primary text-[1.1rem]">
            نحن هنا للإجابة على استفساراتك ومساعدتك، لا تتردد في التواصل
            <br /> معنا في أي وقت.
          </p>
          <form className="w-[28rem] mt-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="الاسم"
                className="relative w-full py-3 px-7 rounded-[5px] border border-solid-1 border-[#B9B5FF] mb-2"
              />
              <img
                src={profileIcon}
                className="absolute  z-10 top-0 right-0 py-4 px-1"
              />
            </div>
            <div className="relative w-full">
              <input
                type="email"
                placeholder="البريد الالكتروني"
                className="relative w-full py-3 px-7 rounded-[5px] border border-solid-1 border-[#B9B5FF] mb-2"
              />
              <img
                src={emailIcon}
                className="absolute  z-10 top-0 right-0 py-4 px-1"
              />
            </div>
            <div>
              <textarea
                placeholder="نص الرسالة.."
                className=" rounded-[5px] p-2 w-full border border-solid-1 border-[#B9B5FF] mb-2 outline-none max-h-20 min-h-20"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary font-bold rounded-[5px] text-white py-2"
            >
              إرسال
            </button>
          </form>
        </div>
        <div className="w-fit">
          <img src={message} alt="" className="mt-2" />
          <div className="my-4">
            <DividerWithText text="أو من خلال" />
          </div>
          <div className="flex-between px-6">
            <img src={gmail} alt="" />
            <img src={whatsup} alt="" />
            <img src={facebook} alt="" />
            <img src={Instagram} alt="" />
          </div>
          <p className="text-[#939393] font-bold my-3">احصل على تطبيقنا!</p>
          <img src={googlPlay} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
