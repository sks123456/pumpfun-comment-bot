// Locate the element
const targetElement = await driver.findElement(
  By.xpath("/html/body/div[1]/main/div[1]/div[2]/div[1]/div[5]/div")
);

// Scroll to the element's position
await driver.executeScript(
  `const rect = arguments[0].getBoundingClientRect();
   window.scrollBy(0, rect.top - (window.innerHeight / 2));`, // Scroll to center the element
  targetElement
);

// Get the element's position and click its location
const rect = await driver.executeScript(
  `const rect = arguments[0].getBoundingClientRect();
   return { x: rect.left + (rect.width / 2), y: rect.top + (rect.height / 2) };`,
  targetElement
);

// Perform a click action at the calculated coordinates
await driver.actions().move({ x: rect.x, y: rect.y }).click().perform();
