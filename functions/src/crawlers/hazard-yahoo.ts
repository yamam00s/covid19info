import { Page } from 'playwright'
// import { Region, blankRegion } from 'services/models/region'

const feedHazard = async (page: Page) => {
    const url: string = 'https://hazard.yahoo.co.jp/article/20200207'
    await page.goto(url)
    const mapSel = '#map .table .table__section div'
    const items = await page.$$(mapSel)
    let result: string[] = []

    for await (const item of items) {
      const region = await item.$eval('dt', el => el.textContent)
      const value = await item.$eval('dd', el => el.textContent)
      if (region && value) result.push(`${region}: ${value}`)
    }

    console.log(result)
}

export default feedHazard