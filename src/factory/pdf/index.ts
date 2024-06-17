import PdfPrinter from "pdfmake";
import { pdfModel } from "./model";
import { fonts } from "./fonts";
import { tableLayouts } from "./layout";
import type { GeneratePdfResult, GeneratePdfParams } from "$lib/types";

// helper
export const generateOrdersPdf = ({
  data,
  pageSize,
}: GeneratePdfParams): GeneratePdfResult => {
  const pdfPrinter = new PdfPrinter(fonts);
  const pdfStream = pdfPrinter.createPdfKitDocument(
    pdfModel({ data, pageSize }),
    { tableLayouts },
  );

  try {
    // Collect PDF data chunks from the stream to generate the full binary file
    const pdf = new ReadableStream<Uint8Array>({
      start: (controller) => {
        pdfStream.on("data", (chunk: Uint8Array) => controller.enqueue(chunk));
        pdfStream.on("end", () => controller.close());
        pdfStream.on("error", (err: Error) => controller.error(err));
      },
    });

    pdfStream.end();
    return { pdf, error: null };
  } catch (error: any) {
    return { pdf: null, error };
  }
};
