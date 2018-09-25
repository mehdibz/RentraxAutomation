using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentraxAutomation
{
    public class Orders
    {
        public static void GoToRent()
        {
            //click on Rent Order
            var renOrder = Driver.Instance.FindElement(By.CssSelector("# printable > div.tiles.margin-bototm-30.padding-left-tiles > a:nth-child(2)"));
            renOrder.Click();
        }

        public static void NewOrder()
        {
            //click on New Order
            var newOrder = Driver.Instance.FindElement(By.CssSelector("#printable > div > div > div > div.portlet-title > div.tools > div > a"));
            newOrder.Click();
        }

        public static void Customer_Info()
        {
            
        }

        public static void I_want_To_Rent()
        {
            
        }

        public static void Rental_Period()
        {
            
        }

        public static void RentType()
        {
            //click on Rent_Now
            var newOrder = Driver.Instance.FindElement(By.CssSelector("# printable > div > div > div > div > section > div:nth-child(2) > div.row-fluid > div > div.row.add_margin_bottom.ng-scope > div:nth-child(1) > label"));
            newOrder.Click();
        }

        public static void Credit_Card_Info()
        {
            
        }

        public static void Pay()
        {
            
        }

        public static void SkipPaymentAndSubmit()
        {
            
        }

        public static void Check_Availability()
        {
            
        }

        public static void Would_Like_To_Purchase()
        {
            
        }

        public static void Borrow_Items()
        {
            
        }
    }
}
