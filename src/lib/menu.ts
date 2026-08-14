export type NavMenuItem = {
  id: number | string;
  label: string;
  href: string | null;
  type: "link" | "dropdown" | "industries";
  openInNewTab?: boolean;
  children: NavMenuItem[];
};

export const defaultHeaderMenus: NavMenuItem[] = [
  { id: "home", label: "หน้าแรก", href: "/", type: "link", children: [] },
  {
    id: "products",
    label: "สินค้า",
    href: "/products",
    type: "link",
    children: [],
  },
  {
    id: "wholesale",
    label: "ขายส่ง",
    href: "/wholesale",
    type: "link",
    children: [],
  },
  {
    id: "industries",
    label: "ผ้าแต่ละอุตสาหกรรม",
    href: "/industries",
    type: "industries",
    children: [],
  },
  {
    id: "services",
    label: "บริการ",
    href: "/services",
    type: "dropdown",
    children: [
      {
        id: "svc-1",
        label: "การจัดหาผ้า และการพรีออเดอร์ผ้า",
        href: "/services/sourcing-preorder",
        type: "link",
        children: [],
      },
      {
        id: "svc-2",
        label: "รับสั่งผลิต และพิมพ์ดิจิตอล",
        href: "/services/custom-production",
        type: "link",
        children: [],
      },
      {
        id: "svc-3",
        label: "วาร์ป & ไซส์ซิ่ง",
        href: "/services/warp-sizing",
        type: "link",
        children: [],
      },
      {
        id: "svc-4",
        label: "เครื่องคำนวณผ้า",
        href: "/fabric-calculator",
        type: "link",
        children: [],
      },
    ],
  },
  { id: "brands", label: "แบรนด์", href: "/brands", type: "link", children: [] },
  { id: "about", label: "เกี่ยวกับเรา", href: "/about", type: "link", children: [] },
  {
    id: "articles",
    label: "บทความ",
    href: "/articles",
    type: "link",
    children: [],
  },
  {
    id: "contact",
    label: "ติดต่อเรา",
    href: "/contact",
    type: "link",
    children: [],
  },
];
