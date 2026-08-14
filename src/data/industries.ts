export interface IndustryCollection {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface IndustryDetail {
  id: string;
  nameTh: string;
  nameEn: string;
  description: string;
  image: string;
  intro: string;
  guideTitle: string;
  guideBody: string[];
  collections: IndustryCollection[];
}

export const industries: IndustryDetail[] = [
  {
    id: "interior-furniture",
    nameTh: "ตกแต่งภายใน & เฟอร์นิเจอร์",
    nameEn: "Interior & Furniture",
    description: "ผ้าสำหรับโซฟา ม่าน เบาะ และงานตกแต่งบ้าน",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1800&q=85",
    intro:
      "การเลือกใช้ผ้าตกแต่งและเฟอร์นิเจอร์ที่เหมาะสม เป็นปัจจัยสำคัญในการสร้างสภาพแวดล้อมภายในที่กลมกลืนและสวยงาม ช่วยส่งเสริมบรรยากาศและความรู้สึกที่ดีให้กับผู้อยู่อาศัย",
    guideTitle: "การเลือกใช้ผ้าตกแต่งภายในและเฟอร์นิเจอร์ที่เหมาะสม",
    guideBody: [
      "การตกแต่งภายในและเลือกเฟอร์นิเจอร์ที่เหมาะสมช่วยสร้างพื้นที่ที่สวยงาม สะดวกสบาย และสะท้อนสไตล์ของเจ้าของบ้าน FabricFlow คัดสรรเนื้อผ้าหลายคอลเลกชันและหลายฟังก์ชัน เพื่อให้คุณออกแบบพื้นที่ให้ตรงกับไลฟ์สไตล์ได้อย่างลงตัว",
      "ผ้าตกแต่งคุณภาพ เช่น ผ้าม่าน ผ้าบุโซฟา ผ้าปูโต๊ะ และผ้าปูที่นอน ช่วยเสริมบรรยากาศของห้อง ในขณะที่เนื้อผ้าที่ทนทานและดูแลง่ายจะช่วยให้งานเฟอร์นิเจอร์ดูสง่างามและใช้งานได้นาน",
    ],
    collections: [
      {
        id: "haven",
        name: "HAVEN COLLECTION",
        description:
          "ผ้าบุเฟอร์นิเจอร์โทนอบอุ่น แมทช์ง่าย เหมาะกับห้องนั่งเล่นและพื้นที่พักผ่อน",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85",
      },
      {
        id: "petcare",
        name: "PETCARE COLLECTION",
        description:
          "ผ้า Pet-friendly โครงสร้างแน่น กันรอยขีดข่วน เหมาะกับบ้านที่มีสัตว์เลี้ยง",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=85",
      },
      {
        id: "drape",
        name: "DRAPE COLLECTION",
        description:
          "ผ้าม่านคุณภาพ กันเปื้อนและดูแลง่าย ช่วยควบคุมแสงและเพิ่มมิติให้ห้อง",
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&q=85",
      },
      {
        id: "velvet",
        name: "VELVET LUXE",
        description:
          "ผ้าบุกำมะหยี่สัมผัสนุ่ม ให้ลุคหรูหราแต่ใช้งานจริงในชีวิตประจำวันได้",
        image:
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=85",
      },
      {
        id: "natural",
        name: "NATURAL TOUCH",
        description:
          "ผ้าโทนธรรมชาติ ผิวสัมผัสนุ่ม โทนสีหลากหลายสำหรับงานตกแต่งร่วมสมัย",
        image:
          "https://images.unsplash.com/photo-1618220179428-22790b461013?w=900&q=85",
      },
      {
        id: "satin-home",
        name: "SATIN HOME",
        description:
          "ผ้าซาตินเนื้อเงาเรียบลื่น ดูแลง่าย เหมาะกับงานบุและของตกแต่งบ้าน",
        image:
          "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=900&q=85",
      },
      {
        id: "softliving",
        name: "SOFT LIVING",
        description:
          "ผ้าบุทนทาน ไม่อมฝุ่น ทำความสะอาดง่าย เพิ่มสไตล์ให้บ้านดูอบอุ่น",
        image:
          "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=900&q=85",
      },
      {
        id: "atelier",
        name: "ATELIER MIX",
        description:
          "คอลเลกชันผสมผสานเนื้อผ้าหลายชนิด สร้างสไตล์เฉพาะตัวไม่ซ้ำใคร",
        image:
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=85",
      },
    ],
  },
  {
    id: "automotive",
    nameTh: "ยานยนต์",
    nameEn: "Automotive",
    description: "ผ้าเบาะรถยนต์ ภายในยานพาหนะ และงานหุ้ม",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800&q=85",
    intro:
      "ผ้าสำหรับอุตสาหกรรมยานยนต์ต้องทนทานต่อแรงเสียดทาน แสงแดด และการใช้งานหนัก เพื่อความสวยงามและความปลอดภัยของผู้โดยสาร",
    guideTitle: "การเลือกผ้าสำหรับงานยานยนต์",
    guideBody: [
      "งานหุ้มเบาะและตกแต่งภายในรถต้องการเนื้อผ้าที่แข็งแรง สีไม่ซีดง่าย และทำความสะอาดง่าย FabricFlow มีตัวเลือกทั้งผ้าทอ ผ้าถัก และผ้าเทคนิคสำหรับงาน OEM และงานตกแต่งรถ",
      "นอกจากความทนทาน ยังควรพิจารณาผิวสัมผัส ความยืดหยุ่น และการระบายอากาศ เพื่อความสบายในการใช้งานระยะยาว",
    ],
    collections: [
      {
        id: "drive",
        name: "DRIVE SERIES",
        description: "ผ้าเบาะรถยนต์ทนทาน เหมาะงานหุ้มและตกแต่งภายใน",
        image:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=85",
      },
      {
        id: "cabin",
        name: "CABIN COMFORT",
        description: "เนื้อผ้านุ่มแต่แข็งแรง ใช้กับที่นั่งและพนักพิง",
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85",
      },
      {
        id: "fleet",
        name: "FLEET TOUGH",
        description: "ผ้าสำหรับรถรับจ้างและยานพาหนะเชิงพาณิชย์",
        image:
          "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=85",
      },
      {
        id: "trim",
        name: "TRIM LINE",
        description: "ผ้าตกแต่งขอบและรายละเอียดภายในห้องโดยสาร",
        image:
          "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=900&q=85",
      },
    ],
  },
  {
    id: "medical",
    nameTh: "ทางการแพทย์",
    nameEn: "Medical",
    description: "ผ้าสำหรับยูนิฟอร์มทางการแพทย์ และงานดูแลสุขภาพ",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1800&q=85",
    intro:
      "ผ้าทางการแพทย์ต้องซักง่าย ทนต่อการใช้งานบ่อย และให้ความสบายตลอดวันสำหรับบุคลากรสาธารณสุข",
    guideTitle: "การเลือกผ้าสำหรับงานทางการแพทย์",
    guideBody: [
      "ยูนิฟอร์มและอุปกรณ์สิ่งทอทางการแพทย์ควรเน้นความทนทาน ความสะอาด และความคล่องตัว FabricFlow มีตัวเลือกผ้าที่เหมาะกับชุดสครับ เสื้อกาวน์ และงานบริการในโรงพยาบาล",
      "แนะนำเลือกเนื้อผ้าที่ระบายอากาศได้ดี สีไม่ตกง่าย และรองรับการซักในระบบอุตสาหกรรม",
    ],
    collections: [
      {
        id: "carewear",
        name: "CAREWEAR",
        description: "ผ้าชุดสครับและยูนิฟอร์มทางการแพทย์ ซักง่าย ใส่สบาย",
        image:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=85",
      },
      {
        id: "clinic",
        name: "CLINIC LINE",
        description: "เนื้อผ้าเรียบ ดูแลง่าย เหมาะกับคลินิกและโรงพยาบาล",
        image:
          "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=900&q=85",
      },
      {
        id: "hygiene",
        name: "HYGIENE SOFT",
        description: "ผ้าสัมผัสนุ่ม เหมาะงานบริการและเครื่องแบบสุขภาพ",
        image:
          "https://images.unsplash.com/photo-1581595220892-b0739db3b8c5?w=900&q=85",
      },
      {
        id: "duty",
        name: "DUTY PRO",
        description: "ผ้าทนทานสำหรับบุคลากรที่ทำงานหนักทั้งวัน",
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&q=85",
      },
    ],
  },
  {
    id: "arts-entertainment",
    nameTh: "ศิลปะ,งานฝีมือ & ความบันเทิง",
    nameEn: "Arts & Entertainment",
    description: "ผ้าพิมพ์ลาย งานคราฟต์ และงานสร้างสรรค์",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=85",
    intro:
      "งานศิลปะและบันเทิงต้องการผ้าที่รองรับการพิมพ์ การตัดเย็บพิเศษ และพื้นผิวที่สร้างสรรค์ได้หลากหลาย",
    guideTitle: "การเลือกผ้าสำหรับงานศิลปะและความบันเทิง",
    guideBody: [
      "ไม่ว่าจะเป็นงานพิมพ์ลาย ฉากเวที หรืองานแฮนด์เมด การเลือกฐานผ้าที่เหมาะสมช่วยให้ผลงานออกมาคมชัดและทนทาน FabricFlow มีทั้งผ้าพิมพ์ดิจิตอลและผ้าสำหรับงานคราฟต์",
      "พิจารณาชนิดลาย ความยืดหยุ่น และวิธีการดูแลหลังใช้งาน เพื่อให้งานแสดงผลได้ตามดีไซน์",
    ],
    collections: [
      {
        id: "printlab",
        name: "PRINT LAB",
        description: "ฐานผ้าสำหรับพิมพ์ดิจิตอล สีสด ลายคม",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
      },
      {
        id: "stage",
        name: "STAGE FABRIC",
        description: "ผ้าสำหรับฉากและงานแสดง น้ำหนักและเนื้อผ้าหลากหลาย",
        image:
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=85",
      },
      {
        id: "craft",
        name: "CRAFT STUDIO",
        description: "ผ้าสำหรับงานฝีมือ ของตกแต่ง และการสร้างสรรค์",
        image:
          "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=900&q=85",
      },
      {
        id: "colorplay",
        name: "COLOR PLAY",
        description: "ผ้าโทนสีจัดและลายกราฟิกสำหรับโปรเจกต์สร้างสรรค์",
        image:
          "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=900&q=85",
      },
    ],
  },
  {
    id: "uniform-hospitality",
    nameTh: "เครื่องแบบ & อุตสาหกรรมบริการ",
    nameEn: "Uniforms & Hospitality",
    description: "ผ้ายูนิฟอร์ม โรงแรม ร้านอาหาร และบริการ",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1800&q=85",
    intro:
      "เครื่องแบบในธุรกิจบริการต้องดูเป็นมืออาชีพ ทนซักบ่อย และใส่สบายตลอดกะงาน",
    guideTitle: "การเลือกผ้าสำหรับเครื่องแบบและงานบริการ",
    guideBody: [
      "โรงแรม ร้านอาหาร และองค์กรต้องการผ้าที่คงรูป สีสม่ำเสมอ และดูแลง่าย FabricFlow มีตัวเลือกสำหรับเสื้อเชิ้ต ยูนิฟอร์ม และชุดพนักงานหน้างาน",
      "เลือกเนื้อผ้าตามลักษณะงาน เช่น งานต้อนรับ งานครัว หรืองานภาคสนาม เพื่อสมดุลระหว่างภาพลักษณ์และความทนทาน",
    ],
    collections: [
      {
        id: "service",
        name: "SERVICE WEAR",
        description: "ผ้ายูนิฟอร์มมาตรฐานองค์กร ซักง่าย คงทรง",
        image:
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=85",
      },
      {
        id: "hotel",
        name: "HOTEL LINE",
        description: "ผ้าสำหรับโรงแรมและงาน Hospitality ลุคสุภาพ",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=85",
      },
      {
        id: "kitchen",
        name: "KITCHEN PRO",
        description: "ผ้าทนทานสำหรับงานครัวและบริการอาหาร",
        image:
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=85",
      },
      {
        id: "front",
        name: "FRONT DESK",
        description: "ผ้าเชิ้ตและชุดต้อนรับ เรียบหรู ใส่สบาย",
        image:
          "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=900&q=85",
      },
    ],
  },
  {
    id: "agriculture-manufacturing",
    nameTh: "การเกษตร & การผลิต",
    nameEn: "Agriculture & Manufacturing",
    description: "ผ้าอุตสาหกรรม งานผลิต และงานกลางแจ้ง",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=85",
    intro:
      "งานเกษตรและโรงงานต้องการผ้าที่ทนทานต่อสภาพแวดล้อม การใช้งานหนัก และบางกรณีต้องกันน้ำหรือกันยูวี",
    guideTitle: "การเลือกผ้าสำหรับงานเกษตรและการผลิต",
    guideBody: [
      "ผ้าอุตสาหกรรมควรเน้นความแข็งแรง น้ำหนักที่เหมาะสม และคุณสมบัติเฉพาะทาง เช่น กันน้ำ กันฝุ่น หรือทนแสงแดด FabricFlow มีตัวเลือกสำหรับงานกลางแจ้ง งานผลิต และงานคลุมป้องกัน",
      "ปรึกษาทีมงานเพื่อเลือกสเปกผ้าให้ตรงกับเงื่อนไขการใช้งานจริงของโรงงานหรือฟาร์ม",
    ],
    collections: [
      {
        id: "field",
        name: "FIELD GUARD",
        description: "ผ้าสำหรับงานเกษตรกลางแจ้ง ทนทานต่อสภาพอากาศ",
        image:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=85",
      },
      {
        id: "plant",
        name: "PLANT WEAR",
        description: "ผ้าเครื่องแบบโรงงาน แข็งแรง ดูแลง่าย",
        image:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=85",
      },
      {
        id: "cover",
        name: "COVER TECH",
        description: "ผ้าคลุมและงานป้องกันสำหรับไลน์ผลิต",
        image:
          "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=900&q=85",
      },
      {
        id: "outdoor",
        name: "OUTDOOR HARD",
        description: "ผ้าเทคนิคสำหรับงานกลางแจ้งและโครงสร้างผ้าใบ",
        image:
          "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=900&q=85",
      },
    ],
  },
];

export type Industry = (typeof industries)[number];

export function getIndustryById(id: string) {
  return industries.find((item) => item.id === id);
}
