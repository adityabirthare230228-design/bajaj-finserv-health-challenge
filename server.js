const http = require('http');

const server = http.createServer((req, res) => {
    // Add CORS headers so you can test it from anywhere
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/bfhl') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const parsed = JSON.parse(body);
                const data = parsed.data || [];
                const odd = [];
                const even = [];
                const alphabets = [];
                const special = [];
                let sum = 0;
                let alphaConcat = "";

                for (let item of data) {
                    if (/^\d+$/.test(item)) {
                        let num = parseInt(item, 10);
                        sum += num;
                        if (num % 2 === 0) even.push(item);
                        else odd.push(item);
                    } else if (/^[a-zA-Z]+$/.test(item)) {
                        alphabets.push(item.toUpperCase());
                        alphaConcat += item;
                    } else {
                        special.push(item);
                    }
                }

                let reversed = alphaConcat.split('').reverse().join('');
                let concatString = "";
                for (let i = 0; i < reversed.length; i++) {
                    let ch = reversed[i];
                    if (i % 2 === 0) concatString += ch.toUpperCase();
                    else concatString += ch.toLowerCase();
                }

                const responseObj = {
                    is_success: true,
                    user_id: "aditya_sharma_26052003",
                    email: "aditya.sharma@example.com",
                    roll_number: "YOURROLL123",
                    odd_numbers: odd,
                    even_numbers: even,
                    alphabets: alphabets,
                    special_characters: special,
                    sum: sum.toString(),
                    concat_string: concatString
                };

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(responseObj));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ is_success: false, message: err.message }));
            }
        });
    } else if (req.method === 'GET' && req.url === '/bfhl') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ operation_code: 1 }));
    } else if (req.method === 'GET' && req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'UP' }));
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});
