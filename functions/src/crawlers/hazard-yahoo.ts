import { Page } from 'playwright'
import { Region, blankRegion } from 'services/models/region'

const feedHazard = async (page: Page) => {
    const url: string = 'https://hazard.yahoo.co.jp/article/20200207'
    await page.goto(url)
    const mapSel = '#map .table .table__section div'
    const items = await page.$$(mapSel)
    let feedData: Region[] = []

    for await (const item of items) {
      const regionName = await item.$eval('dt', el => el.textContent)
      const todayValue = await item.$eval('dd', el => el.textContent)
      if (regionName && todayValue) {
        feedData.push({
          ...blankRegion,
          name: regionName,
          todayInfection: parseInt(todayValue, 10)
        })
      }
    }

    return feedData
}

export default feedHazard