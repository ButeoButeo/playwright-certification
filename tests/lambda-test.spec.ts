//import { test, expect } from '@playwright/test';

import  test from '../lambdatest-setup'
import { expect } from '@playwright/test' 

test.describe('LambdaTest Selenium Playground Tests', () => {
  
  test('Test Scenario 1: Simple Form Demo', async ({ page }) => {
    //step 1 - Open the https://www.lambdatest.com/selenium-playground.”
    await page.goto('/selenium-playground');
    //step 2 - Click“Simple Form Demo”
    await page.getByRole('link', { name: 'Simple Form Demo' }).click();
    //step 3 - Validate that the URL contains “simple-form-demo”
    await expect(page).toHaveURL(/simple-form-demo/);
    //step 4 - Create a variable for a string value e.g.: “Welcome to LambdaTest”
    const stringValue = "Welcome to LambdaTest";
    //step 5 - Use this variable to enter values in the “Enter Message” text box.
    await page.getByRole('textbox', { name: 'Please enter your Message' }).fill(stringValue);
    //step 6 - Click“Get Checked Value”
    await page.getByRole('button', { name: 'Get Checked Value' }).click();
    //step 7 - Validate whether the same text message is displayed in the right-hand panel under the “Your Message:” section.
    await expect(await page.getByText('Welcome to LambdaTest')).toHaveText(stringValue)
  });

  test('Test Scenario 2: Drag y Drop Sliders', async ({ page }) => {
    //step 1 - Open the https://www.lambdatest.com/selenium-playground page and click“Drag & Drop Sliders.”
    await page.goto('/selenium-playground');
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
                expect(await page.locator('#rangeSuccess').textContent()).toEqual(targetAmount)
            }
        }
    }
  });

  test('Test Scenario 3: Input Form Submit', async ({ page }, TestInfo) => {
    //step 1 - Open the https://www.lambdatest.com/selenium-playground page and click“Input Form Submit”
    await page.goto('/selenium-playground');
    await page.getByRole('link', { name: 'Input Form Submit' }).click();
    //step 2 - Click“Submit” without filling in any information in the form.
    await page.getByRole('button', { name: 'Submit' }).click();
    //step 3 - Assert “Please fill in the fields” error message.
    // Locate the required input field
    const inputFieldName = page.getByRole('textbox', { name: 'Name' });
    // Check for the "Please fill out this field." error message
     const validationMessage = await inputFieldName.evaluate((element) => {
        const input = element as HTMLInputElement
        return input.validationMessage
      })
      if(TestInfo.project.name =='chrome' || TestInfo.project.name =='pw-chromium'){ 
        expect(validationMessage).toContain("Please fill in this field.")
       }else if(TestInfo.project.name =='pw-webkit' || TestInfo.project.name =='webkit'){
        expect(validationMessage).toContain("Fill out this field")
      }else if(TestInfo.project.name =='pw-firefox' || TestInfo.project.name =='firefox'){
        expect(validationMessage).toContain("Please fill out this field.")
      } 
    //step 4 - Fill in Name, Email, and other fields.
     inputFieldName.fill('Tester')
     await page.getByRole('textbox', { name: 'Email*' }).fill('Tester@gmail.com');
     await page.getByRole('textbox', { name: 'Password*' }).fill('Tester12**+');
     await page.getByRole('textbox', { name: 'Company' }).fill('Company');
     await page.getByRole('textbox', { name: 'Website' }).fill('Website');
     await page.getByRole('textbox', { name: 'City', exact: true }).fill('City');
     await page.getByRole('textbox', { name: 'Address 2' }).fill('Address 2');
     await page.getByRole('textbox', { name: 'Address 1' }).fill('Address 1');
     await page.getByRole('textbox', { name: 'City* State*' }).fill('City* State*');
     await page.getByRole('textbox', { name: 'Zip Code*' }).fill('Zip Code*');
     //step 5 - From the Country drop-down, select “United States” using the text property.
     await page.getByRole('combobox').selectOption('US');
     // step 6 - Fill in all fields and click “Submit”
     await page.getByRole('button', { name: 'Submit' }).click();
     //step 7 - Once submitted, validate the success message “Thanks for contacting us, we will get back to you shortly.” on the screen.
     await expect(page.getByText('Thanks for contacting us, we')).toHaveText('Thanks for contacting us, we will get back to you shortly.');
  });
  
});
