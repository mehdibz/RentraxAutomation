using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;
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
            var renOrder = Driver.Instance.FindElement(By.CssSelector("#printable > div.tiles.margin-bototm-30.padding-left-tiles > a:nth-child(2)"));
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
            //Fill the customer form
            var email = Driver.Instance.FindElement(By.CssSelector("# email"));
            email.SendKeys("bz.mehdi@gmail.com");
            var firstName = Driver.Instance.FindElement(By.CssSelector("#first_name"));
            firstName.SendKeys("Mehdi");
            var lastName = Driver.Instance.FindElement(By.CssSelector("#last_name"));
            lastName.SendKeys("Bz");
            var Phone = Driver.Instance.FindElement(By.CssSelector("#customer_phone"));
            Phone.SendKeys("6047040000");
            var Address = Driver.Instance.FindElement(By.CssSelector("#address_street"));
            Address.SendKeys("Fullerton Ave");
        }

        public static void I_want_To_Rent()
        {
            //Select the SingleBike
            var singleBike = Driver.Instance.FindElement(By.CssSelector("# printable > div > div > div > div > section > div:nth-child(4) > div.portlet.light.bordered.clearfix.ng-scope > div.portlet-body.form > div > div > div:nth-child(2) > button:nth-child(2)"));
            singleBike.Click();
            var selectBike = Driver.Instance.FindElement(By.CssSelector("# printable > div > div > div > div > section > div:nth-child(4) > div.portlet.light.bordered.clearfix.ng-scope > div.portlet-body.form > div > div:nth-child(2) > div.ng-scope > div > div:nth-child(1) > div.col-xs-8.col-sm-4 > select"));
            selectBike.Click();
            var selectedBike = Driver.Instance.FindElement(By.CssSelector("#printable > div > div > div > div > section > div:nth-child(4) > div.portlet.light.bordered.clearfix.ng-scope > div.portlet-body.form > div > div:nth-child(2) > div.ng-scope > div > div:nth-child(1) > div.col-xs-8.col-sm-4 > select > option:nth-child(3)"));
            selectedBike.Click();
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
            //Check Availability 
            var availability = Driver.Instance.FindElement(By.CssSelector("# printable > div > div > div > div > section > div.clearfix.margin-bottom-20.addMarginBothSide.ng-scope > div.col-xs-2.ng-scope > button"));
            availability.Click();
        }

        public static void Would_Like_To_Purchase()
        {
            
        }

        public static void Borrow_Items()
        {
            
        }

        public static void Page_Scroll(int x, int y)
        {

        }
    }
}
