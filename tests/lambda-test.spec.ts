import { test, expect } from '@playwright/test';

test.describe('LambdaTest Selenium Playground Tests', () => {
  
  test('Test Scenario 1: Simple Form Demo', async ({ page }) => {

  });

  test('Test Scenario 2: Drag & Drop Sliders', async ({ page }) => {
    //step 1 - Open the https://www.lambdatest.com/selenium-playground page and click“Drag & Drop Sliders.”
    await page.goto('https://www.lambdatest.com/selenium-playground');
    await page.getByRole('link', { name: 'Drag & Drop Sliders' }).click();
    await expect(page).toHaveURL(/drag-drop-range-sliders-demo/);
    //step 2 - Select the slider “Default value 15” and drag the bar to make it 95 by validating whether the range value shows 95.
    const s = page.locator('#slider3').getByRole('slider')
    // Locate slider and handle
    let slider = page.locator('#slider3').getByRole('slider'); 
    let text = await page.locator('#rangeSuccess').textContent();
    // Drag slider to 95
    let targetAmount = '95';
    let isCompleted = false;
    if(s){
        while(!isCompleted){
            let srcBound = await s.boundingBox();
            if(srcBound){
                await page.mouse.move(srcBound.x + srcBound.width/2,srcBound.y + srcBound.height/2)
                await page.mouse.down();
                await page.mouse.move(srcBound.x + 465, srcBound.y + srcBound.height/2)
                await page.mouse.up(); 
                let text = await page.locator('#rangeSuccess').textContent();
                if(text == targetAmount){
                    isCompleted = true;
                }
                expect(text).toBe(targetAmount)
            }
        }
    }
  });

  test('Test Scenario 3: Input Form Submit', async ({ page }) => {

  });
  
});
