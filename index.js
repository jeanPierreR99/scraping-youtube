const puppeteer = require('puppeteer');

(async ()=>{
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto('https://www.youtube.com');

    await page.waitForSelector('ytd-rich-grid-media');

  const main = await page.evaluate(() =>{
        const items = document.querySelectorAll('ytd-rich-grid-media');

        const array = [];
        for(let item of items){

            var name = item.querySelector('yt-formatted-string').innerText;
            var img = item.querySelector('yt-image img').src;
            var canal = item.querySelector('ytd-channel-name').innerText;
            var views = item.querySelector('#metadata-line > .inline-metadata-item.style-scope.ytd-video-meta-block').innerText
            var url = item.querySelector('.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail').href;

            array.push({"nombre": name, "imagen": img, "canal": canal, "vistas": views, "url": url, "comment": "sd"});
        }

      return array;
    })
        for(var i=0; i<=1; i++){

            await page.goto(main[i].url)

            // await page.waitForSelector('ytd-item-section-renderer');


        // var wer = await page.evaluate( ()=>{
                // const items2 = document.querySelectorAll('ytd-item-section-renderer');
                // var comentario = document.querySelectorAll('#author-text > span').innerText;
                // return comentario
            // }) 

          main[i].comment="autor de comentario"; 
            await page.screenshot({
                quality: 100,
                path: `./image/${main[i].nombre}.jpg`
            })
            await time(4000);
        }

        console.log(main)

})();

const time = (milliseconds) => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}