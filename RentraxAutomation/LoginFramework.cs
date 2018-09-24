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
    public class LoginFramework
    {
        public static void GoTo()
        {
            Driver.Instance.Navigate().GoToUrl("https://mehditest.rentrax.io/");
            //  Driver.Instance.Navigate().GoToUrl("https://mehditest.rentrax.io/admin/login");
        }

        public static LoginCommand LoginAs(string userName)
        {
            return new LoginCommand(userName);
        }
    }

    public class LoginCommand
    {
        private readonly string userName;
        private string password;

        public LoginCommand(string userName)
        {
            this.userName = userName;
        }

        public void Login()
        {
            var firstPage = Driver.Instance.FindElement(By.CssSelector("#printable > nav > div > div.collapse.navbar-collapse.navbar-right.navbar-main-collapse > ul > li:nth-child(1)"));
            firstPage.Click();
            /*
            var wait = new WebDriverWait(Driver.Instance, TimeSpan.FromSeconds(3));
            wait.Until(d => d.SwitchTo().ActiveElement().GetAttribute("Id") == "headertext");
            */
            var LoginInput = Driver.Instance.FindElement(By.CssSelector("body > div.col-md-4.center-block > div > div > form > div > div:nth-child(3) > div > input"));
            LoginInput.SendKeys(userName);

            var passwordInput = Driver.Instance.FindElement(By.CssSelector("body > div.col-md-4.center-block > div > div > form > div > div:nth-child(4) > div > input"));
            passwordInput.SendKeys(password);

            var loginButton = Driver.Instance.FindElement(By.CssSelector("body > div.col-md-4.center-block > div > div > form > div > div.form-actions > input"));
            loginButton.Click();
        }

        public LoginCommand WithPassword(string password)
        {
            this.password = password;
            return this;
        }
    }
}


