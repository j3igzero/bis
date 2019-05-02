import Color from "color";
import convert from '../lib/convert';


export const buildPMSList = (formula_data = {}) => {
  return Object.keys(formula_data).map((short_name) => {
    const name = 'PMS ' + short_name.replace(' C', '');
    const full_name = 'PMS ' + short_name;
    const hex = '#'+ convert.PMS2RGB(short_name);
    const rgb = Color(hex).rgb().string();

    return { name, full_name, short_name, hex, rgb };
  });
}