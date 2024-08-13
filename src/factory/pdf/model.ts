import { size, color } from "./styles";
import { dateTime, orderId, currency } from "$lib/utils/formatter";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { PdfModelParams } from "$lib/types";

// constants
const productName: string = "Ensalada rusa y Chuleta de cerdo";
const price: number = 4490;

export const pdfModel = ({
  data,
  pageSize = "LETTER",
}: PdfModelParams): TDocumentDefinitions => {
  const totalUnidades: number = data.reduce((acc, d) => (acc += d.amount), 0);
  const total: number = totalUnidades * price;

  return {
    defaultStyle: {
      font: "Helvetica",
    },
    header: {
      text: `Actualizado: ${dateTime.format(Date.now()).replace("de ", "")} hrs.`,
      fontSize: size.tiny,
      color: color.muted,
      margin: [0, 15, 15, 0],
      alignment: "right",
    },
    footer: function(currentPage, pageCount) {
      return {
        text: `${currentPage.toString()}/${pageCount}`,
        fontSize: size.tiny,
        color: color.muted,
        alignment: "center",
        margin: [0, 10, 0, 0],
      };
    },
    content: [
      {
        margin: [0, 5, 0, 0],
        table: {
          body: [
            [
              {
                text: "Pedidos",
                style: "header",
                fontSize: size.header,
                color: color.normal,
                bold: true,
                border: [false, false, false, false],
              },
              {
                text: `#  ${productName}`,
                style: "header",
                fontSize: size.secondary,
                color: color.muted,
                bold: true,
                border: [false, false, false, false],
                margin: [0, 5, 0, 0],
              },
            ],
          ],
        },
      },
      {
        margin: [0, 20, 0, 20],
        table: {
          body: [
            [
              {
                table: {
                  body: [
                    [
                      {
                        text: `Valor unitario: ${currency.format(price)}`,
                        bold: true,
                        fontSize: size.text,
                        color: color.secondary,
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: `Total Estimado: ${currency.format(total)}`,
                        bold: true,
                        fontSize: size.secondary,
                        color: color.secondary,
                        border: [false, false, false, false],
                      },
                    ],
                  ],
                },
                border: [false, false, false, false],
                fillColor: color.soft,
              },
              {
                table: {
                  body: [
                    [
                      {
                        text: `Unidades: ${totalUnidades}`,
                        bold: true,
                        fontSize: size.text,
                        color: color.secondary,
                        border: [false, false, false, false],
                        margin: [8, 2, 0, 0],
                      },
                    ],
                    [
                      {
                        text: `Total Pedidos: ${data.length}`,
                        bold: true,
                        fontSize: size.text,
                        color: color.secondary,
                        border: [false, false, false, false],
                        margin: [8, 0, 0, 0],
                      },
                    ],
                  ],
                },
                border: [false, false, false, false],
                fillColor: color.soft,
              },
            ],
          ],
        },
      },
      {
        margin: [0, 20, 0, 0],
        layout: "customLayout",
        table: {
          widths: ["auto", "auto", "auto", "auto", "auto", "auto", "*"],
          headerRows: 1,
          body: [
            [
              { text: "", style: "tableHeader" },
              {
                text: "Pedido",
                style: "tableHeader",
                bold: true,
              },
              {
                text: "Cantidad",
                style: "tableHeader",
                bold: true,
              },
              {
                text: "Nombre",
                style: "tableHeader",
                bold: true,
              },
              {
                text: "Celular",
                style: "tableHeader",
                bold: true,
              },
              {
                text: "Fecha pedido",
                style: "tableHeader",
                bold: true,
              },
              {
                text: "Total pedido",
                style: "tableHeader",
                bold: true,
                alignment: "right",
              },
            ],
            ...data.map((d) => [
              { text: "", color: color.normal, fontSize: size.text },
              {
                text: orderId(d.id),
                fontSize: size.small,
                color: color.muted,
              },
              {
                text: d.amount,
                color: color.normal,
                fontSize: size.text,
                alignment: "center",
              },
              {
                text: d.name,
                color: color.normal,
                fontSize: size.text,
                bold: true,
              },
              {
                text: d.cellphone.replace("+56", ""),
                color: color.normal,
                fontSize: size.text,
              },
              {
                text: dateTime
                  .format(new Date(d.created_at))
                  .replace("de ", ""),
                color: color.muted,
                fontSize: size.small,
              },
              {
                text: currency.format(price * d.amount),
                color: color.normal,
                bold: true,
                fontSize: size.text,
                alignment: "right",
              },
            ]),
          ],
        },
      },
      {
        layout: "headerLineOnly",
        margin: [0, 10, 0, 0],
        table: {
          widths: ["*", "auto"],
          headerRows: 1,
          body: [
            ["", ""],
            [
              {
                text: "TOTAL",
                fontSize: size.secondary,
                bold: true,
                color: color.normal,
                alignment: "left",
              },
              {
                text: currency.format(total),
                fontSize: size.secondary,
                color: color.normal,
                bold: true,
                border: [false, false, false, false],
                alignment: "right",
              },
            ],
          ],
        },
      },
    ],
    pageSize,
  };
};
