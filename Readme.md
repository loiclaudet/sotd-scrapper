# Awwwards Site of the Day Scraper

This Node.js script scrapes the Awwwards homepage to find the current "Site of the Day" (SOTD). If the SOTD has changed since the last check, it plays a local notification sound.

## Installation

1. Clone the repository or download the files.
2. Navigate to the project directory:
   ```bash
   cd awwwards-scraper
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

### Manual Execution

To run the script manually, execute the following command in your terminal:

```bash
node index.js
```

This will print the current SOTD to the console. If it's a new SOTD, it will play the `alert.mp3` sound.

### Automated Execution with Cron

To run the script automatically every 5 minutes, you can set up a cron job.

1.  **Find your Node.js path:**

    ```bash
    which node
    ```

    Copy the output path. It will look something like `/usr/local/bin/node` or `/Users/your-user/.nvm/versions/node/vXX.X.X/bin/node`.

2.  **Open your crontab file for editing:**

    ```bash
    crontab -e
    ```

3.  **Add the cron job:**

    Add the following line to the file, replacing `[PATH_TO_NODE]` with the path you copied and `[PATH_TO_SCRIPT]` with the absolute path to the `index.js` file.

    ```
    */5 * * * * [PATH_TO_NODE] [PATH_TO_SCRIPT]/index.js
    ```

    For example:

    ```
    */5 * * * * /Users/lodz/.nvm/versions/node/v22.12.0/bin/node /Users/lodz/awwwards-scraper/index.js
    ```

4.  **Save and exit** the editor.

### Testing

To check if the cron job is active, you can list your current cron jobs:

```bash
crontab -l
```

After the cron job has run, you can check the `previous-sotd.txt` file, which will be created in the project directory. It will contain the date and the name of the last scraped SOTD.

---

<p align="center">Vibe Coded With gemini-2.5-pro</p>
