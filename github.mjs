import fetch from "node-fetch";
import express from "express";
let ourApp = express();

ourApp.use(express.urlencoded({ extended: false }));

ourApp.get('/', (req, res) => {
    res.send(`
<html>
<head>
    <title>Github repository</title>
</head>
<body style="background-color: lightpink;">
<center><div style="border:1px solid black; padding:0px;">
    <h2>Lists of user's repository</h2>

    <form action="/submit" method="post">
        
        <label for="name">User Name:</label><br>
        <input type="text" id="name" name="name" required><br><br>

        <input type="submit" value="Submit">
        <input type="reset" value="Reset">
    </form>
</div></center>
</body>
</html>k
`);
});

ourApp.post('/submit', async (req, res) => {
    let user = req.body.name;

    try {
        let response = await fetch(`https://api.github.com/users/${user}/repos`);
        let data = await response.json();

        let repolist = "";
for (let repo of data) {
  repolist += (`<li><a href="${repo.html_url}">${repo.name}</a></li>`);
}
        res.send(`
            <h2>Repositories of ${user}</h2>
            <ul>${repolist}</ul>
            <a href="/">Search Again</a>
        `);
    } catch (error) {
        res.send(`<p>Error: ${error.message}</p><a href="/">Try Again</a>`);
    }
});


ourApp.listen(3000)
