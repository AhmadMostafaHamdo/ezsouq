import profileIcon from "../assets/images/profileIcon.svg";
import emailIcon from "../assets/images/ic_round-email.svg";
import gmail from "../assets/images/gmail.svg";
import whatsup from "../assets/images/whatsImg.svg";
import facebook from "../assets/images/facebook.svg";
import Instagram from "../assets/images/instgram.svg";
import message from "../assets/images/message.svg";
import googlPlay from "../assets/images/googlPlay.svg";
import { useRef, useState, useEffect } from "react";
import DividerWithText from "../components/dividerWithText/DividerWithText";
import Heading from "../components/common/Heading";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../feedback/loading/Spinner";

const ContactUs = () => {
  const contact = useRef();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    message: "",
    subject: "message",
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
      setLoading(true);
      const res = await axios.post(import.meta.env.VITE_USER_CONTACT_ENDPOINT, form);
      setLoading(false);
      setForm({
        name: "",
        message: "",
        subject: "message",
      });
      toast.success("تم إرسال الرسالة بنجاح");
      console.log(res.data);
    } catch (error) {
      console.log(first);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="pt-20 pb-8" ref={contact}>
      <ToastContainer />
      <div className="container flex flex-col md:flex-row gap-6 md:gap-40">
        {/* قسم الفورم */}
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
                className="absolute z-10 top-0 right-0 py-4 px-1"
              />
            </div>

            <div>
              <textarea
                placeholder="نص الرسالة.."
                value={form.message}
                name="message"
                onChange={handelChange}
                className="mt-4 rounded-[5px] p-2 w-full border border-solid-1 border-[#B9B5FF] outline-none max-h-24 min-h-24"
              ></textarea>
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <button className="w-full bg-primary font-bold rounded-[5px] text-white py-2 mt-4">
                إرسال
              </button>
            )}
          </form>
        </div>

        {/* قسم الروابط */}
        <div className="lg:w-fit">
          <img src={message} alt="" className="mt-2 hidden md:block" />
          <div className="my-5">
            <DividerWithText text="أو من خلال" />
          </div>

          <div className="flex-center gap-6 mt-10 md:mt-0">
            {/* Gmail */}
            <a
              href="mailto:easysuoq@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={gmail}
                alt="Gmail"
                className="hover:scale-110 transition"
              />
            </a>

            {/* WhatsApp Channel */}
            <a
              href="https://whatsapp.com/channel/0029VbB9QgEDjiOmMGYpfF0z"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={whatsup}
                alt="WhatsApp"
                className="hover:scale-110 transition"
              />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1BQzRmqKU5/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={facebook}
                alt="Facebook"
                className="hover:scale-110 transition"
              />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/tswwqshlezsouq?igsh=cjI4dHdpMnFwbTF2&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={Instagram}
                alt="Instagram"
                className="hover:scale-110 transition"
              />
            </a>
          </div>

          <p className="text-[#939393] font-bold my-3 text-center md:text-start">
            احصل على تطبيقنا!
          </p>

          {/* Google Play */}
          <a
            href="https://play.google.com/store/apps/details?id=com.easysuoq" // ضع رابط التطبيق الصحيح
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={googlPlay}
              alt="Google Play"
              className="m-auto md:m-[inherit] hover:scale-105 transition"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
