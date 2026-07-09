import * as cheerio from 'cheerio';

let startDate = new Date(); 
(async () => {
    for (let i = 0; i < 12; i++) {
    const url = `https://nwfilmforum.org/calendar/?start=${startDate.toISOString().split('T')[0]}&type=film&attributes=`
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const $filmInfo = $('.preview-wrap')
    
    for (let i = 0; i < $filmInfo.length; i++) {
        //const filmTitle = $filmInfo.eq(i).text().trim();
        const filmDate = $filmInfo.eq(i).find('.preview__slide__top__text').text().trim();
        const filmTitle = $filmInfo.eq(i).find('.preview__slide__bottom__title').text().trim();
        // const filmLocation = $filmInfo.eq(i).find('.preview-location').text().trim();
        // const filmDescription = $filmInfo.eq(i).find('.preview-description').text().trim();
        //console.log(filmDate, filmTitle);
        const filmInfo = {
            date: filmDate.split(' ').slice(0, 3).join(' '),
            title: filmTitle,
        }
        console.log(filmInfo);
    }
    startDate.setDate(startDate.getDate() + 7);
}
})();
