import express from "express";
import nunjucks from "nunjucks";
import { fileURLToPath } from "url";
import path from "path";

let HOST = "localhost";
let PORT = 3000;
let IMAGES = [{
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Gecarcinus_quadratus_%28Nosara%29.jpg/2560px-Gecarcinus_quadratus_%28Nosara%29.jpg",
    description: "Gecarcinus quadratus, a land crab from Central America",
    source: "https://en.wikipedia.org/wiki/Crab"
}, {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/49/Ocypode_quadrata_%28Martinique%29.jpg",
    description: "Ocypode quadrata (Thoracotremata: Ocypodidae)",
    source: "https://en.wikipedia.org/wiki/Crab"
}, {
    url: "https://www.abc.net.au/reslib/201006/r576376_3593030.jpg",
    description: "Male fiddler crab watch for other males waving their 'love claw' to detect the presence of a female",
    source: "https://www.abc.net.au/science/articles/2010/06/02/2915161.htm?site=science/tricks&topic=latest"
}, {
    url: "https://rasamalaysia.com/wp-content/uploads/2019/12/baked-crab1.jpg",
    description: "Baked Crab",
    source: "https://rasamalaysia.com/baked-crab-recipe/"
}, {
    url: "http://de.spongepedia.org/images/Krabs.jpg",
    description: "Mr. Krabs",
    source: "http://de.spongepedia.org/index.php/Mr._Krabs"
}, {
    url: "https://static.wikia.nocookie.net/kingdom-hearts/images/d/d6/Sebastian_KHII.png/revision/latest/scale-to-width-down/1000?cb=20130430215503&path-prefix=de",
    description: "Sebastian",
    source: "https://kingdomhearts.fandom.com/de/wiki/Sebastian"
}];

let ROOT = path.dirname(fileURLToPath(import.meta.url));

let app = express();
app.use("/", express.static(absolutePath("./assets")));
nunjucks.configure(absolutePath("./views"), {
	express: app
});

app.get("/", (req, res) => {
    res.render("index.html", { images: shuffle(IMAGES) });
});

let server = app.listen(PORT, HOST, _ => {
	let { address, port } = server.address();
	console.log(`→ http://${address}:${port}`);
});

function absolutePath(filepath) {
	return path.resolve(ROOT, filepath);
}

function shuffle(array) {
    return array.sort( () => .5 - Math.random() )
}