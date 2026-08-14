import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "รายการโปรด",
  description: "ผ้าที่บันทึกไว้ในรายการโปรด FabricFlow",
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
