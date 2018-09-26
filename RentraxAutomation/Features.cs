using OpenQA.Selenium;
using OpenQA.Selenium.Support.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentraxAutomation
{
    public static class Features
    {
        public static IWebElement ScrollToView(By selector)
        {
//            Driver.Wait(4, By.XPath("//*[@id='printable']/div/div/div/div/section/div[1]/div[1]/div/div[2]/div[1]"));
            var element = Driver.Instance.FindElement(selector);
            ScrollToView(element);
            return element;
        }

        public static void ScrollToView(IWebElement element)
        {
            if (element.Location.Y > 200)
            {
                ScrollTo(0, element.Location.Y - 100); // Make sure element is in the view but below the top navigation pane
            }
        }

        public static void ScrollTo(int xPosition = 0, int yPosition = 0)
        {
            var js = String.Format("window.scrollTo({0}, {1})", xPosition, yPosition);
            Driver.Instance.ExecuteJavaScript(js);
        }



        /*
        public IJavaScriptExecutor Scripts(this IWebDriver driver)
        {
            return (IJavaScriptExecutor)driver;
        }


        var element = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div/div[2]/button[1]"));
        Actions actions = new Actions(Driver.Instance);
        actions.MoveToElement(element);
        actions.Perform();
        */
    }
}
