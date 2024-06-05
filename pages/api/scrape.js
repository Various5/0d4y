// pages/api/scrape.js
import axios from 'axios';
import cheerio from 'cheerio';

export default async (req, res) => {
  const { data } = await axios.get('https://www.zerodayinitiative.com/advisories/published/');
  const $ = cheerio.load(data);
  const items = [];

  $('tr#publishedAdvisories').each((index, element) => {
    items.push({
      id: $(element).find('td.sort-td').eq(0).text(),
      can: $(element).find('td.sort-td').eq(1).text(),
      org: $(element).find('td.sort-td').eq(2).text(),
      cve: $(element).find('td.sort-td').eq(3).text(),
      score: $(element).find('td.sort-td').eq(4).text(),
      date: $(element).find('td.sort-td').eq(5).text(),
      title: $(element).find('td.sort-td a').text(),
      link: 'https://www.zerodayinitiative.com' + $(element).find('td.sort-td a').attr('href'),
    });
  });

  res.status(200).json(items);
};