using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using System;

namespace RentraxAutomation
{
    public class Driver
    {
        public static IWebDriver Instance { get; set; }

        public static void Initialize()
        {
            Instance = new FirefoxDriver();
            //  Instance.Manage().Timeouts().ImplicitWait(TimeSpan.FromSeconds(5));
            Instance.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(10);
        }
    }
}