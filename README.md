# whatsapp-filter-unlimited

# Node.js WhatsApp Server

This Node.js server allows you to check the validity of phone numbers using the WhatsApp platform.

## Prerequisites

Before running this server, ensure that you have the following packages installed:

- `whatsapp-web.js`
- `fs`
- `qrcode`
- `yargs`
- `express`
- `child_process`

You can install these packages by running the following command:
npm install whatsapp-web.js fs qrcode yargs express child_process

Additionally, you need to download Chromium and set its path to `./chrome-win/chrome.exe` in order to generate QR codes.

1. Download Chromium from the official website: [https://www.chromium.org/getting-involved/download-chromium](https://www.chromium.org/getting-involved/download-chromium)

2. Extract the downloaded archive.

3. Copy the `chrome.exe` file from the extracted folder.

4. Paste the `chrome.exe` file into the `./chrome-win/` directory in your project.

Create a folder named `qrcode` in the root directory of your project. This folder will store the QR codes that you need to scan using your phone to start the server.


## Usage

To start the server, execute the following command:

node whatsapp-server.js -x 1010 -y "Your Profile Name"

Make sure to replace the values `-x 1010` and `-y "Your Profile Name"` with your desired port number and profile name, respectively.

Once the server is running, you can check the validity of a phone number by sending an HTTP GET request to the following URL:

http://localhost:100/profile/phone-number

Replace `1010` with the port number you specified when starting the server, `profile` with your chosen profile name, and `phone-number` with the number you want to check.

The server will respond with a JSON object indicating the status of the phone number:



```json
If the number is valid, the response will be:
{
  "status": "VALID",
  "number": "phone-number"
}
If the number is invalid, the response will be:
{
  "status": "INVALID",
  "number": "phone-number"
}

