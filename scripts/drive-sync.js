require('dotenv').config();
const fs = require('fs');
const path = require('path');
const process = require('process');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const README_PATH = path.join(process.cwd(), 'docs', 'README.md');
const CREDENTIALS_PATH = path.join(process.cwd(), 'service-account.json');
const RESUME_FILE_ID = process.env.RESUME_FILE_ID;
const FOLDER_ID = process.env.FOLDER_ID;

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: SCOPES,
  });
  return auth;
}

async function uploadFile(auth) {
  if (!FOLDER_ID) {
    console.error('Please set FOLDER_ID in your .env file');
    process.exit(1);
  }

  const drive = google.drive({ version: 'v3', auth });
  const fileMetadata = {
    name: 'README.md',
    mimeType: 'text/markdown',
    parents: RESUME_FILE_ID ? undefined : [FOLDER_ID], // 新規作成時のみフォルダを指定
  };
  const media = {
    mimeType: 'text/markdown',
    body: fs.createReadStream(README_PATH),
  };

  try {
    if (RESUME_FILE_ID) {
      const file = await drive.files.update({
        fileId: RESUME_FILE_ID,
        resource: fileMetadata,
        media: media,
        fields: 'id,name,parents,webViewLink',
      });
      console.log('File updated successfully:', {
        id: file.data.id,
        name: file.data.name,
        parents: file.data.parents,
        webViewLink: file.data.webViewLink
      });
      return file.data.id;
    } else {
      const file = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id,name,parents,webViewLink',
      });
      console.log('File created successfully:', {
        id: file.data.id,
        name: file.data.name,
        parents: file.data.parents,
        webViewLink: file.data.webViewLink
      });
      console.log('Please save this ID in your .env file as RESUME_FILE_ID');
      return file.data.id;
    }
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
}

async function downloadFile(auth) {
  if (!RESUME_FILE_ID) {
    console.error('Please set RESUME_FILE_ID in your .env file');
    process.exit(1);
  }

  const drive = google.drive({ version: 'v3', auth });
  try {
    const response = await drive.files.get({
      fileId: RESUME_FILE_ID,
      alt: 'media',
    });
    await fs.promises.writeFile(README_PATH, response.data);
    console.log('File downloaded successfully');
  } catch (err) {
    console.error('Error downloading file:', err);
    throw err;
  }
}

async function main() {
  const auth = await authorize();
  const command = process.argv[2];

  switch (command) {
    case 'upload':
      await uploadFile(auth);
      break;
    case 'download':
      await downloadFile(auth);
      break;
    default:
      console.error('Please specify either "upload" or "download"');
      process.exit(1);
  }
}

main().catch(console.error); 
