const Migrations = artifacts.require("Migrations");
const SqoinToken = artifacts.require("SqoinToken");

module.exports = function(deployer) {
    deployer.deploy(Migrations);
    deployer.deploy(SqoinToken);
};