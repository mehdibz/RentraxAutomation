using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RentraxAutomation;

namespace Tests
{
    [TestClass]
    public class Login_OK
    {
        [TestInitialize]
        public void Init()
        {
            Driver.Initialize();
        }
        [TestMethod]
        public void User_Can_Login()
        {
            var url = LoginFramework.LoadData("url");
            var user = LoginFramework.LoadData("username");
            var password = LoginFramework.LoadData("password");
            LoginFramework.GoTo(url);
            LoginFramework.LoginAs(user).WithPassword(password).Login();
            Assert.IsTrue(DashboardFramework.IsAt,"Failed to login.");
        }

        [TestCleanup]
        public void CleanUp()
        {
            Driver.Close();
        }
    }
}