using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.Extensions;
using OpenQA.Selenium.Support.UI;
using System;
using System.Threading;

namespace RentraxAutomation
{
    public class Driver
    {
        public static IWebDriver Instance { get; set; }

        public static void Initialize()
        {
            Instance = new FirefoxDriver();
            //Instance.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
            Instance.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(15);
        }

        public static void Close()
        {
            Thread.Sleep(5000);
            Instance.Close();
        }

        public static void Wait(int x,By element)
        {
            var wait = new WebDriverWait(Driver.Instance, TimeSpan.FromSeconds(x));
            //wait.Until(d => d.SwitchTo().ActiveElement().GetAttribute("Id") == "headertext");
            wait.Until(ExpectedConditions.PresenceOfAllElementsLocatedBy(element));
        }
    }
}