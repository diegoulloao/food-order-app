import { color } from "./styles";
import type { CustomTableLayout } from "pdfmake/interfaces";

export const tableLayouts: Record<string, CustomTableLayout> = {
  customLayout: {
    paddingLeft: () => 8,
    paddingRight: () => 8,
    paddingTop: () => 4,
    paddingBottom: () => 4,
    hLineColor: (i) => (i === 1 ? color.normal : color.ghost),
    vLineWidth: () => 0,
    hLineWidth: (i, node) => {
      if (i === 0 || i === node.table.body.length) return 0;
      return i === node.table.headerRows ? 2 : 1;
    },
  },
};
