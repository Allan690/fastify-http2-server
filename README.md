# Fastify HTTP/2 server

Fastify http/2 server that downloads multiple images whose urls are listed in an array and writes them to the file system

## External dependencies
- h2url - `yarn global add h2url`
- Node > = v8.18.0

### Getting started
Generate a self-signed RSA Key pair by running the command below in your terminal in your directory root:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout localhost-privkey.pem -out localhost-cert.pem
```
- Install dependencies: `yarn`
- Start the server: `yarn start`

### Note:
- Create your own json file. In my use case I wanted to bulk download images whose urls i'd listed in a json file.
