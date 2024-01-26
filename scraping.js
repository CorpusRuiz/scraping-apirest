const axios= require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const express = require('express')
const url = 'https://elpais.com/ultimas-noticias/'

async function scraping(noticias) {
    try {
        const response = await axios.get(url)
        const html = response.data
        const $ = cheerio.load(html)
        const elementos = $('.b-st_a article.c.c-d.c--m');
        elementos.each((_, elemento) => {
            const titulo = $(elemento).find('header.c_h').text().trim();
            const imagen = $(elemento).find('img').attr('src');
            const descripcion = $(elemento).find('p.c_d').text().trim();
            const enlace = $(elemento).find('a').attr('href');
      
        const noticia = {
            titulo: titulo ,
            imagen: imagen,
            descripcion: descripcion,
            enlace: enlace,
        };
        noticias.push(noticia);
    })

    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));  

    } catch(error) {
        console.log(error)
    }
}

module.exports = scraping