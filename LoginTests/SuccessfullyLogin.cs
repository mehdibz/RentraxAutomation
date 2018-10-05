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
            LoginFramework.GoTo("https://dev.rentrax.io");
            LoginFramework.LoginAs("root@localhost.com").WithPassword("root").Login();
            Assert.IsTrue(DashboardFramework.IsAt,"Failed to login.");
        }

        [TestCleanup]
        public void CleanUp()
        {
            Driver.Close();
        }
    }
}