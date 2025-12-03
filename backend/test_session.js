import http from "http";

const HOST = 'localhost';
const PORT = process.env.PORT || 9999;

function postCreateAnonymous(username = 'testanon') {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ username });

        const options = {
            hostname: HOST,
            port: PORT,
            path: '/api/anonymous/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data),
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => (body += chunk));
            res.on('end', () => {
                const setCookie = res.headers['set-cookie'];
                resolve({ statusCode: res.statusCode, body, setCookie });
            });
        });

        req.on('error', (e) => reject(e));
        req.write(data);
        req.end();
    });
}

function getDashboard(cookie) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: HOST,
            port: PORT,
            path: '/dashboard',
            method: 'GET',
            headers: {
                Cookie: cookie || '',
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => (body += chunk));
            res.on('end', () => resolve({ statusCode: res.statusCode, body, headers: res.headers }));
        });

        req.on('error', (e) => reject(e));
        req.end();
    });
}

(async () => {
    try {
        console.log('POST /api/anonymous/create');
        const post = await postCreateAnonymous('testanon' + Date.now());
        console.log('POST response status:', post.statusCode);
        console.log('POST body:', post.body);
        console.log('Set-Cookie header:', post.setCookie);

        const cookie = (post.setCookie || []).map(c => c.split(';')[0]).join('; ');

        console.log('\nGET /dashboard with cookie');
        const dash = await getDashboard(cookie);
        console.log('GET status:', dash.statusCode);
        console.log('GET body:', dash.body);
        console.log('GET headers:', dash.headers);
    } catch (e) {
        console.error('Error during test:', e);
    }
})();
