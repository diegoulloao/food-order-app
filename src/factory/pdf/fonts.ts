import path from "path";
import type { TFontFamilyTypes } from "pdfmake/interfaces";

const pathToFonts: string = path.join(process.cwd(), "/public/resources/fonts");

const fonts: Record<string, TFontFamilyTypes> = {
  Roboto: {
    normal: `${pathToFonts}/Roboto-Regular.ttf`,
    bold: `${pathToFonts}/Roboto-Medium.ttf`,
    italics: `${pathToFonts}/Roboto-Italic.ttf`,
    bolditalics: `${pathToFonts}/Roboto-MediumItalic.ttf`,
  },
};

export { fonts };
