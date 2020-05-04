// import { chromium, errors } from 'playwright'
import puppeteer, { errors } from 'puppeteer';

import { Hazard, blankHazard } from '../services/models/hazard'

const feedHazard = async () => {
  const browser = await puppeteer.launch({
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--single-process'
    ],
    headless: true
  })
  // const context = await browser.newContext()
  const page = await browser.newPage()
  const url: string = 'https://hazard.yahoo.co.jp/article'
  await page.goto(`${url}/20200207`)
  const mapSel = '#map .table .table__section div'
  const items = await page.$$(mapSel)
  let feedData: Hazard[] = []

  for await (const [index, item] of items.entries()) {
    try {
      if (index === 0) continue
      const regionName = await item.$eval('dt', el => el.textContent)
      const todayValue = await item.$eval('dd', el => el.textContent)
      const link = await item.$eval('a', el => el.getAttribute('href'))
      const keyValue = link?.replace(`${url}/covid19`, '')
      if (regionName && todayValue && keyValue) {
        const todayNumber = parseInt(todayValue, 10) || 0
        feedData.push({
          ...blankHazard,
          id: index,
          key: keyValue,
          region: regionName,
          todayInfection: todayNumber
        })
      }
    } catch (e) {
        if (e instanceof errors.TimeoutError) {
          console.log('timeout error')
        } else {
          console.log(e)
        }
    }
  }

  await browser.close()

  return feedData
}

export default feedHazard
