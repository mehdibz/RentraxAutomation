using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RentraxAutomation;

namespace LoginTests
{
    [TestClass]
    public class LoginTests
    {
        [TestInitialize]
        public void Init()
        {
            Driver.Initialize();
        }
        [TestMethod]
        public void User_Can_Login()
        {
            LoginFramework.GoTo();
            LoginFramework.LoginAs("bz.mehdi@gmail.com").WithPassword("as12341234").Login();

            Assert.IsTrue(DashboardPage.IsAt,"Failed to login.");
        }

        [TestCleanup]
        public void CleanUp()
        {
            Driver.Close();
        }
    }
}