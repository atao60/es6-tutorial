import { default as rates } from '../rates.json';

export const findAll = () => new Promise((resolve, reject) => {
    if (rates) {
        resolve(rates);
    } else {
        reject("No rates");
    }
});
