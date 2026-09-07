import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
const source='C:/Users/myria/Downloads/WhatsApp Unknown 2026-09-07 at 13.36.55/';
await mkdir('public/images',{recursive:true}); await mkdir('public/fonts',{recursive:true});
const photos=[['hero','WhatsApp Image 2026-09-07 at 13.34.41.jpeg'],['portrait','WhatsApp Image 2026-09-07 at 13.34.41 (2).jpeg'],['plates','WhatsApp Image 2026-09-07 at 13.34.42.jpeg'],['curls','WhatsApp Image 2026-09-07 at 13.34.41 (1).jpeg']];
for(const [name,file] of photos){for(const width of [640,1280])await sharp(source+file).rotate().resize({width,withoutEnlargement:true}).webp({quality:85}).toFile(`public/images/${name}${width===640?'-640':''}.webp`);}
await sharp(source+'WhatsApp Image 2026-09-07 at 13.34.42 (1).jpeg').extract({left:447,top:268,width:360,height:450}).resize({width:160}).webp({quality:95}).toFile('public/images/monogram.webp');
for(const [font,weight] of [['barlow-condensed',700],['manrope',400],['manrope',600]])await copyFile(`node_modules/@fontsource/${font}/files/${font}-latin-${weight}-normal.woff2`,`public/fonts/${font}-latin-${weight}-normal.woff2`);
console.log('Optimised supplied photography and local fonts ready.');
