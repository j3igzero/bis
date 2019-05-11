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
};

// {name: 'PMS 348', full_name: 'PMS 348 C', short_name: '348 C', hex: '#9d2235', rgb: 'rgb(157, 34, 53)'}

export const buildPMSData = pantone => {
  if (!!pantone) {
    const name = 'PMS ' + pantone.replace(' C', '');
    const full_name = 'PMS ' + pantone;
    const hex = '#'+ convert.PMS2RGB(pantone);
    const rgb = (hex == '#') ? 'No RGB' : Color(hex).rgb().string();

    return { name, full_name, short_name: pantone, hex, rgb };
  }
  return {};
};