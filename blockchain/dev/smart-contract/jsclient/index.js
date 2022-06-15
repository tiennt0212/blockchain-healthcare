const { SimpleWalletClient } = require("./routes/SimpleWalletClient");

const client = new SimpleWalletClient("thanhtien");

client.deposit(12345689);
