using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Support.Extensions;
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
            var rentOrder = Driver.Instance.FindElement(By.CssSelector("#printable > div.tiles.margin-bototm-30.padding-left-tiles > a:nth-child(2) > div"));
            rentOrder.Click();
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
            Driver.Wait(2, By.XPath("//*[@id='email']"));
            var email = Driver.Instance.FindElement(By.CssSelector("#email"));
            email.SendKeys("bz.mehdi@gmail.com");
            var firstName = Driver.Instance.FindElement(By.CssSelector("#first_name"));
            firstName.SendKeys("Mehdi");
            var lastName = Driver.Instance.FindElement(By.CssSelector("#last_name"));
            lastName.SendKeys("Bz");
            var Phone = Driver.Instance.FindElement(By.CssSelector("#customer_phone"));
            Phone.SendKeys("6047040000");
            var Address = Driver.Instance.FindElement(By.CssSelector("#address_street"));
            Address.SendKeys("Fullerton Ave");
            Driver.Wait(4, By.XPath("//*[@id='printable']/div/div/div/div/section/div[1]/div[1]/div/div[2]/div[1]"));
            Features.ScrollToView(By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div[2]/div[3]/button[1]"));
        }

        public static void I_want_To_Rent()
        {
            //Select the SingleBike
            var singleBike = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div/div[2]/button[1]"));
            singleBike.Click();
            var selectBike = Driver.Instance.FindElement(By.CssSelector("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div[2]/div[1]/div/div[1]/div[2]/select"));
            selectBike.Click();
            var selectedBike = Driver.Instance.FindElement(By.CssSelector("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div[2]/div[1]/div/div[1]/div[2]/select/option[3]"));
            selectedBike.Click();
        }

        public static void Rental_Period()
        {
            
        }

        public static void RentType()
        {
            //click on Rent_Now
            Driver.Wait(4, By.XPath("//*[@id='printable']/div/div/div/div/section/div[1]/div[1]/div/div[2]/div[1]"));
            var newOrder = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[1]/div[1]/div/div[2]/div[1]"));
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
