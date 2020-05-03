import { Page } from 'playwright'
import { Region, blankRegion } from '../services/models/region'

const feedHazard = async (page: Page) => {
    const url: string = 'https://hazard.yahoo.co.jp/article/20200207'
    await page.goto(url)
    const mapSel = '#map .table .table__section div'
    const items = await page.$$(mapSel)
    let feedData: Region[] = []

    for await (const [index, item] of items.entries()) {
      const regionName = await item.$eval('dt', el => el.textContent)
      const todayValue = await item.$eval('dd', el => el.textContent)

      if (regionName && todayValue && index !== 0) {
        const todayNumber = parseInt(todayValue, 10) || 0
        feedData.push({
          ...blankRegion,
          id: index,
          name: regionName,
          todayInfection: todayNumber
        })
      }
    }

    return feedData
}

export default feedHazard