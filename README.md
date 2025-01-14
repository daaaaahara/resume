# resume

## Setup

### 1. Google Cloud Console Setup

1. Create a new project in [Google Cloud Console](https://console.cloud.google.com/)

2. Enable Google Drive API
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API" and enable it

3. Create a Service Account
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Enter a service account name and create

4. Create a Key
   - Select the created service account
   - Go to "Keys" > "Add Key" > "Create new key"
   - Choose JSON format
   - Download and save the JSON file as `service-account.json` in the project root

### 2. Google Drive Setup

1. Create a folder for your resume in Google Drive

2. Share the folder
   - Right-click the folder > "Share"
   - Add the service account email (`xxx@xxx.iam.gserviceaccount.com`)
   - Set permission to "Editor"

### 3. Environment Variables Setup

1. Create `.env` file
   ```bash
   cp .env.example .env
   ```

2. Set Google Drive File ID
   - Get the ID from the document URL:
     - Editor URL: `https://docs.google.com/document/d/[file-id]/edit`
     - Share Link: `https://drive.google.com/file/d/[file-id]/view`
   - Set it as `RESUME_FILE_ID` in `.env`

## Commands

Generate PDF from markdown:
```
> npm run build:pdf
```

Run linter:
```
> npm run lint
```

## Google Drive Sync

Upload:
```
> npm run drive:upload
```

Download:
```
> npm run drive:download
```

## Web
- https://daaaaahara.github.io/resume/
