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

export const postRequest = async (url = ``, data = {}) => {
  // Default options are marked with *
  return await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
};