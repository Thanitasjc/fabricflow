import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เปรียบเทียบสินค้า",
  description: "เปรียบเทียบผ้า FabricFlow ด้านสเปกและราคา",
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
