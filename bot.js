const {
  Builder,
  By,
  Key,
  until,
  Actions,
  WebElement,
} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { execSync } = require("child_process"); // For accessing the clipboard
const { connect } = require("http2");

const reply = "SUPPP";
async function run() {
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().addArguments("--start-maximized"))
    .build();

  try {
    // Open the website
    await driver.get(
      "https://pump.fun/coin/9CEbFPQG79HX7DLoDtkScsMu1uyheDg3Pfj1nQqEpump"
    ); // Change to the URL of your page

    // Wait for the "Ready to Pump" button to be clickable before clicking
    const readyToPump = await driver.wait(
      until.elementIsVisible(
        driver.findElement(By.css("button[data-sentry-element='Button']"))
      ),
      10000
    );
    await readyToPump.click();
    console.log("clicked ready to pump");

    // Step 2: Wait for the "Connect Wallet" button to be visible and clickable
    const connectWalletButton = await driver.wait(
      until.elementLocated(By.xpath("/html/body/div[1]/nav/div[2]/button")),
      10000
    );
    await connectWalletButton.click();
    console.log("clicked connect wallet");

    // Step 3: Wait for the wallet connection options to appear
    const solflare = await driver.wait(
      until.elementLocated(By.xpath("//img[@alt='Solflare']")),
      10000
    );
    await solflare.click();
    console.log("clicked Solflare");

    // Step 4: Wait for the outside element (to close the dialog) to be visible and
    // Step 4: Click at the bottom-right of the viewport
    const viewportWidth = await driver.executeScript(
      "return window.innerWidth;"
    );
    const viewportHeight = await driver.executeScript(
      "return window.innerHeight;"
    );

    // Calculate coordinates for the bottom-right corner
    const xOffset = viewportWidth - 10; // 10px from the right edge
    const yOffset = viewportHeight - 10; // 10px from the bottom edge

    // Perform the click
    const actions = driver.actions({ async: true });
    await actions
      .move({ x: xOffset, y: yOffset, origin: "viewport" })
      .click()
      .perform();
    console.log("Simulated click at the bottom-right of the viewport");

    // Step 3: Wait for the wallet connection options to appear

    try {
      await driver
        .switchTo()
        .frame(driver.findElement(By.xpath("/html/body/div[3]/iframe")));
      console.log("switched to iframe");

      await driver.sleep(3000);
      // Log the HTML content inside the iframe
      // Perform the click
      const actions = driver.actions({ async: true });
      // Show where the click will happen by adding a marker

      await actions
        .move({ x: 600, y: 370, origin: "viewport" })
        .click()
        .perform();
      console.log("Simulated click at the button of the viewport");
      // After clicking, check for a new pop-up window (new tab or window)
      const currentWindow = await driver.getWindowHandle(); // Get the current window handle
      const allHandles = await driver.getAllWindowHandles(); // Get all window handles

      // Switch to the new pop-up window
      const newWindowHandle = allHandles.find(
        (handle) => handle !== currentWindow
      );
      await driver.switchTo().window(newWindowHandle); // Switch to the new window

      console.log("Switched to the pop-up window");
      // Add a marker at the click position

      // Perform actions on the pop-up window (e.g., click a button)
      const newWalletButtonInPopUp = await driver.wait(
        until.elementLocated(
          By.xpath("/html/body/div/div/div[2]/div/div/div[2]/div/button[1]")
        ), // Adjust selector for pop-up
        5000
      );
      await newWalletButtonInPopUp.click();
      console.log("New wallet selected with the pop-up");

      // Perform actions on the pop-up window (e.g., click a button)
      const copyButtonInPopUp = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div/div/div[1]/div[2]/div[3]/button[2]"
          )
        ), // Adjust selector for pop-up
        5000
      );
      await copyButtonInPopUp.click();
      console.log("Copied recovery phrase with the pop-up");

      // Perform actions on the pop-up window (e.g., click a button)
      const savedRecoveryPhraseBTN = await driver.wait(
        until.elementLocated(
          By.xpath("/html/body/div/div/div[2]/div/div/div[2]/div/button")
        ), // Adjust selector for pop-up
        5000
      );
      await savedRecoveryPhraseBTN.click();
      console.log("saved my recovery phrase btn clicked with the pop-up");

      const clipboardData = execSync("powershell Get-Clipboard")
        .toString()
        .trim(); // Windows
      console.log("Copied Clipboard Data:", clipboardData);
      // Actions class methods to select text
      // Paste the text in the second input box
      const action2 = driver.actions({ async: true });

      await action2
        .keyDown(Key.CONTROL) // Use Key.COMMAND on Mac
        .sendKeys("v")
        .keyUp(Key.CONTROL)
        .perform();

      console.log("Text copied and pasted successfully.");

      // Perform actions on the pop-up window (e.g., click a button)
      const continueBtn = await driver.wait(
        until.elementLocated(
          By.xpath("/html/body/div/div/div[2]/div/form/div/div[2]/div/button")
        ), // Adjust selector for pop-up
        5000
      );
      await continueBtn.click();
      console.log("continue btn clicked with the pop-up");

      const password = "Capped$1$2$3";
      const newPasswordField = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div/form/div/div[1]/div[2]/div[1]/div/div/div/div/input"
          )
        ), // Adjust selector for pop-up
        5000
      );
      const confirmPasswordField = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div/form/div/div[1]/div[2]/div[2]/div/div/div/div/input"
          )
        ), // Adjust selector for pop-up
        5000
      );

      await newPasswordField.sendKeys(password);
      await confirmPasswordField.sendKeys(password);
      const continueBtn2 = await driver.wait(
        until.elementLocated(
          By.xpath("/html/body/div/div/div[2]/div/form/div/div[2]/button")
        ), // Adjust selector for pop-up
        5000
      );
      await continueBtn2.click();

      //new instance

      // Close the pop-up window
      await driver.close();
      console.log("Pop-up window closed");

      // Switch back to the main window
      await driver.switchTo().window(currentWindow);
      console.log("Switched back to the main window");
      const connectWalletButton = await driver.wait(
        until.elementLocated(By.xpath("/html/body/div[1]/nav/div[2]/button")),
        10000
      );
      await connectWalletButton.click();
      console.log("clicked connect wallet");

      // Step 3: Wait for the wallet connection options to appear
      const solflare = await driver.wait(
        until.elementLocated(By.xpath("//img[@alt='Solflare']")),
        10000
      );
      await solflare.click();
      console.log("clicked Solflare");

      // Step 4: Wait for the outside element (to close the dialog) to be visible and
      // Step 4: Click at the bottom-right of the viewport
      const viewportWidth = await driver.executeScript(
        "return window.innerWidth;"
      );
      const viewportHeight = await driver.executeScript(
        "return window.innerHeight;"
      );

      // Calculate coordinates for the bottom-right corner
      const xOffset = viewportWidth - 10; // 10px from the right edge
      const yOffset = viewportHeight - 10; // 10px from the bottom edge

      // Perform the click
      const action3 = driver.actions({ async: true });
      await action3
        .move({ x: xOffset, y: yOffset, origin: "viewport" })
        .click()
        .perform();
      console.log("Simulated click at the bottom-right of the viewport");

      // Step 3: Wait for the wallet connection options to appear

      try {
        await driver
          .switchTo()
          .frame(driver.findElement(By.xpath("/html/body/div[3]/iframe")));
        console.log("switched to iframe");

        const actions = driver.actions({ async: true });
        // Show where the click will happen by adding a marker

        await driver.sleep(3000);
        await actions
          .move({ x: 600, y: 370, origin: "viewport" })
          .click()
          .perform();
        console.log("Simulated click at the button of the viewport");
        // After clicking, check for a new pop-up window (new tab or window)
        const currentWindow = await driver.getWindowHandle(); // Get the current window handle
        const allHandles = await driver.getAllWindowHandles(); // Get all window handles

        // Switch to the new pop-up window
        const newWindowHandle = allHandles.find(
          (handle) => handle !== currentWindow
        );
        await driver.switchTo().window(newWindowHandle); // Switch to the new window

        console.log("Switched to the pop-up window");

        const connectBtn = await driver.wait(
          until.elementLocated(
            By.xpath("/html/body/div[2]/div[2]/div/div[3]/div/button[2]")
          ),
          10000
        );

        await connectBtn.click();
        console.log("connectBtn clicked");

        const approveBtn = await driver.wait(
          until.elementLocated(
            By.xpath(
              "/html/body/div[2]/div[2]/div/div[2]/div/div[2]/div[3]/div/button[2]"
            )
          ),
          10000
        );
        await approveBtn.click();
        console.log("approveBtn clicked");
        await driver.close();
        console.log("Pop-up window closed");

        await driver.switchTo().window(currentWindow);
        console.log("Switched back to the main window");

        // Locate the element
        const targetElement = await driver.findElement(
          By.xpath("/html/body/div[1]/main/div[1]/div[2]/div[1]/div[5]/div")
        );

        // Scroll to the element and wait for the page to settle
        await driver.executeScript(
          `const rect = arguments[0].getBoundingClientRect();
       window.scrollBy(0, rect.top - (window.innerHeight / 2));`,
          targetElement
        );

        // Add a delay to ensure the page has time to settle after scrolling
        await driver.sleep(1000); // Adjust the sleep time as necessary (1000ms = 1 second)

        // Ensure the element is interactable and visible
        await driver.wait(until.elementIsVisible(targetElement), 5000);

        // Get the element's position and ensure the coordinates are integers
        const rect = await driver.executeScript(
          `const rect = arguments[0].getBoundingClientRect();
       return { x: Math.floor(rect.left + (rect.width / 2)), 
                y: Math.floor(rect.top + (rect.height / 2)) };`,
          targetElement
        );

        // Perform the click action at the calculated coordinates
        await driver.actions().move({ x: rect.x, y: rect.y }).click().perform();
        console.log("Clicked the target element");
        // postBtn.click();
      } catch (error) {
        console.log("failed connecting created wallet", error);
      }
    } catch (error) {
      console.log("Failed to switch to iframe:", error);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the driver after the actions
    // await driver.quit();
  }
}

run();
