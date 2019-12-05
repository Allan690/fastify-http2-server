'use strict';

require('make-promises-safe');
const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const fastify = require('fastify')({
    http2: true,
    https: {
        key: fs.readFileSync(path.join(__dirname, '.', 'localhost-privkey.pem')),
        cert: fs.readFileSync(path.join(__dirname, '.', 'localhost-cert.pem'))
    }
});

(async() => {
    try {
        fastify.get('/', async (request, reply) => {
            fs.readFile('../../Desktop/emoji.json', (err, data) => {
                if(err) throw err;
                const parsedData = JSON.parse(data);
                const parsedDataUrls = parsedData.emoji.map((file) => {
                    return file.url
                });
                parsedDataUrls.forEach(async (url) => {
                    const fileName = path.parse(url).base;
                    const filePath = path.resolve(__dirname, 'emoticons', fileName);
                    const writer = fs.createWriteStream(filePath);
                    const response = await axios.get(url, { responseType: 'stream'});

                    response.data.pipe(writer);
                    await writer.on('finish', () => {
                        reply.code(200).send({
                            status: 'success',
                            message: 'Files downloaded successfully..'
                        })
                    });
                    await writer.on('error', (err) => {
                        console.log(err);
                        reply.code(500).send({
                            message: 'an error happened...'
                        })
                    });
                })
            })
        });
    }
    catch (err) {
        console.log(err)
    }
})();

fastify.listen(3000, () => {
    console.log('listening on port 3000...')
});

exec('h2url https://localhost:3000', (err, stdout) => {
    if (err) throw err;
    console.log(stdout);
});
