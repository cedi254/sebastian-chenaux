import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
await mkdir('work/screenshots',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});const page=await browser.newPage({viewport:{width:1440,height:960},deviceScaleFactor:1});
page.on('pageerror',e=>console.log('PAGE ERROR',e.message));
await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle',timeout:120000});await page.screenshot({path:'work/screenshots/hero.png'});
await page.locator('#training').scrollIntoViewIfNeeded();await page.waitForTimeout(4000);await page.screenshot({path:'work/screenshots/training.png'});
const canvas=page.locator('.dumbbell-canvas canvas');if(await canvas.count()){await canvas.screenshot({path:'work/screenshots/dumbbell.png',omitBackground:true});console.log('Dumbbell captured');}
console.log('Overflow',await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})));console.log('Canvas count',await canvas.count());
await page.locator('#ziele').scrollIntoViewIfNeeded();await page.screenshot({path:'work/screenshots/goals.png'});await browser.close();
