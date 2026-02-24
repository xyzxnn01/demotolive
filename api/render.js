const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    // Try multiple possible paths for the content file
    let html;
    const possiblePaths = [
      path.join(process.cwd(), '_content.html'),
      path.join(__dirname, '..', '_content.html'),
      path.resolve('_content.html')
    ];

    for (const p of possiblePaths) {
      try {
        html = fs.readFileSync(p, 'utf8');
        break;
      } catch (e) {
        continue;
      }
    }

    if (!html) {
      res.status(500).send('Content not found');
      return;
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(html);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};
