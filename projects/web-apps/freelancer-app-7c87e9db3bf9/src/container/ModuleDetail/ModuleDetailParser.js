import { capitalizeFirstLetter } from "@app/FormElements/utils/Utils";

const moduleDetailParser = {}

moduleDetailParser.formattedColumn = (c)=>{

    let obj = {}

    obj = {
        id: c.componentId,
        componentId: c.componentId,
        label: c.hint,
        active: true,
        format: value =>
          `${
            value && value.length > 13
              ? capitalizeFirstLetter(value.toString())
                  .trim()
                  .slice(0, 13) + ' ...'
              : capitalizeFirstLetter(value.toString()).trim()
          }`,
      };

    return obj 

}


moduleDetailParser.formattedRow = (columns,r)=>{

    let obj = {}

     columns &&
      columns.map((c, i) => {
        if (
          r[c.componentId] == 0
            ? r[c.componentId].toString()
            : r[c.componentId]
        ) {
          obj[c.componentId] = r[c.componentId];
        } else {
          obj[c.componentId] = '-';
        }
      });


    return obj 

}

export default moduleDetailParser