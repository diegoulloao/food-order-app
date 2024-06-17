import path from "path";
import PdfPrinter from "pdfmake";
import type { APIRoute } from "astro";

import type {
  TDocumentDefinitions,
  TFontFamilyTypes,
} from "pdfmake/interfaces";

// on demand
export const prerender = false;

// constants
const pathToFonts: string = path.join(process.cwd(), "/public/resources/fonts");

const fonts: Record<string, TFontFamilyTypes> = {
  Roboto: {
    normal: `${pathToFonts}/Roboto-Regular.ttf`,
    bold: `${pathToFonts}/Roboto-Medium.ttf`,
    italics: `${pathToFonts}/Roboto-Italic.ttf`,
    bolditalics: `${pathToFonts}/Roboto-MediumItalic.ttf`,
  },
};

// api
export const GET: APIRoute = async () => {
  const docDefinition: TDocumentDefinitions = {
    content: [
      { text: "Tables", style: "header" },
      "Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.",
      {
        text: "A simple table (no headers, no width specified, no spans, no styling)",
        style: "subheader",
      },
      "The following table has nothing more than a body array",
      {
        style: "tableExample",
        table: {
          body: [
            ["Column 1", "Column 2", "Column 3"],
            ["One value goes here", "Another one here", "OK?"],
          ],
        },
      },
    ],
    pageSize: "LETTER",
  };

  const pdfPrinter = new PdfPrinter(fonts);
  const pdfStream = pdfPrinter.createPdfKitDocument(docDefinition);

  // Collect PDF data chunks from the stream to generate the full binary file
  const pdfFile = new ReadableStream<Uint8Array>({
    start: (controller) => {
      pdfStream.on("data", (chunk: Uint8Array) => controller.enqueue(chunk));
      pdfStream.on("end", () => controller.close());
      pdfStream.on("error", (err: Error) => controller.error(err));
    },
  });

  pdfStream.end();

  const fileHash: number = Date.now();

  return new Response(pdfFile, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="pedidos-${fileHash}.pdf"`,
    },
  });
};
