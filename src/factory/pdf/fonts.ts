import type { TFontFamilyTypes } from "pdfmake/interfaces";

const fonts: Record<string, TFontFamilyTypes> = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
};

export { fonts };
