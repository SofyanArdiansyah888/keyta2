/* eslint-disable jsx-a11y/alt-text */
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useForm } from "react-hook-form";
import styles from "../../styles/Login.module.css";
import * as yup from "yup";
import { useContext, useState } from "react";
import api, { defaults } from "../../utils/api";
import { AuthContext } from ".";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  useVerifySmsMutation,
  useVerifyWhatsappMutation,
} from "../../services/auth.service";
import { useCreateShopMutation } from "../../services/shop.service";
const schema = yup.object({
  user: yup.string().required("Nama Pengguna Harus Diisi"),
  shop: yup.string().required("Nama Toko Harus Diisi"),
  referrer: yup.string().nullable(true),
});

export default function RegistrationProfile() {
  const [userReset, setUserReset] = useState(false);
  const [shopReset, setShopReset] = useState(false);
  const [refererReset, setRefererReset] = useState(false);
  const [isReferer, setIsReferer] = useState(false);
  const router = useRouter();

  const [createShop, { isLoading, data }] = useCreateShopMutation();
  const dispatch = useDispatch();
  let authenticate = useSelector((state) => state.authSlice?.authenticate);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreate = async (data) => {
    try {
      createShop({
        ...data,
        token: authenticate?.data?.token,
      });

      router.push("registration-success", undefined, { shallow: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.right_content_inner}>
        <Image src="/images/keyta.svg" height="30" width="117" alt="Logo" />
        <h1>Masukkan Data Profil</h1>
        <form onSubmit={handleSubmit(handleCreate)}>
          {/* INPUT USER */}
          <div className="mt-12">
            <label className="font-[600] text-[13px] ">Nama Pengguna</label>
            <div className="relative w-max">
              <div className="absolute top-3">
                <Image
                  src="/images/icon_store.svg"
                  height="22"
                  width="22"
                  alt="Logo"
                />
              </div>

              <input
                type="text"
                {...register("user")}
                className="py-4 pl-8  text-xs w-[260px] lg:w-[300px] material-input"
                placeholder="Masukkan Nama Pengguna"
                onChange={(event) => {
                  event.target.value === "" && setUserReset(false);
                  !userReset && setUserReset(true);
                }}
              />
              {errors.user?.message && (
                <a className="text-keytaCarnelian font-[500] block text-xs mt-1 ">
                  {errors.user?.message}
                </a>
              )}
              {userReset && (
                <div
                  className="absolute top-4 right-1"
                  onClick={() => {
                    reset({ user: "" });
                    setUserReset(false);
                  }}
                >
                  <Image
                    src="/images/icon_close.svg"
                    height="18"
                    width="18"
                    alt="Logo"
                  />
                </div>
              )}
            </div>
          </div>

          {/* INPUT TOKO */}
          <div className="mt-2">
            <label className="font-[600] text-[13px] ">Nama Toko</label>
            <div className="relative w-max">
              <div className="absolute top-3">
                <Image
                  src="/images/icon_user.svg"
                  height="22"
                  width="22"
                  alt="Logo"
                />
              </div>
              <input
                type="text"
                {...register("shop")}
                className="py-4 pl-8  text-xs w-[260px] lg:w-[300px] material-input"
                placeholder="Masukkan Nama Toko"
                onChange={(event) => {
                  event.target.value === "" && setShopReset(false);
                  !shopReset && setShopReset(true);
                }}
              />
              {errors.shop?.message && (
                <a className="text-keytaCarnelian font-[500] block text-xs mt-1 ">
                  {errors.shop?.message}
                </a>
              )}

              {shopReset && (
                <div
                  className="absolute top-4 right-1"
                  onClick={() => {
                    reset({ shop: "" });
                    setShopReset(false);
                  }}
                >
                  <Image
                    src="/images/icon_close.svg"
                    height="18"
                    width="18"
                    alt="Logo"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-max lg:w-full mt-8">
            <div className="float-right">
              <Image src="/images/maskot_group.svg" height="60" width="131" />
            </div>
            <div className="clear-both rounded-md p-4 bg-[#F1F2F5]">
              <div>
                <h4 className="font-[600]">Punya Kode Komunitas?</h4>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-keytaPrimary "
                    onChange={(event) => {
                      event.target.checked
                        ? setIsReferer(true)
                        : setIsReferer(false);
                    }}
                  />
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 my-1 text-[11px] font-medium text-gray-900 dark:text-gray-300"
                  >
                    Masukkan kode yang terdaftar pada komunitas Anda
                  </label>
                </div>
              </div>
              {isReferer && (
                <div className="mt-2">
                  <div className="relative w-max">
                    <input
                      type="text"
                      {...register("referer")}
                      className="py-4  text-xs w-[260px] lg:w-[300px] material-input"
                      placeholder="FOKUSKEYTA"
                      onChange={(event) => {
                        event.target.value === "" && setRefererReset(false);
                        !refererReset && setRefererReset(true);
                      }}
                    />
                    {errors.referer?.message && (
                      <a className="text-keytaCarnelian font-[500] block text-xs mt-1 ">
                        {errors.referer?.message}
                      </a>
                    )}
                    {refererReset && (
                      <div
                        className="absolute top-4 right-1"
                        onClick={() => {
                          reset({ referer: "" });
                          setRefererReset(false);
                        }}
                      >
                        <Image
                          src="/images/icon_close.svg"
                          height="18"
                          width="18"
                          alt="Logo"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="keyta-button mt-12">
            Simpan
          </button>
        </form>
      </div>
    </>
  );
}
