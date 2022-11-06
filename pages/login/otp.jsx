/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useRouter } from "next/router";
import {
  useSendSmsMutation,
  useSendWhatsappMutation,
  useVerifySmsMutation,
  useVerifyWhatsappMutation,
} from "../../services/auth.service";
import { setAuthenticate } from "../../services/auth.slice";
import styles from "../../styles/Login.module.css";
import { COUNTRY_CODE } from "../../app/constant";
const schema = yup.object({
  number1: yup.number().required().typeError(),
  number2: yup.number().required().typeError(),
  number3: yup.number().required().typeError(),
  number4: yup.number().required().typeError(),
  number5: yup.number().required().typeError(),
  number6: yup.number().required().typeError(),
  number7: yup.number().required().typeError(),
});

export default function OTP() {
  const timer = Date.now() + 60000;
  const [isSMS, setIsSMS] = useState(false);
  const [isCountdown, setIsCountdown] = useState(false);
  const [countdown, setCountdown] = useState(timer);
  const [sendWhatsapp, waData] = useSendWhatsappMutation({
    fixedCacheKey: "send-whatsapp-otp",
  });
  const [sendSms, smsData] = useSendSmsMutation();
  const [verifySms, verifySmsData] = useVerifySmsMutation();
  const [verifyWhatsapp, verifyWaData] = useVerifyWhatsappMutation({
    fixedCacheKey: "verify-whatsapp-otp",
  });

  const router = useRouter();

  const dispatch = useDispatch();
  let authenticate = useSelector((state) => state.authSlice?.authenticate);

  useEffect(() => {
    if (waData.data) dispatch(setAuthenticate(waData.data));
    if (smsData.data) dispatch(setAuthenticate(smsData.data));
    return () => {};
  }, [waData.isLoading, smsData.isLoading]);

  useEffect(() => {
    if (verifyWaData.data) dispatch(setAuthenticate(verifyWaData.data));
    if (verifySmsData.data) dispatch(setAuthenticate(verifySmsData.data));
    if (verifySmsData.data || verifyWaData.data) {
      router.push("registration-profile", undefined, { shallow: true });
    }
    return () => {};
  }, [verifySmsData.isLoading, verifyWhatsapp.isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleVerify = async (data) => {
    const authyId = authenticate?.data?.user?.authy_id;
    const token = Object.values(data).reverse().toString().replaceAll(",", "");
    try {
      if (isSMS) {
        verifySms({
          authy_id: authyId,
          token,
        });
      } else {
        verifyWhatsapp({
          authy_id: authyId,
          token,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendWhatsapp = async () => {
    try {
      const user = authenticate?.data?.user;
      sendWhatsapp({
        country_code: COUNTRY_CODE,
        phone: user.phone,
      });
      setCountdown(timer);
      setIsCountdown(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendSMS = async () => {
    try {
      const user = authenticate?.data?.user;
      sendSms({
        country_code: COUNTRY_CODE,
        phone: user.phone,
      });
      setCountdown(timer);
      setIsCountdown(true);
      setIsSMS(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event, inputName) => {
    if (event.target.value !== "")
      document.querySelector(`input[name=${inputName}]`).focus();
  };
  return (
    <>
      <div className={styles.right_content_inner}>
        <img src="../images/keyta.svg" alt="Logo" />
        <h1>Verifikasi Nomor</h1>
        <h4 className="text-[14px] font-[700] my-2 text-keytaDark">
          Masukkan kode OTP
        </h4>
        <h5>
          Kode verifikasi telah kami kirim melalui {isSMS ? "SMS" : "Whatsapp"}{" "}
          ke <strong>+62{authenticate?.data?.user?.phone}</strong>
        </h5>

        <form onSubmit={handleSubmit(handleVerify)}>
          <div className="mt-12 flex flex-row gap-1">
            <input
              type="text"
              maxLength="1"
              {...register("number1")}
              className={`text-center w-[30px] ${
                errors.number1 ? "material-input-error" : "material-input"
              }`}
              onChange={(event) => handleChange(event, "number2")}
            />
            <input
              type="text"
              maxLength={1}
              {...register("number2")}
              className={`text-center w-[30px] ${
                errors.number2 ? "material-input-error" : "material-input"
              }`}
              onChange={(event) => handleChange(event, "number3")}
            />
            <input
              type="text"
              maxLength={1}
              {...register("number3")}
              className={`text-center w-[30px] ${
                errors.number3 ? "material-input-error" : "material-input"
              }`}
              onChange={(event) => handleChange(event, "number4")}
            />
            <input
              type="text"
              maxLength={1}
              {...register("number4")}
              className={`text-center w-[30px] ${
                errors.number4 ? "material-input-error" : "material-input"
              }`}
              onChange={(event) => handleChange(event, "number5")}
            />
            <input
              type="text"
              maxLength={1}
              {...register("number5")}
              className={`text-center w-[30px] ${
                errors.number5 ? "material-input-error" : "material-input"
              }`}
              onChange={(event) => handleChange(event, "number6")}
            />
            <input
              type="text"
              maxLength={1}
              {...register("number6")}
              className={`text-center w-[30px] ${
                errors.number6 ? "material-input-error" : "material-input"
              }`}
              onChange={(event) => handleChange(event, "number7")}
            />
            <input
              type="text"
              maxLength={1}
              {...register("number7")}
              className={`text-center w-[30px] ${
                errors.number7 ? "material-input-error" : "material-input"
              }`}
            />
          </div>
          {(errors.number1 ||
            errors.number2 ||
            errors.number3 ||
            errors.number4 ||
            errors.number5 ||
            errors.number6 ||
            errors.number7) && (
            <a className="text-keytaCarnelian font-[600] block text-xs mt-1 ">
              Kode harus diisi
            </a>
          )}

          <div className="text-[13px] mt-8">
            Belum dapat kode ?{" "}
            <span onClick={isSMS ? handleSendSMS : handleSendWhatsapp}>
              <a
                className={`underline  mr-1 ${
                  isCountdown ? "text-gray-300 " : "cursor-pointer"
                } `}
                disabled={isCountdown}
              >
                Kirim Ulang Kode
              </a>
            </span>
            {/* <Countdown date={Date.now() + 10000} /> */}
            <Countdown
              date={countdown}
              renderer={({ hours, minutes, seconds, completed }) => {
                let second = String(seconds).padStart(2, "0");
                let minute = String(minutes).padStart(2, "0");
                if (completed) {
                  setIsCountdown(false);
                  // Render a completed state
                  return "";
                } else {
                  setIsCountdown(true);
                  // Render a countdown
                  return (
                    <span>
                      {minute}:{second}
                    </span>
                  );
                }
              }}
            />
          </div>
          {!isSMS && (
            <>
              <div className="text-[12px] text-keytaPrimary mt-8">
                Tidak punya Whatsapp?{" "}
              </div>
              <div
                className="text-[16px] mt-2 cursor-pointer text-keytaDarkBlue font-[600]"
                onClick={handleSendSMS}
                disabled={isCountdown}
              >
                Kirim melalui SMS
              </div>
            </>
          )}

          <button type="submit" className="keyta-button mt-12">
            Verifikasi
          </button>
        </form>
      </div>
    </>
  );
}
