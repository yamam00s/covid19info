import { chromium } from 'playwright'
import feedHazard from './crawlers/hazard-yahoo'


export const feedData = async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  const feedData = await feedHazard(page)

  console.log(feedData)
  await browser.close()
}

feedData()