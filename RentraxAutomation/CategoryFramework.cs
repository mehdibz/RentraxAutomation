using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentraxAutomation
{
    public class CategoryFramework
    {
        public static void GoToCategory()
        {
            //click on Rent Order
            var categories = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div[2]/a[10]/div"));
            categories.Click();
        }
    }
}
