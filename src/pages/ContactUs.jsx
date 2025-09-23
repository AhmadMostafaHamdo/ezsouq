import profileIcon from "../assets/images/profileIcon.svg";
import emailIcon from "../assets/images/ic_round-email.svg";
import gmail from "../assets/images/gmail.svg";
import whatsup from "../assets/images/whatsImg.svg";
import facebook from "../assets/images/facebook.svg";
import Instagram from "../assets/images/instgram.svg";
import message from "../assets/images/message.svg";
import googlPlay from "../assets/images/googlPlay.svg";
import { useRef, useState } from "react";
import { useEffect } from "react";
import DividerWithText from "../components/dividerWithText/DividerWithText";
import Heading from "../components/common/Heading";
import axios from "axios";
const ContactUs = () => {
  const contact = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  });
  useEffect(() => {
    contact.current.scrollIntoView();
  }, []);
  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const res = await axios.post("/user/contact", {
        form,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pt-20 pb-8" ref={contact}>
      <div className="container flex ite flex-col md:flex-row gap-6 md:gap-40">
        <div>
          <Heading title="تواصل معنا" />
          <p className="text-primary text-[1.1rem]">
            نحن هنا للإجابة على استفساراتك ومساعدتك، لا تتردد في التواصل
            <br className="hidden md:block" /> معنا في أي وقت.
          </p>
          <form
            className="md:w-[20rem] lg:w-[28rem] mt-6"
            onSubmit={handelSubmit}
          >
            <div className="relative w-full">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handelChange}
                placeholder=" الاسم  (اختياري)"
                className="relative w-full py-3 px-7 rounded-[5px] border border-solid-1 border-[#B9B5FF]"
              />
              <img
                src={profileIcon}
                className="absolute  z-10 top-0 right-0 py-4 px-1"
              />
            </div>
            <div className="relative w-full my-5">
              <input
                type="email"
                value={form.email}
                name="email"
                onChange={handelChange}
                placeholder="البريد الالكتروني"
                className="relative w-full py-3 px-7 rounded-[5px] border border-solid-1 border-[#B9B5FF]"
              />
              <img
                src={emailIcon}
                className="absolute  z-10 top-0 right-0 py-4 px-1"
              />
            </div>
            <div>
              <textarea
                placeholder="نص الرسالة.."
                value={form.message}
                name="message"
                onChange={handelChange}
                className=" rounded-[5px] p-2 w-full border border-solid-1 border-[#B9B5FF] outline-none max-h-24 min-h-24"
              ></textarea>
            </div>
            <button className="w-full bg-primary font-bold rounded-[5px] text-white py-2 mt-4">
              إرسال
            </button>
          </form>
        </div>

        <div className="lg:w-fit">
          <img src={message} alt="" className="mt-2 hidden md:block" />
          <div className="my-5">
            <DividerWithText text="أو من خلال" />
          </div>
          <div className="flex-center gap-6 mt-10 md:mt-0">
            <img src={gmail} alt="" />
            <img src={whatsup} alt="" />
            <img src={facebook} alt="" />
            <img src={Instagram} alt="" />
          </div>
          <p className="text-[#939393] font-bold my-3 text-center md:text-start">
            احصل على تطبيقنا!
          </p>
          <img src={googlPlay} alt="" className="m-auto md:m-[inherit]" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
