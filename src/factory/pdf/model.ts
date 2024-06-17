import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { PdfModelParams } from "$lib/types";

export const pdfModel = ({
  data,
  pageSize,
}: PdfModelParams): TDocumentDefinitions => {
  console.log({ data });

  return {
    content: [
      { text: "Tables", style: "header" },
      "Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.",
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
    pageSize,
  };
};
