import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:3001'
});

export const getOutput = async (code, language, level) => {
    try {
        const info = {code: code, language: language, level: level};
        const resp = await client.post('/response/', info);
        return resp.data.choices[0].text;
    } 
    catch (err) {
        console.error(err);
    }
}