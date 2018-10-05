using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Support.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace RentraxAutomation
{
    public static class Features
    {
        public static IWebElement ScrollToView(By selector)
        {
            //Driver.Wait(8, selector);
            Thread.Sleep(6000);



            IWebElement element = Driver.Instance.FindElement(selector);
            Actions action = new Actions(Driver.Instance);
            action.SendKeys(element, Keys.Down).SendKeys(element, Keys.Enter).Build().Perform();

/*
            var element = Driver.Instance.FindElement(selector);
            bool elementExist=false;
            int xPosition = 500;
            bool loop = true;

            var el = ((IJavaScriptExecutor)Driver.Instance).ExecuteScript("arguments[0].scrollIntoView(true);", element);
/*            while (loop)
            {
                try
                {
                    
                }
                catch (Exception ex)
                {
                    elementExist = false;
                }

                Thread.Sleep(500);
                if (!elementExist)
                {

                    Driver.Instance.ExecuteJavaScript("window.scrollTo({0}, {1})", xPosition, element.Location.Y);
                }
            }
*/
            return element;
        }

        public static void ScrollToView(IWebElement element, int xSt)
        {
            if (element.Location.Y > xSt)
            {
                //ScrollTo(xSt, element.Location.Y - 100); // Make sure element is in the view but below the top navigation pane
            }
        }

        /*
        var element = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div/div[2]/button[1]"));
        Actions actions = new Actions(Driver.Instance);
        actions.MoveToElement(element);
        actions.Perform();
        */
    }
}
