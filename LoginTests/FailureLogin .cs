using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RentraxAutomation;

namespace Tests
{
    [TestClass]
    public class Login_Fail
    {
        [TestInitialize]
        public void Init()
        {
            Driver.Initialize();
        }
        [TestMethod]
        public void All_Failed_Login_tests()
        {
            LoginFramework.GoTo("https://dev.rentrax.io");
            LoginFramework.LoginAs("bz.mehdi@gm.com").WithPassword("as12341234").Login();
            Assert.IsTrue(LoginFail.LoginFail_Confirmed("bz.mehdi@gm.com", "as12341234"));
            LoginFail.ClearFields();
            LoginFramework.LoginAs("bz.mehdi@gmail.com").WithPassword("as1234").Login();
            Assert.IsTrue(LoginFail.LoginFail_Confirmed("bz.mehdi@gmail.com", "as1234"));
            LoginFail.ClearFields(); 
            LoginFramework.LoginAs("").WithPassword("as12341234").Login();
            Assert.IsTrue(LoginFail.LoginFail_Confirmed("", "as12341234"));
            LoginFail.ClearFields();
            LoginFramework.LoginAs("bz.mehdi@gmail.com").WithPassword("").Login();
            Assert.IsTrue(LoginFail.LoginFail_Confirmed("bz.mehdi@gmail.com",""));
            LoginFail.ClearFields();
            LoginFramework.LoginAs("").WithPassword("").Login();
            Assert.IsTrue(LoginFail.LoginFail_Confirmed("",""));  
        }
         
        [TestCleanup]
        public void CleanUp()
        {
           Driver.Close();
        }
    }
}