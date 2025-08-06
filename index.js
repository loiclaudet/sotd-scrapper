
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

const player = require('play-sound')(opts = {})

const url = 'https://www.awwwards.com/';
const previousSotdFile = path.join(__dirname, 'previous-sotd.txt');
const audioFile = path.join(__dirname, 'alert.mp3');


async function scrapeAwwwards() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const sotdElement = $('h3.heading-1.text-uppercase.text-balance');
    const sotdName = sotdElement.text().trim();

    if (sotdName) {
      let previousSotdName = '';
      if (fs.existsSync(previousSotdFile)) {
        const fileContent = fs.readFileSync(previousSotdFile, 'utf8').trim();
        if (fileContent && fileContent.includes(': ')) {
            previousSotdName = fileContent.split(': ')[1];
        } else {
            // Handle case where file exists but is in old format
            previousSotdName = fileContent;
        }
      }

      console.log(`Current SOTD: ${sotdName}`);

      const today = new Date().toISOString().slice(0, 16).replace('T', ' ');
      fs.writeFileSync(previousSotdFile, `${today}: ${sotdName}`);

      if (sotdName !== previousSotdName) {
        console.log('New SOTD found! Playing notification sound.');
        player.play(audioFile, (err) => {
          if (err) console.log(`Could not play sound: ${err}`);
        });

      } else {
        console.log('SOTD has not changed.');
      }
    } else {
      console.log('Could not find the SOTD element on the page.');
    }
  } catch (error) {
    console.error('Error scraping Awwwards:', error);
  }
}

scrapeAwwwards();
