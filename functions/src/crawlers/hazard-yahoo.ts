// import { chromium, errors } from 'playwright'
import puppeteer, { errors } from 'puppeteer'
import { Hazard, blankHazard } from '../services/models/hazard'

const feedHazard = async () => {
  let feedData: Hazard[] = []

  try {
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
    // playwrightが Cloud Functionsで動かなかったので
    // const context = await browser.newContext()
    const page = await browser.newPage()
    const url: string = 'https://hazard.yahoo.co.jp/article'
    await page.goto(`${url}/20200207`)
    const mapSel = '#map .table .table__section div'
    const tabSel = '#map .tab .tab__wrapper .tab__item'
    const items = await page.$$(mapSel)
    const tabs = await page.$$(tabSel)

    for await (const [index, item] of items.entries()) {
      if (index === 0) continue
      const regionName = await item.$eval('dt', el => el.textContent)
      const link = await item.$eval('a', el => el.getAttribute('href'))
      const keyValue = link?.replace(`${url}/covid19`, '')
      let hazardData!: Hazard

      if (!(regionName && keyValue)) continue
      hazardData = {
        ...blankHazard,
        id: index,
        key: keyValue,
        region: regionName
      }

      // タブで現在（初期）、新規、累計を切り替えていく
      for await (const [i, tab] of tabs.entries()) {
        const infections = ['nowInfection', 'todayInfection', 'totalInfection'] as const
        await tab.click()
        const value = await item.$eval('dd', el => el.textContent)

        if (!value) continue
        const valueNumber = parseInt(value.replace(/,/g, ''), 10) || 0

        hazardData[infections[i]] = valueNumber
      }

      feedData.push(hazardData)
    }

    await browser.close()
  } catch (e) {
    if (e instanceof errors.TimeoutError) {
      console.log('timeout error')
    } else {
      console.log(e)
    }
  }

  return feedData
}

export default feedHazard
