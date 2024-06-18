import path from "path";
import type { TFontFamilyTypes } from "pdfmake/interfaces";

const fonts: Record<string, TFontFamilyTypes> = {
  Roboto: {
    normal: path.join(process.cwd(), "Roboto-Regular.ttf"),
    bold: path.join(process.cwd(), "Roboto-Bold.ttf"),
    italics: path.join(process.cwd(), "Roboto-Italic.ttf"),
    bolditalics: path.join(process.cwd(), "Roboto-BoldItalic.ttf"),
  },
};

export { fonts };
