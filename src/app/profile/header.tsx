/* eslint-disable @next/next/no-img-element */
"use client";
import BackButton from "@/components/back-button";
import CircleAvatar from "@/components/circle-avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import header from "../../../public/profile-header.png";
import { changeAvatar } from "./actions";
import LogoutButton from "@/components/logout-button";

export default function Header({
  photo,
  avatars,
  itsMe,
}: {
  photo: string;
  avatars: string[];
  itsMe: boolean;
}) {
  const onImageClick = async (avatar: string) => {
    await changeAvatar(avatar);
  };

  return (
    <div className="w-full relative min-h-[190px]">
      <Image
        src={header}
        alt="header"
        className="w-full h-[150px] object-cover"
      ></Image>
      <div className="absolute bottom-0" style={{ left: "calc(50% - 38px)" }}>
        {avatars.length === 0 ? (
          <CircleAvatar id="id" imageUrl={photo}></CircleAvatar>
        ) : (
          <Drawer>
            <DrawerTrigger>
              <CircleAvatar id="id" imageUrl={photo}></CircleAvatar>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="!text-[40px]">
                  Scegli l&apos;avatar
                </DrawerTitle>
              </DrawerHeader>
              <div className="flex w-full flex-wrap gap-10 overflow-y-scroll items-center justify-center">
                {avatars.map((a) => (
                  <DrawerClose
                    key={a}
                    className="w-[40%] aspect-square"
                    onClick={() => onImageClick(a)}
                  >
                    <img src={`${a}`} alt="avatar" />
                  </DrawerClose>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
      <BackButton className="absolute top-[65px] left-[30px]" />
      {itsMe && <LogoutButton className="absolute top-[65px] right-[30px]" />}
    </div>
  );
}
