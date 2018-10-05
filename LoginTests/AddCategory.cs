using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RentraxAutomation;

namespace Tests
{
    [TestClass]
    public class AddCategory
    {
        [TestInitialize]
        public void Init()
        {
            Driver.Initialize();
        }
        [TestMethod]
        public void Add_category()
        {
            Login_OK login = new Login_OK();
            login.User_Can_Login();
            CategoryFramework.GoToCategory();
            //Assert.IsTrue(DashboardPage.IsAt, "Failed to login.");
        }

        [TestCleanup]
        public void CleanUp()
        {
            // Driver.Close();
        }
    }
}

