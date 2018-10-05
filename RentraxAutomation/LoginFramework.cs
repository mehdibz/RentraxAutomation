using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;



namespace RentraxAutomation
{
    public class LoginFramework
    {
        public static void GoTo(string url)
        {
            Driver.Instance.Navigate().GoToUrl(url);
            //click employee login
            Driver.Wait(4, By.CssSelector("#printable > nav > div > div.collapse.navbar-collapse.navbar-right.navbar-main-collapse > ul > li:nth-child(1)"));
            var firstPage = Driver.Instance.FindElement(By.CssSelector("#printable > nav > div > div.collapse.navbar-collapse.navbar-right.navbar-main-collapse > ul > li:nth-child(1)"));
            firstPage.Click();
        }

        public static LoginCommand LoginAs(string userName)
        {
            return new LoginCommand(userName);
        }
    }

    public static class LoginFail 
    {
        private static IWebElement UsernameError, PasswordError;
        //private static bool username=false, password=false;

        public static bool LoginFail_Confirmed(string username,string password)
        {
            if ((username == "") && (password == ""))
            {
                Driver.Wait(3, By.XPath("//html/body/div[3]/div/div/form/div/div[3]/div/div[2]"));
                UsernameError = Driver.Instance.FindElement(By.XPath("//html/body/div[3]/div/div/form/div/div[3]/div/div[2]"));
                PasswordError = Driver.Instance.FindElement(By.XPath("//html/body/div[3]/div/div/form/div/div[4]/div/div[2]"));
                Debug.Write("UsernameError====>>>>  " + UsernameError.Text + "  <<<=====");
                Debug.Write("PasswordError====>>>>  " + PasswordError.Text + "  <<<=====");
                return true;
            }

            if ((username == "") && !(password == ""))
            {
                Driver.Wait(3, By.XPath("//html/body/div[3]/div/div/form/div/div[3]/div/div[2]"));
                UsernameError = Driver.Instance.FindElement(By.XPath("//html/body/div[3]/div/div/form/div/div[3]/div/div[2]"));
                Debug.Write("UsernameError====>>>>  " + UsernameError.Text + "  <<<=====");
                if (UsernameError.Text == "The email field is required.")
                    return true;
            }
            if (!(username == "") && (password == ""))
            {
                Driver.Wait(3, By.XPath("//html/body/div[3]/div/div/form/div/div[4]/div/div[2]"));
                PasswordError = Driver.Instance.FindElement(By.XPath("//html/body/div[3]/div/div/form/div/div[4]/div/div[2]"));
                Debug.Write("PasswordError====>>>>  " + PasswordError.Text + "  <<<=====");
                if (PasswordError.Text == "The password field is required.")
                    return true;
            }
            if (!(username=="") && !(password==""))
            {
                Driver.Wait(3, By.XPath("//html/body/div[3]/div/div/form/div/div[3]/div/div[2]"));
                UsernameError = Driver.Instance.FindElement(By.XPath("//html/body/div[3]/div/div/form/div/div[3]/div/div[2]"));
                Debug.Write("UsernameError====>>>>  " + UsernameError.Text + "  <<<=====");
                if (UsernameError.Text == "These credentials do not match our records.")
                    return true;
            }
            return false;   
        }

        public static void ClearFields()
        {
            //Clear the username box
            var LoginInput = Driver.Instance.FindElement(By.CssSelector("body > div.col-md-4.center-block > div > div > form > div > div:nth-child(3) > div > input"));
            LoginInput.Clear();

            //Clear password box
            var passwordInput = Driver.Instance.FindElement(By.CssSelector("body > div.col-md-4.center-block > div > div > form > div > div:nth-child(4) > div > input"));
            passwordInput.Clear();
            Thread.Sleep(4000);
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
            Driver.Wait(3, By.XPath("//html/body/div[3]/div/div/form/div/div[5]/div[1]/div/div/label"));

            //select the username box
            var LoginInput = Driver.Instance.FindElement(By.CssSelector("body > div.col-md-4.center-block > div > div > form > div > div:nth-child(3) > div > input"));
            LoginInput.SendKeys(userName);
            
            //select password box
            var passwordInput = Driver.Instance.FindElement(By.CssSelector("body > div.col-md-4.center-block > div > div > form > div > div:nth-child(4) > div > input"));
            passwordInput.SendKeys(password);

            //click on Remember me
            var Remember_me = Driver.Instance.FindElement(By.XPath("//html/body/div[3]/div/div/form/div/div[5]/div[1]/div/div/label"));
            Remember_me.Click();

            //click on login
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